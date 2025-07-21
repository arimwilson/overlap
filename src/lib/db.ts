import { supabase } from './supabaseClient';
import type { Database } from './generated.types';
import type { Board, User, Availability } from './types';

function generateCode(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Create a new board and its first user.
 */
export async function createBoard(name: string, timezone: string): Promise<{ boardCode: string; boardUuid: string; userId: string }> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const boardCode = generateCode();
    const { data: board, error } = await supabase
      .from('boards')
      .insert({ code: boardCode })
      .select('id, code')
      .single();

    if (error) {
      if (error.code === '23505') continue; // duplicate code
      throw new Error(error.message);
    }

    const { data: user, error: userError } = await supabase
      .from('board_users')
      .insert({ board_id: board.id, name, timezone })
      .select('id')
      .single();

    if (userError) throw new Error(userError.message);
    return { boardCode: board.code, boardUuid: board.id, userId: user.id };
  }

  throw new Error('Failed to generate unique board code');
}

/**
 * Join an existing board.
 */
export async function joinBoard(boardUuid: string, name: string, timezone: string): Promise<{ userId: string }> {
  const { data, error } = await supabase
    .from('board_users')
    .upsert(
      [{ board_id: boardUuid, name: name.trim(), timezone }],
      { onConflict: 'board_id,name', ignoreDuplicates: false }
    )
    .select('id')
    .single();

  if (error) throw new Error(error.message);

  return { userId: data.id };
}

/**
 * Fetch board details with user roster and availability map.
 */
export async function getBoard(boardCode: string): Promise<Board | null> {
  const { data: board } = await supabase
    .from('boards')
    .select('id, code')
    .eq('code', boardCode)
    .single();

  if (!board) return null;

  const { data: userRows } = await supabase
    .from('board_users')
    .select('id, name, timezone')
    .eq('board_id', board.id)
    .order('created_at', { ascending: true });
  const users = (userRows ?? []) as User[];

  const { data: avail } = await supabase
    .from('availability')
    .select('user_id, day_of_week, slot_index')
    .eq('board_id', board.id);
  const availRows = avail ?? [];

  const availability: Record<string, Availability> = {};
  for (const row of availRows) {
    const slotId = `${row.day_of_week}-${row.slot_index}`;
    if (!availability[row.user_id]) availability[row.user_id] = {};
    availability[row.user_id][slotId] = true;
  }

  return { id: board.code, uuid: board.id, users, availability };
}

/**
 * Toggle availability for a specific slot.
 */
export async function toggleAvailability(
  boardCode: string,
  userId: string,
  dayOfWeek: number,
  slotIndex: number,
  isAvailable: boolean
): Promise<void> {
  const { data: board } = await supabase
    .from('boards')
    .select('id')
    .eq('code', boardCode)
    .single();

  if (!board) throw new Error('Board not found');

  const payload = {
    board_id: board.id,
    user_id: userId,
    day_of_week: dayOfWeek,
    slot_index: slotIndex,
  } satisfies Database['public']['Tables']['availability']['Insert'];

  if (isAvailable) {
    const { error } = await supabase
      .from('availability')
      .insert(payload)
      .select()
      .single();
    if (error && error.code !== '23505') throw new Error(error.message);
  } else {
    const { error } = await supabase
      .from('availability')
      .delete()
      .match(payload);
    if (error) throw new Error(error.message);
  }
}

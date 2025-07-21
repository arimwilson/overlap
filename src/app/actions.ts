'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createBoard as dbCreateBoard,
  getBoard,
  toggleAvailability as dbToggleAvailability,
  updateUserOnBoard,
} from '@/lib/db';
import { setUserCookie } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(50);
const boardIdSchema = z.string().length(5, 'Invalid board code').regex(/^[A-Z0-9]+$/, 'Invalid board code');

function generateBoardId(length = 5) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function createBoard(formData: FormData) {
  const nameResult = nameSchema.safeParse(formData.get('name'));
  const timezone = formData.get('timezone') as string || 'UTC';

  if (!nameResult.success) {
    // In a real app, you'd return this error to the user.
    // For now, we'll just redirect back.
    return redirect('/?error=' + encodeURIComponent(nameResult.error.errors[0].message));
  }

  const boardId = generateBoardId();
  const user = await dbCreateBoard(boardId, nameResult.data, timezone);

  setUserCookie(boardId, user.id);

  revalidatePath(`/board/${boardId}`);
  redirect(`/board/${boardId}`);
}

export async function joinBoard(formData: FormData) {
  const nameResult = nameSchema.safeParse(formData.get('name'));
  const boardIdResult = boardIdSchema.safeParse(formData.get('boardId')?.toString().toUpperCase());
  const timezone = formData.get('timezone') as string || 'UTC';

  if (!nameResult.success || !boardIdResult.success) {
     const error = nameResult.error?.errors[0].message || boardIdResult.error?.errors[0].message;
     return redirect('/?error=' + encodeURIComponent(error || "Invalid input."));
  }

  const board = await getBoard(boardIdResult.data);
  if (!board) {
    return redirect('/?error=' + encodeURIComponent("Board not found."));
  }

  if (board.users.length >= 10) {
    return redirect(`/board/${boardIdResult.data}?error=` + encodeURIComponent("This board is full."));
  }

  const user = await updateUserOnBoard(boardIdResult.data, { name: nameResult.data, timezone });
  setUserCookie(boardIdResult.data, user.id);

  revalidatePath(`/board/${boardIdResult.data}`);
  redirect(`/board/${boardIdResult.data}`);
}

export async function joinBoardFromPage(boardId: string, formData: FormData) {
    const nameResult = nameSchema.safeParse(formData.get('name'));
    const timezone = formData.get('timezone') as string || 'UTC';

    if (!nameResult.success) {
      return { error: nameResult.error.errors[0].message };
    }
  
    const board = await getBoard(boardId);
    if (!board) {
      return { error: 'Board not found' };
    }

    if (board.users.length >= 10) {
      return { error: 'This board is full.' };
    }
  
    const user = await updateUserOnBoard(boardId, { name: nameResult.data, timezone });
    setUserCookie(boardId, user.id);
  
    revalidatePath(`/board/${boardId}`);
    return { success: true };
}

export async function toggleAvailability(boardId: string, userId: string, timeSlot: string, isAvailable: boolean) {
    await dbToggleAvailability(boardId, userId, timeSlot, isAvailable);
    // In a real-time app, you'd use a service like Firebase Realtime DB or a WebSocket
    // to push updates to clients. For this example, revalidation is a simpler approach.
    revalidatePath(`/board/${boardId}`);
}

/**
 * This is a mock in-memory database to simulate Firestore.
 * In a real application, you would replace these functions
 * with calls to the Firebase SDK.
 */
import type { Board, User } from './types';
import { v4 as uuidv4 } from 'uuid';

const boards = new Map<string, Board>();

export async function getBoard(id: string): Promise<Board | null> {
  return boards.get(id) || null;
}

export async function createBoard(
  boardId: string,
  userName: string,
  timezone: string
): Promise<User> {
  const userId = uuidv4();
  const user: User = { id: userId, name: userName, timezone };

  const newBoard: Board = {
    id: boardId,
    users: [user],
    availability: {
      [userId]: {},
    },
  };

  boards.set(boardId, newBoard);
  return user;
}

export async function updateUserOnBoard(
  boardId: string,
  { name, timezone }: { name: string, timezone: string }
): Promise<User> {
  const board = await getBoard(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  const userId = uuidv4();
  const newUser: User = { id: userId, name, timezone };

  board.users.push(newUser);
  board.availability[userId] = {};
  
  boards.set(boardId, board);

  return newUser;
}

export async function toggleAvailability(
  boardId: string,
  userId: string,
  timeSlot: string,
  isAvailable: boolean
): Promise<void> {
  const board = await getBoard(boardId);
  if (!board) {
    throw new Error('Board not found');
  }

  if (!board.availability[userId]) {
    board.availability[userId] = {};
  }

  if (isAvailable) {
    board.availability[userId][timeSlot] = true;
  } else {
    delete board.availability[userId][timeSlot];
  }
  
  boards.set(boardId, board);
}

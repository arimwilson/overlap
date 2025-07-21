'use server';

import { cookies } from 'next/headers';

const COOKIE_NAME = 'overlap-user';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export async function setUserCookie(_boardId: string, userId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, userId, COOKIE_OPTIONS);
}

export async function getUserCookie(_boardId: string): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value || null;
}

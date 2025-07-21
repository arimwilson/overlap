'use server';

import { cookies } from 'next/headers';

const COOKIE_PREFIX = 'overlap-user-';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 30, // 30 days
};

export async function setUserCookie(boardId: string, userId: string) {
  cookies().set(`${COOKIE_PREFIX}${boardId}`, userId, COOKIE_OPTIONS);
}

export async function getUserCookie(boardId: string): Promise<string | null> {
  const cookieName = `${COOKIE_PREFIX}${boardId}`;
  return cookies().get(cookieName)?.value || null;
}

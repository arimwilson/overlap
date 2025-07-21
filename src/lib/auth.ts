'use server';

import { cookies } from 'next/headers'

const COOKIE_PREFIX = 'overlap_'

export async function setUserCookie(boardUuid: string, userUuid: string) {
  const store = await cookies()
  store.set(`${COOKIE_PREFIX}${boardUuid}`, userUuid, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })
}

export async function getUserCookie(boardUuid: string) {
  const store = await cookies()
  return store.get(`${COOKIE_PREFIX}${boardUuid}`)?.value || null
}

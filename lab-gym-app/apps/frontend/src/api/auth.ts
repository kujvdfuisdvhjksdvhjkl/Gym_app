// apps/frontend/src/api/auth.ts
import type { LoginDto, LoginResponse } from '@lab-gym/types';

export async function login(data: LoginDto): Promise<LoginResponse> {
  const res = await fetch(import.meta.env.VITE_API_URL + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Auth failed');
  return res.json();
}
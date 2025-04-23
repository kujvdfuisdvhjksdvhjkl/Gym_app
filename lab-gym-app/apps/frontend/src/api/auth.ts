// apps/frontend/src/api/auth.ts
import type {
  LoginDto,
  LoginResponse,
  RegisterDto,
  User,
} from '@lab-gym/types';

const base = import.meta.env.VITE_API_URL;

// login
export async function login(data: LoginDto): Promise<LoginResponse> {
  const res = await fetch(`${base}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Ошибка авторизации');
  }
  return res.json();
}

// register
export async function register(data: RegisterDto): Promise<User> {
  const res = await fetch(`${base}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || 'Ошибка регистрации');
  }
  return res.json();
}

// get current user
export async function getProfile(): Promise<User> {
  const token = localStorage.getItem('access_token');
  const res = await fetch(`${base}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error('Не удалось получить профиль');
  return res.json();
}

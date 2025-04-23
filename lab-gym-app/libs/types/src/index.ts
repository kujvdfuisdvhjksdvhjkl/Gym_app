// libs/types/src/index.ts
export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  role?: 'admin' | 'client';
}

// Добавляем экспорт типа User
export interface User {
  id: number;
  email: string;
  role: 'admin' | 'client';
}

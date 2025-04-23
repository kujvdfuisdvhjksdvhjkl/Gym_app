// src/api/users.ts
export interface Profile {
    id: number;
    email: string;
    role: string;
  }
  
  export async function getProfile(): Promise<Profile> {
    const token = localStorage.getItem('access_token');
    if (!token) throw new Error('No token');
    const res = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    return res.json();
  }
  
// src/api/clients.ts

export interface Client {
  id: number;
  name: string;
  membershipDate: string;
  membershipType: string;
}

const API = import.meta.env.VITE_CLIENTS_API_URL!;

// Хелпер для заголовков авторизации
function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchClients(): Promise<Client[]> {
  const res = await fetch(`${API}/clients`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    throw new Error('Не удалось загрузить список клиентов');
  }
  return res.json();
}

export async function fetchClient(id: number): Promise<Client> {
  const res = await fetch(`${API}/clients/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    throw new Error(`Клиент ${id} не найден`);
  }
  return res.json();
}

export async function createClient(data: Omit<Client, 'id'>): Promise<Client> {
  const res = await fetch(`${API}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Не удалось создать клиента');
  }
  return res.json();
}

export interface Client {
  id: number;
  name: string;
  membershipDate: string;
  membershipType: string;
}

export async function updateClient(
  id: number,
  data: Partial<Omit<Client, 'id'>>,
): Promise<Client> {
  const res = await fetch(`${API}/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error('Не удалось обновить клиента');
  }
  return res.json();
}

export async function deleteClient(id: number): Promise<void> {
  const res = await fetch(`${API}/clients/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    throw new Error('Не удалось удалить клиента');
  }
}

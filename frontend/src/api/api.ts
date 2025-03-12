import { useFetch } from '@vueuse/core';

const BASE_URL = '/api';

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const { data, error } = await useFetch<T>(`${BASE_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    ...options,
  });

  if (error.value) {
    throw error.value;
  }

  return data.value!;
}

export const apiService = {
  login: async (payload: { email: string; password: string }) => {
    return request('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  // intetionally leaving headers blank, otherswise Fastify will throw a 400
  logout: async () => request('/logout', { method: 'POST', headers: {} }),
  check: async () => request('/check'),
};

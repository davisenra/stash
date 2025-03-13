import type { Wallpaper, WallpaperResponse } from '@/types';
import { snakeToCamel } from '@/utils/utils';
import { ofetch, FetchError, type FetchRequest } from 'ofetch';

const BASE_URL = '/api';
const apiFetch = ofetch.create({ baseURL: BASE_URL });

async function request<T>(url: string, opts?: RequestInit) {
  try {
    const data = await apiFetch<T>(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      ...opts,
    });
    return { data, err: undefined };
  } catch (err) {
    return { data: undefined, err } as { data: undefined; err: FetchError };
  }
}

export const apiService = {
  login: async (payload: { email: string; password: string }) => {
    return await request('/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  logout: async () => {
    // intetionally leaving headers blank, otherswise Fastify will throw a 400
    return await request('/logout', { method: 'POST', headers: {} });
  },
  check: async () => {
    return await request('/check');
  },
  listWallpapers: async (): Promise<Wallpaper[]> => {
    const { data, err } = await request<WallpaperResponse>('/wallpapers');
    if (err) throw err;
    return snakeToCamel(data.result.wallpapers);
  },
};

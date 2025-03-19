import { apiService } from '@/api/api';
import type { Wallpaper } from '@/types';
import { ref } from 'vue';

const wallpapers = ref<Wallpaper[]>([]);

export function useWallpapers() {
  async function fetchWallpapers() {
    wallpapers.value = await apiService.listWallpapers();
  }

  async function removeWallpaper(wallpaperId: string) {
    await apiService.removeWallpaper(wallpaperId);
    await fetchWallpapers();
  }

  return {
    wallpapers: wallpapers,
    fetchWallpapers,
    removeWallpaper,
  };
}

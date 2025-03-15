import { apiService } from '@/api/api';
import type { Wallpaper } from '@/types';
import { ref } from 'vue';

const wallpapers = ref<Wallpaper[]>([]);

export function useWallpapers() {
  async function fetchWallpapers() {
    wallpapers.value = await apiService.listWallpapers();
  }
  return {
    wallpapers: wallpapers,
    fetchWallpapers,
  };
}

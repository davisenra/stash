<script setup lang="ts">
import { apiService } from '@/api/api';
import type { Wallpaper } from '@/types';
import { onMounted, ref } from 'vue';
import MasonryGrid from '@/components/Wallpapers/MasonryGrid.vue';
import WallpaperModal from '@/components/Wallpapers/WallpaperModal.vue';

const wallpapers = ref<Wallpaper[]>();
const selectedWallpaper = ref<Wallpaper | null>(null);
const isModalOpen = ref(false);

onMounted(async () => {
  wallpapers.value = await apiService.listWallpapers();
});

const openModal = (wallpaper: Wallpaper) => {
  selectedWallpaper.value = wallpaper;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isModalOpen.value = false;
  document.body.style.overflow = '';
};
</script>

<template>
  <div>
    <div v-if="!wallpapers" class="py-8 text-center text-lg text-gray-600">
      Loading wallpapers...
    </div>

    <MasonryGrid v-else :wallpapers="wallpapers" @select="openModal" />

    <WallpaperModal
      v-if="selectedWallpaper"
      :wallpaper="selectedWallpaper"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

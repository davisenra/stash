<script setup lang="ts">
import type { Wallpaper } from '@/types';
import { ref } from 'vue';
import WallpaperGrid from '@/components/Wallpapers/WallpaperGrid.vue';
import WallpaperModal from '@/components/Wallpapers/WallpaperModal.vue';

defineProps<{
  wallpapers: Wallpaper[];
}>();

const selectedWallpaper = ref<Wallpaper | null>(null);
const isModalOpen = ref(false);

function openModal(wallpaper: Wallpaper) {
  selectedWallpaper.value = wallpaper;
  isModalOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  isModalOpen.value = false;
  document.body.style.overflow = '';
}
</script>

<template>
  <div>
    <div v-if="!wallpapers" class="py-8 text-center text-lg text-gray-600">
      You haven't uploaded wallpapers yet
    </div>
    <WallpaperGrid v-else :wallpapers="wallpapers" @select="openModal" />
    <WallpaperModal
      v-if="selectedWallpaper"
      :wallpaper="selectedWallpaper"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

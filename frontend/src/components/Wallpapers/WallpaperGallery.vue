<script setup lang="ts">
import type { Wallpaper } from '@/types';
import { ref } from 'vue';
import WallpaperGrid from '@/components/Wallpapers/WallpaperGrid.vue';
import WallpaperItem from '@/components/Wallpapers/WallpaperItem.vue';
import WallpaperModal from '@/components/Wallpapers/WallpaperModal.vue';
import { useConfirmation } from '@/composables/useConfirmation';
import { apiService } from '@/api/api';
import { useWallpapers } from '@/composables/useWallpapers';

defineProps<{
  wallpapers: Wallpaper[];
}>();

const { confirm } = useConfirmation();
const { removeWallpaper } = useWallpapers();

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

async function handleRemoveWallpaper(wallpaper: Wallpaper) {
  const confirmed = await confirm({
    title: 'Remove wallpaper?',
    message: 'This action cannot be undone.',
  });

  if (confirmed) {
    await removeWallpaper(wallpaper.id);
  }
}
</script>

<template>
  <div>
    <div v-if="!wallpapers.length" class="py-8 text-center text-lg text-neutral-400">
      No wallpapers to be displayed :(
    </div>
    <WallpaperGrid v-else>
      <WallpaperItem
        v-for="wallpaper in wallpapers"
        :key="wallpaper.id"
        :wallpaper="wallpaper"
        @select="openModal"
        @remove="handleRemoveWallpaper"
      />
    </WallpaperGrid>
    <WallpaperModal
      v-if="selectedWallpaper"
      :wallpaper="selectedWallpaper"
      :is-open="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

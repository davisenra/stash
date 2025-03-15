<script setup lang="ts">
import type { Wallpaper } from '@/types';

const props = defineProps<{
  wallpaper: Wallpaper;
}>();

const emit = defineEmits<{
  (e: 'select', wallpaper: Wallpaper): void;
}>();

const handleClick = () => {
  emit('select', props.wallpaper);
};
</script>

<template>
  <div class="masonry-item relative cursor-pointer overflow-hidden rounded" @click="handleClick">
    <img
      :src="`/storage/thumbnails/${wallpaper.thumbnailFile}`"
      :alt="wallpaper.thumbnailFile"
      class="block h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-103"
      loading="lazy"
    />
    <div
      class="absolute inset-0 flex items-end bg-black p-4 opacity-0 transition-all duration-300 ease-in-out hover:opacity-70"
    >
      <div class="w-full text-white">
        <h3 class="m-0 mb-2 truncate text-base">{{ wallpaper.name }}</h3>
        <p class="m-0 text-sm opacity-80">{{ wallpaper.width }} × {{ wallpaper.height }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.masonry-item {
  grid-row-end: span var(--row-span, 25);
}

.hover\:scale-103:hover {
  transform: scale(1.03);
}
</style>

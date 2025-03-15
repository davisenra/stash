<script setup lang="ts">
import type { Wallpaper } from '@/types';
import WallpaperItem from '@/components/Wallpapers/WallpaperItem.vue';

defineProps<{
  wallpapers: Wallpaper[];
}>();

const emit = defineEmits<{
  (e: 'select', wallpaper: Wallpaper): void;
}>();

const handleSelect = (wallpaper: Wallpaper) => {
  emit('select', wallpaper);
};
</script>

<template>
  <div
    class="masonry-grid grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <WallpaperItem
      v-for="wallpaper in wallpapers"
      :key="wallpaper.id"
      :wallpaper="wallpaper"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.masonry-grid {
  grid-auto-rows: 10px;
}
</style>

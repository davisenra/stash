<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Wallpaper } from '@/types';
import WallpaperItem from '@/components/Wallpapers/WallpaperItem.vue';

const props = defineProps<{
  wallpapers: Wallpaper[];
}>();

const emit = defineEmits<{
  (e: 'select', wallpaper: Wallpaper): void;
}>();

const handleSelect = (wallpaper: Wallpaper) => {
  emit('select', wallpaper);
};

onMounted(() => {
  resizeAllGridItems();
  window.addEventListener('resize', resizeAllGridItems);

  const images = document.querySelectorAll('.masonry-item img');
  images.forEach((img) => {
    if (img.complete) {
      resizeGridItem(img.parentElement as HTMLElement);
    } else {
      img.addEventListener('load', () => {
        resizeGridItem(img.parentElement as HTMLElement);
      });
    }
  });
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeAllGridItems);
});

const resizeGridItem = (item: HTMLElement) => {
  const grid = document.querySelector('.masonry-grid');
  if (!grid) return;

  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));

  const imgElement = item.querySelector('img');
  if (!imgElement) return;

  const rowSpan = Math.ceil(
    (imgElement.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap),
  );
  item.style.setProperty('--row-span', rowSpan.toString());
};

const resizeAllGridItems = () => {
  const allItems = document.querySelectorAll('.masonry-item');
  allItems.forEach((item) => {
    resizeGridItem(item as HTMLElement);
  });
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

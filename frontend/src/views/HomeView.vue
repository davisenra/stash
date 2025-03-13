<script setup lang="ts">
import { apiService } from '@/api/api';
import type { Wallpaper } from '@/types';
import { onMounted, ref } from 'vue';

const wallpapers = ref<Wallpaper[]>();

onMounted(async () => {
  wallpapers.value = await apiService.listWallpapers();
});
</script>

<template>
  <div>
    <img :src="`/storage/thumbnails/${w.thumbnailFile}`" v-for="w in wallpapers" :key="w.id" />
  </div>
</template>

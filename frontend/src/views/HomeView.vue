<script setup lang="ts">
import WallpaperGallery from '@/components/Wallpapers/WallpaperGallery.vue';
import UploadButton from '@/components/Upload/UploadButton.vue';
import UploadModal from '@/components/Upload/UploadModal.vue';
import { ref, onMounted } from 'vue';
import { useWallpapers } from '@/composables/useWallpapers';

const { wallpapers, fetchWallpapers } = useWallpapers();
const isUploadModalOpen = ref(false);

function openUploadModal() {
  isUploadModalOpen.value = true;
  document.body.style.overflow = 'hidden';
}

function closeUploadModal() {
  isUploadModalOpen.value = false;
  document.body.style.overflow = '';
}

onMounted(async () => {
  await fetchWallpapers();
});
</script>

<template>
  <WallpaperGallery :wallpapers="wallpapers" />

  <UploadButton @click="openUploadModal" />
  <UploadModal v-if="isUploadModalOpen" @uploaded="fetchWallpapers" @close="closeUploadModal" />
</template>

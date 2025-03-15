<script setup lang="ts">
import WallpaperGallery from '@/components/Wallpapers/WallpaperGallery.vue';
import UploadButton from '@/components/Upload/UploadButton.vue';
import UploadModal from '@/components/Upload/UploadModal.vue';
import { ref } from 'vue';

const isModalOpen = ref(false);
const isUploadModalOpen = ref(false);

const openUploadModal = () => {
  isUploadModalOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeUploadModal = () => {
  isUploadModalOpen.value = false;
  document.body.style.overflow = '';
};
</script>

<template>
  <WallpaperGallery />

  <UploadButton @click="openUploadModal" />
  <UploadModal v-if="isUploadModalOpen" @close="closeUploadModal" />
</template>

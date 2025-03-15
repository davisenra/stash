<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import type { Wallpaper } from '@/types';

const props = defineProps<{
  wallpaper: Wallpaper;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const handleClose = () => {
  emit('close');
};

const handleModalClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    handleClose();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    handleClose();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="modal-overlay bg-opacity-90 fixed inset-0 z-50 flex items-center justify-center bg-black p-8"
    @click="handleModalClick"
  >
    <div class="relative max-h-[90%] max-w-[90%]">
      <img
        :src="`/storage/wallpapers/${wallpaper.wallpaperFile}`"
        :alt="wallpaper.wallpaperFile"
        class="max-h-[90vh] max-w-full rounded object-contain"
      />
      <button
        class="absolute -top-10 -right-10 flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent text-4xl text-white sm:-top-10 sm:right-0"
        @click="handleClose"
      >
        ×
      </button>
    </div>
  </div>
</template>

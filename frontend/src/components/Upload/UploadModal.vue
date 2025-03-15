<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import SFilePreview from '@/components/SFilePreview.vue';

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const selectedFiles = ref<File[]>([]);
const isDragging = ref(false);
const fileInputRef = ref<HTMLInputElement | null>(null);

const closeModal = () => {
  emit('close');
};

const handleModalClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
    closeModal();
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeModal();
  }
};

const openFilePicker = () => {
  fileInputRef.value?.click();
};

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files) {
    addFiles(Array.from(input.files));
    input.value = '';
  }
};

const addFiles = (files: File[]) => {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'));
  selectedFiles.value = [...selectedFiles.value, ...imageFiles];
};

const removeFile = (index: number) => {
  selectedFiles.value = selectedFiles.value.filter((_, i) => i !== index);
};

const handleDragEnter = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragOver = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  event.preventDefault();
  isDragging.value = false;

  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files));
  }
};

const uploadFiles = () => {
  // Here you would implement the logic to upload each file individually
  // For example:
  /*
  selectedFiles.value.forEach(async (file) => {
    try {
      const formData = new FormData();
      formData.append('wallpaper', file);

      // Send the request to your API
      await apiService.uploadWallpaper(formData);

      // Handle success
    } catch (error) {
      // Handle error
    }
  });
  */

  console.log('Files to upload:', selectedFiles.value);
  closeModal();
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
    class="modal-overlay bg-opacity-75 bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    @click="handleModalClick"
  >
    <div
      class="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white dark:bg-neutral-800"
    >
      <div class="flex items-center justify-between border-b p-4 dark:border-neutral-700">
        <h2 class="text-xl font-semibold dark:text-white">Upload Wallpapers</h2>
        <button
          @click="closeModal"
          class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-auto p-4">
        <div
          @dragenter="handleDragEnter"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
          class="cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200"
          :class="
            isDragging
              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
              : 'border-neutral-300 dark:border-neutral-700'
          "
          @click="openFilePicker"
        >
          <input
            type="file"
            ref="fileInputRef"
            @change="handleFileSelect"
            multiple
            accept="image/*"
            class="hidden"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-12 w-12 text-neutral-400 dark:text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>

          <p class="mt-4 text-neutral-700 dark:text-neutral-300">
            Drag and drop your wallpapers here, or click to select files
          </p>
          <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Supported formats: JPG, PNG, WebP
          </p>
        </div>

        <div v-if="selectedFiles.length > 0" class="mt-6">
          <h3 class="mb-3 text-lg font-medium dark:text-white">
            Selected Files ({{ selectedFiles.length }})
          </h3>
          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            <SFilePreview
              v-for="(file, index) in selectedFiles"
              :key="index"
              :file="file"
              :index="index"
              @remove="removeFile"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end border-t p-4 dark:border-neutral-700">
        <button
          @click="closeModal"
          class="mr-2 rounded-md bg-neutral-200 px-4 py-2 text-neutral-700 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-600"
        >
          Cancel
        </button>
        <button
          @click="uploadFiles"
          class="rounded-md bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          :disabled="selectedFiles.length === 0"
        >
          Upload {{ selectedFiles.length > 0 ? `(${selectedFiles.length})` : '' }}
        </button>
      </div>
    </div>
  </div>
</template>

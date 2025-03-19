<script setup lang="ts">
import { onUnmounted } from 'vue';

const props = defineProps<{
  file: File;
  index: number;
}>();

const emit = defineEmits<{
  (e: 'remove', index: number): void;
}>();

function removeFile() {
  emit('remove', props.index);
}

const imageUrl = URL.createObjectURL(props.file);

onUnmounted(() => {
  URL.revokeObjectURL(imageUrl);
});
</script>

<template>
  <div class="group relative">
    <img :src="imageUrl" :alt="file.name" class="h-32 w-full rounded-md object-cover" />
    <div
      class="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 rounded-md transition-all duration-200"
    ></div>
    <button
      @click="removeFile"
      class="absolute top-2 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16">
        <path
          fill="currentColor"
          d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94z"
        />
      </svg>
    </button>
    <div
      class="bg-opacity-50 absolute right-0 bottom-0 left-0 truncate rounded-b-md bg-black px-2 py-1 text-xs text-white"
    >
      {{ file.name }}
    </div>
  </div>
</template>

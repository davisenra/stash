<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import type { ToastType } from '@/composables/useToast';

const props = defineProps<{
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}>();

const emit = defineEmits<{
  (e: 'remove', id: string): void;
}>();

const isVisible = ref(false);
let timeout: number | null = null;

function removeToast() {
  isVisible.value = false;
  setTimeout(() => {
    emit('remove', props.id);
  }, 300);
}

function startTimer() {
  if (props.duration !== 0) {
    timeout = window.setTimeout(() => {
      removeToast();
    }, props.duration || 3000);
  }
}

function clearTimer() {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 10);
  startTimer();
});

onUnmounted(() => {
  clearTimer();
});
</script>

<template>
  <div
    @click="removeToast"
    :class="{
      'ring-opacity-5 pointer-events-auto flex w-full max-w-xs transform rounded-lg border-l-4 shadow-lg ring-1 ring-black transition-all duration-300': true,
      'translate-x-0 opacity-100': isVisible,
      'translate-x-full opacity-0': !isVisible,
      'border-emerald-700 bg-emerald-600': type === 'success',
      'border-red-700 bg-red-600': type === 'error',
      'border-yellow-700 bg-yellow-600': type === 'warning',
      'border-blue-700 bg-blue-600': type === 'info',
    }"
  >
    <div class="w-0 flex-1 p-4">
      <div class="flex items-start">
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-white">
            {{ message }}
          </p>
        </div>
      </div>
    </div>
    <div class="border-opacity-20 flex">
      <button
        @click.stop="removeToast"
        class="flex w-full cursor-pointer items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-white hover:text-gray-200 focus:outline-none"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

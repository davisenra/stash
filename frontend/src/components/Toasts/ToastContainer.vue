<script setup lang="ts">
import { computed } from 'vue';
import ToastItem from '@/components/Toasts/ToastItem.vue';
import type { Toast } from '@/composables/useToast';

const props = defineProps<{
  toasts: Readonly<Toast[]>;
}>();

const emit = defineEmits<{
  (e: 'remove', id: string): void;
}>();

const removeToast = (id: string) => {
  emit('remove', id);
};

const reversedToasts = computed(() => [...props.toasts].reverse());
</script>

<template>
  <div
    aria-live="assertive"
    class="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
  >
    <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
      <TransitionGroup name="toast">
        <ToastItem
          v-for="toast in reversedToasts"
          :key="toast.id"
          :id="toast.id"
          :message="toast.message"
          :type="toast.type"
          :duration="toast.duration"
          @remove="removeToast"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>

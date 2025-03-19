<script setup lang="ts">
import { useConfirmation } from '@/composables/useConfirmation';

const { isOpen, options, handleConfirm, handleCancel } = useConfirmation();
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md rounded-lg bg-white p-5 shadow-md">
        <h3 v-if="options.title" class="mb-2 text-lg font-semibold">{{ options.title }}</h3>
        <p class="text-gray-700">{{ options.message }}</p>
        <div class="mt-5 flex justify-end gap-2.5">
          <button
            class="mt-3 cursor-pointer rounded border border-neutral-300 px-3 py-1 font-bold text-neutral-600"
          >
            {{ options.cancelText }}
          </button>
          <button
            class="mt-3 cursor-pointer rounded bg-emerald-400 px-3 py-1 font-bold text-white hover:bg-emerald-500"
            @click="handleConfirm"
          >
            {{ options.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

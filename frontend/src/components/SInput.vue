<script setup lang="ts">
const model = defineModel();
const emit = defineEmits(['blur', 'focus']);

defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  label: String,
  placeholder: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
});
</script>

<template>
  <div class="flex flex-col py-1">
    <label class="text-sm text-neutral-400" v-if="label" :for="id">{{ label }}</label>
    <input
      class="block min-w-0 grow rounded border border-neutral-600 bg-neutral-800 py-1.5 pr-3 pl-1 text-base text-neutral-400 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
      :class="{ 'border-red-400': error }"
      v-model="model"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <div v-if="error" class="">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
const model = defineModel();

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  id: String,
  label: String,
  placeholder: String,
  modelValue: String,
  error: String,
  disabled: Boolean,
  required: Boolean,
});

const emit = defineEmits(['blur', 'focus']);
</script>

<template>
  <div class="flex flex-col py-1">
    <label class="text-sm text-neutral-400" v-if="label" :for="id">{{ label }}</label>
    <input
      class="max-w-sm rounded border border-neutral-300 py-1"
      :class="{ 'border-red-400': error }"
      v-model="model"
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    />
    <div v-if="error" class="">{{ error }}</div>
  </div>
</template>

<script setup lang="ts"></script>

<template>
  <div
    class="masonry-grid grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.masonry-grid {
  grid-auto-rows: 10px;
}
</style>

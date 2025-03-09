<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppShell from '@/layouts/AppShell.vue';
import { computed } from 'vue';
import { useAuth } from './composables/useAuth';

const { state } = useAuth();
const showNavbar = computed(() => state.isAuthenticated);
</script>

<template>
  <AppShell :show-navbar="showNavbar">
    <RouterView />
  </AppShell>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import AppShell from '@/components/AppShell.vue';
import { computed } from 'vue';
import { useAuth } from './composables/useAuth';

const { state, initAuth, logout } = useAuth();
const router = useRouter();
const showNavbar = computed(() => state.isAuthenticated);

initAuth();

async function handleLogout() {
  await logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <AppShell :show-navbar="showNavbar" @logout="handleLogout">
    <RouterView />
  </AppShell>
</template>

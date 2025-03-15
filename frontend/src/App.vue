<script setup lang="ts">
import { RouterView, useRouter } from 'vue-router';
import SAppShell from '@/components/SAppShell.vue';
import ToastContainer from '@/components/Toasts/ToastContainer.vue';
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useToast } from '@/composables/useToast';

const { state, initAuth, logout } = useAuth();
const { toasts } = useToast();
const router = useRouter();
const showNavbar = computed(() => state.isAuthenticated);

initAuth();

async function handleLogout() {
  await logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <SAppShell :show-navbar="showNavbar" @logout="handleLogout">
    <RouterView />
  </SAppShell>
  <ToastContainer :toasts="toasts" />
</template>

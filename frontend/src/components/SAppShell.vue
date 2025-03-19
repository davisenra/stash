<script setup lang="ts">
import Logo from '@/assets/Logo.vue';
import { ref } from 'vue';

defineProps<{
  showNavbar: boolean;
}>();

const isMobileMenuOpen = ref(false);

const emit = defineEmits(['logout']);

const navigationItems = [
  { name: 'Gallery', href: '/' },
  {
    name: 'Logout',
    href: '',
    onClick: () => {
      if (isMobileMenuOpen.value) {
        isMobileMenuOpen.value = false;
      }
      emit('logout');
    },
  },
];
</script>

<template>
  <div class="flex min-h-screen flex-col bg-neutral-900">
    <nav v-if="showNavbar" class="border-b border-neutral-600 bg-neutral-800 shadow">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <div class="flex flex-shrink-0 items-center text-emerald-500">
              <Logo class="w-8" />
              <span class="ml-1 text-lg font-semibold">Stash</span>
            </div>
          </div>

          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigationItems"
                @click="item.onClick"
                :key="item.name"
                :to="item.href"
                :class="[
                  $route.path === item.href
                    ? 'text-emerald-600'
                    : 'text-neutral-500 hover:text-neutral-400',
                  'rounded-md px-3 py-2 text-sm font-bold',
                ]"
              >
                {{ item.name }}
              </router-link>
            </div>
          </div>

          <div class="flex items-center sm:hidden">
            <button
              @click="isMobileMenuOpen = !isMobileMenuOpen"
              class="inline-flex items-center justify-center rounded-md p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-400 focus:outline-none"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                v-if="!isMobileMenuOpen"
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div v-if="isMobileMenuOpen" class="sm:hidden">
        <div class="space-y-1 pt-2 pb-3">
          <router-link
            v-for="item in navigationItems"
            :key="item.name"
            :to="item.href"
            :class="[
              $route.path === item.href
                ? 'bg-neutral-800 text-emerald-500'
                : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            @click="item.onClick"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <main class="flex flex-1">
      <div class="mx-auto flex max-w-7xl flex-1 px-4 py-6 text-neutral-300 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

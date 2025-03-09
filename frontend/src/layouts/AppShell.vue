<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  showNavbar: boolean;
}>();

const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Logout', href: '/logout' },
];

const isMobileMenuOpen = ref(false);
</script>

<template>
  <div class="flex min-h-screen flex-col bg-neutral-100">
    <nav v-if="showNavbar" class="bg-white shadow">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <div class="flex flex-shrink-0 items-center">
              <span class="text-lg font-semibold">Stash</span>
            </div>
          </div>

          <div class="hidden sm:ml-6 sm:flex sm:items-center">
            <div class="flex space-x-4">
              <router-link
                v-for="item in navigationItems"
                :key="item.name"
                :to="item.href"
                :class="[
                  $route.path === item.href ? 'text-blue-600' : 'text-gray-500 hover:text-gray-900',
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
              class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
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
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900',
              'block rounded-md px-3 py-2 text-base font-medium',
            ]"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
    </nav>

    <main class="flex flex-1">
      <div class="mx-auto flex max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

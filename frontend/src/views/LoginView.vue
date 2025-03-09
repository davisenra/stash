<script setup lang="ts">
import SInput from '@/components/SInput.vue';
import { computed, ref } from 'vue';
import { useAuth } from '@/composables/useAuth.ts';
import { useRouter } from 'vue-router';

const { login, state } = useAuth();
const { push } = useRouter();

const loginPayload = ref({
  email: '',
  password: '',
});

const payloadIsValid = computed(
  () => loginPayload.value.email.length > 0 && loginPayload.value.password.length > 0,
);

async function attemptLogin() {
  if (payloadIsValid.value) {
    await login(loginPayload.value);
    await push('/');
  }
}
</script>

<template>
  <div class="flex w-max flex-1 flex-col justify-center">
    <div class="max-w-lg rounded-lg bg-white p-6 shadow">
      <div class="mb-3 flex space-x-2 text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            color="currentColor"
          >
            <path
              d="M16.902 6.129C18 7.257 18 9.074 18 12.708v1.585c0 3.633 0 5.45-1.098 6.578S14.035 22 10.5 22s-5.303 0-6.402-1.129C3 19.743 3 17.926 3 14.293v-1.585c0-3.634 0-5.45 1.098-6.58C5.197 5 6.964 5 10.5 5s5.303 0 6.402 1.129"
            />
            <path
              d="M7.5 5.5v4.87c0 .935 0 1.402.29 1.57c.561.324 1.614-.758 2.114-1.083c.29-.19.435-.284.596-.284s.306.095.596.284c.5.325 1.553 1.407 2.114 1.083c.29-.168.29-.635.29-1.57V5.5"
            />
            <path d="M9 2h2c4.714 0 7.071 0 8.535 1.464C21 4.93 21 7.286 21 12v6" />
          </g>
        </svg>
        <p class="text-2xl font-bold">Stash</p>
      </div>
      <SInput v-model="loginPayload.email" id="email" label="Email" />
      <SInput v-model="loginPayload.password" id="password" type="password" label="Password" />
      <button
        @click="attemptLogin"
        :class="{
          'mt-3 rounded px-3 py-1 font-bold text-white': true,
          'cursor-pointer bg-emerald-400 hover:bg-emerald-500': payloadIsValid,
          'bg-neutral-400': !payloadIsValid,
        }"
        :disabled="!payloadIsValid"
      >
        Login
      </button>
      {{ state }}
    </div>
  </div>
</template>

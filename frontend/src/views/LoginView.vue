<script setup lang="ts">
import Logo from '@/assets/Logo.vue';
import SInput from '@/components/SInput.vue';
import { computed, ref } from 'vue';
import { useAuth } from '@/composables/useAuth.ts';
import { useRouter } from 'vue-router';

const { login } = useAuth();
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
    <div class="max-w-lg space-y-2 rounded-lg bg-neutral-800 p-6 shadow">
      <div class="mb-4 flex space-x-2 text-emerald-500">
        <Logo />
        <p class="text-2xl font-bold">Stash</p>
      </div>
      <div>
        <SInput v-model="loginPayload.email" id="email" label="Email" placeholder="Email" />
        <SInput
          v-model="loginPayload.password"
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
        <button
          @click="attemptLogin"
          :class="{
            'mt-3 rounded px-3 py-1 font-bold text-white': true,
            'cursor-pointer bg-emerald-400 hover:bg-emerald-500': payloadIsValid,
            'bg-neutral-600': !payloadIsValid,
          }"
          :disabled="!payloadIsValid"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

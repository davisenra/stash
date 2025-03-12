import { reactive, onMounted } from 'vue';
import { apiService } from '@/api/api';

const state = reactive({
  isAuthenticated: false,
  user: null as null,
  error: null as string | null,
  isLoading: false,
  isInitialized: false,
});

// module-level ref to track auth check promise
let authCheckPromise: Promise<void> | null = null;

export function useAuth() {
  async function login(payload: { email: string; password: string }) {
    state.isLoading = true;
    state.error = null;
    try {
      await apiService.login(payload);
      state.isAuthenticated = true;
    } catch (error: any) {
      state.error = error.message || 'Login failed.';
      state.isAuthenticated = false;
      state.user = null;
    } finally {
      state.isLoading = false;
    }
  }

  async function logout() {
    await apiService.logout();
    state.isAuthenticated = false;
  }

  async function checkAuth() {
    if (authCheckPromise) {
      return authCheckPromise;
    }

    authCheckPromise = new Promise(async (resolve) => {
      state.isLoading = true;
      try {
        await apiService.check();
        state.isAuthenticated = true;
      } catch (error) {
        state.isAuthenticated = false;
        state.user = null;
      } finally {
        state.isLoading = false;
        state.isInitialized = true;
        // Reset promise reference after completion
        authCheckPromise = null;
        resolve();
      }
    });

    return authCheckPromise;
  }

  function initAuth() {
    onMounted(() => {
      checkAuth();
    });
  }

  return {
    state,
    login,
    logout,
    checkAuth,
    initAuth,
  };
}

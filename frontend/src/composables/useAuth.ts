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
    const { err } = await apiService.login(payload);
    state.isLoading = false;

    if (err) {
      state.error = err.statusCode === 401 ? 'Invalid credentials' : 'Something went wrong...';
      state.isAuthenticated = false;
      state.user = null;
      return;
    }

    state.isAuthenticated = true;
  }

  async function logout() {
    await apiService.logout();
    state.isAuthenticated = false;
  }

  async function checkAuth() {
    if (authCheckPromise) {
      return authCheckPromise;
    }

    authCheckPromise = (async () => {
      state.isLoading = true;

      const { err } = await apiService.check();

      if (err) {
        state.isAuthenticated = false;
        state.user = null;
      } else {
        state.isAuthenticated = true;
      }

      state.isLoading = false;
      state.isInitialized = true;
    })();

    await authCheckPromise;
    authCheckPromise = null;

    return;
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

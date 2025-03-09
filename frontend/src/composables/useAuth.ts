import { reactive } from 'vue';
import { apiService } from '@/api/api';

const state = reactive({
  isAuthenticated: false,
  user: null as null,
  error: null as string | null,
  isLoading: false,
});

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

  return { state, login };
}

import { createRouter, createWebHistory } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guest: true },
    },
  ],
});

router.beforeEach(async (to, _, next) => {
  const { state, checkAuth } = useAuth();

  if (!state.isInitialized) {
    await checkAuth();
  }

  if (to.meta.requiresAuth && !state.isAuthenticated) {
    return next({ name: 'login' });
  } else if (to.meta.guest && state.isAuthenticated) {
    return next({ name: 'gallery' });
  } else {
    return next();
  }
});

export default router;

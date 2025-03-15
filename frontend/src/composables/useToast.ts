import { ref, readonly } from 'vue';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

const toasts = ref<Toast[]>([]);

export function useToast() {
  const show = (message: string, type: ToastType = 'info', duration: number = 3000): string => {
    const id = generateId();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);
    return id;
  };

  const remove = (id: string): void => {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  };

  const success = (message: string, duration?: number): string => {
    return show(message, 'success', duration);
  };

  const error = (message: string, duration?: number): string => {
    return show(message, 'error', duration);
  };

  const warning = (message: string, duration?: number): string => {
    return show(message, 'warning', duration);
  };

  const info = (message: string, duration?: number): string => {
    return show(message, 'info', duration);
  };

  // Clear all toasts
  const clear = (): void => {
    toasts.value = [];
  };

  return {
    toasts: readonly(toasts),
    show,
    success,
    error,
    warning,
    info,
    remove,
    clear,
  };
}

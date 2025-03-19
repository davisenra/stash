import { ref, readonly } from 'vue';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

const toasts = ref<Toast[]>([]);

export function useToast() {
  function show(message: string, type: ToastType = 'info', duration: number = 3000): string {
    const id = generateId();
    const toast: Toast = {
      id,
      message,
      type,
      duration,
    };

    toasts.value.push(toast);
    return id;
  }

  function remove(id: string): void {
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
  }

  function success(message: string, duration?: number): string {
    return show(message, 'success', duration);
  }

  function error(message: string, duration?: number): string {
    return show(message, 'error', duration);
  }

  function warning(message: string, duration?: number): string {
    return show(message, 'warning', duration);
  }

  function info(message: string, duration?: number): string {
    return show(message, 'info', duration);
  }

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

import { ref, readonly } from 'vue';

interface ConfirmationOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const isOpen = ref(false);
const resolvePromise = ref<((value: boolean) => void) | null>(null);

const options = ref<ConfirmationOptions>({
  title: 'Confirm',
  message: '',
  confirmText: 'Yes',
  cancelText: 'No',
});

export function useConfirmation() {
  async function confirm(opts: string | ConfirmationOptions): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (typeof opts === 'string') {
        options.value = { ...options.value, message: opts };
      } else {
        options.value = { ...options.value, ...opts };
      }

      isOpen.value = true;
      resolvePromise.value = resolve;
    });
  }

  function handleConfirm() {
    isOpen.value = false;
    if (resolvePromise.value) {
      resolvePromise.value(true);
      resolvePromise.value = null;
    }
  }

  function handleCancel() {
    isOpen.value = false;
    if (resolvePromise.value) {
      resolvePromise.value(false);
      resolvePromise.value = null;
    }
  }

  return {
    isOpen: readonly(isOpen),
    options: readonly(options),
    confirm,
    handleConfirm,
    handleCancel,
  };
}

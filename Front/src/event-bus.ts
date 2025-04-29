import { ref } from 'vue';

export const eventBus = ref<{
  showToast: (message: string, color: string) => void;
}>({
  showToast: () => {},
});

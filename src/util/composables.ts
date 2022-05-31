import { ref, Ref } from "vue";

// returns a function that copies text to clipboard, and timed status for notifications
export const useCopy = (): [Ref<boolean>, Function] => {
  const copied = ref(false);
  const copy = async (text = "") => {
    await window.navigator.clipboard.writeText(text || "");
    copied.value = true;
    window.setTimeout(() => (copied.value = false), 1000);
  };
  return [copied, copy];
};

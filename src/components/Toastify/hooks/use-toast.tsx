import { ToastProps } from "../types";

import { useToastStore } from "./use-toast-store";

export const useToast = () => {
  const { addToast, removeFirstToast } = useToastStore();

  function toast({
    duration = 3000,
    ...rest
  }: Omit<ToastProps, "id" | "animation">) {
    const id = crypto.randomUUID();
    addToast({ id, ...rest });
    setTimeout(() => {
      removeFirstToast();
    }, duration);
  }

  return {
    toast,
  };
};

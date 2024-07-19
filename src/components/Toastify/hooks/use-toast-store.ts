import { create } from "zustand";
import { ToastProps } from "../types";

type ToastState = {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  dismissToast: (id: string) => void;
  removeFirstToast: () => void;
};

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  addToast: (toast: ToastProps) => set({ toasts: [...get().toasts, toast] }),
  dismissToast: (toastId: string) =>
    set({ toasts: get().toasts?.filter((toast) => toast.id !== toastId) }),
  removeFirstToast: () => get().dismissToast(get().toasts[0]?.id || ""),
}));

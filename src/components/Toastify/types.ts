export type ToastProps = {
  id?: string;
  type?: ToastTypes;
  animation?: ToastAnimationTypes;
  message?: string;
  duration?: number;
};
export type ToastTypes = "success" | "error" | "info" | "warning";
export type ToastAnimationTypes = "fade-in" | "pop-up" | "slide-x" | "-slide-x";
export type ToastPositions =
  | "top-left"
  | "bottom-left"
  | "top-center"
  | "bottom-center"
  | "bottom-right"
  | "top-right";

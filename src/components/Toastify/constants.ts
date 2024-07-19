import {
  CircleCheckBig,
  CircleX,
  Info,
  LucideIcon,
  TriangleAlert,
} from "lucide-react";

import { ToastAnimationTypes, ToastPositions, ToastTypes } from "./types";

export const classNamesByPosition: Record<ToastPositions, string> = {
  "bottom-center": "bottom-3 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-3 left-3",
  "bottom-right": "bottom-3 right-3",
  "top-center": "top-3 left-1/2 -translate-x-1/2",
  "top-left": "top-3 left-3",
  "top-right": "top-3 right-3",
};

export const classNamesByToastType: Record<ToastTypes, string> = {
  error: "bg-red-500 border-red-400",
  info: "bg-sky-500 border-sky-500",
  warning: "bg-yellow-500 border-yellow-500",
  success: "bg-green-500 border-green-500",
};

export const classNamesByToastAnimationType: Record<
  ToastAnimationTypes,
  string
> = {
  "fade-in": "animate-fade-in",
  "pop-up": "animate-pop-up",
  "slide-x": "animate-slide-x",
  "-slide-x": "-animate-slide-x",
};

export const iconByToastType: Record<ToastTypes, LucideIcon> = {
  success: CircleCheckBig,
  error: CircleX,
  warning: TriangleAlert,
  info: Info,
};

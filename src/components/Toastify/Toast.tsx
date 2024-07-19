"use client";

import { PropsWithChildren } from "react";

import { ToastAnimationTypes, ToastPositions, ToastProps } from "./types";
import { cn } from "../../lib/cn";

import { useToastStore } from "./hooks/use-toast-store";

import { X } from "lucide-react";

import {
  classNamesByPosition,
  classNamesByToastAnimationType,
  classNamesByToastType,
  iconByToastType,
} from "./constants";

export const Toaster = ({
  position = "bottom-left",
  animation = "fade-in",
}: {
  position?: ToastPositions;
  animation?: ToastAnimationTypes;
}) => {
  const { toasts } = useToastStore();
  return toasts.length ? (
    <ToastContainer position={position}>
      {toasts?.map((toast) => (
        <Toast {...toast} key={toast.id} animation={animation} />
      ))}
    </ToastContainer>
  ) : null;
};

const ToastContainer = ({
  position,
  children,
}: PropsWithChildren<{ position: ToastPositions }>) => {
  return (
    <div
      className={cn(
        "fixed flex flex-col gap-y-2",
        classNamesByPosition[position]
      )}
    >
      {children}
    </div>
  );
};

const Toast = ({
  message,
  type = "success",
  animation = "fade-in",
  id,
}: ToastProps) => {
  const { dismissToast } = useToastStore();
  const handleDismissToast = () => dismissToast(id || "");
  const Icon = iconByToastType[type];

  return (
    <div
      className={cn(
        "p-3 justify-between shadow-sm transition-all rounded flex items-center border min-w-[300px] text-white font-semibold",
        classNamesByToastType[type],
        classNamesByToastAnimationType[animation]
      )}
    >
      <div className="flex items-center">
        <span>
          <Icon className="w-4 h-4 mr-2" />
        </span>
        <span>{message}</span>
      </div>
      <X
        className="w-4 h-4 shrink-0 cursor-pointer"
        onClick={handleDismissToast}
      />
    </div>
  );
};

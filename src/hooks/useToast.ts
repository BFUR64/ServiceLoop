import { useSyncExternalStore } from "react";

let toast: boolean = false;
let text: string = "";

const listeners: Set<() => void> = new Set<() => void>();

export function useToast() {
  const open = useSyncExternalStore(subscribe, getToast);
  const message = useSyncExternalStore(subscribe, getToastNotification);

  return [open, message] as const;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notify() {
  for (const listener of listeners) {
    listener();
  }
}

export function setToast(val: boolean) {
  toast = val;
  notify();
}

export function getToast() {
  return toast;
}

export function setToastNotification(val: string) {
  text = val;
  setToast(true);
}

export function getToastNotification() {
  return text;
}

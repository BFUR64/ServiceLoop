import { useSyncExternalStore } from "react";

let text: boolean = false;

const listeners: Set<() => void> = new Set<() => void>();

export function useReloadPopup() {
  return useSyncExternalStore(subscribe, getReloadPopup);
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

export function setReloadPopup(val: boolean) {
  text = val;
  notify();
}

export function getReloadPopup() {
  return text;
}

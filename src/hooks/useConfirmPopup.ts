import { useSyncExternalStore } from "react";

let resolveConfirmation: ((value: boolean) => void) | null = null;
let text: string | null = null;

const listeners: Set<() => void> = new Set<() => void>();

export function useConfirmPopup() {
  return useSyncExternalStore(subscribe, getText);
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

export function getText() {
  return text;
}

export async function confirmPopup(val: string) {
  text = val;

  const promise = new Promise<boolean>((resolve) => {
    resolveConfirmation = resolve;
  });

  notify();

  return promise;
}

export function resolveConfirmationPopup(confirmation: boolean) {
  resolveConfirmation?.(confirmation);
  resolveConfirmation = null;
  text = null;

  notify();
}

import { useSyncExternalStore } from "react";

let text: string | null = null;

const listeners: Set<() => void> = new Set<() => void>();

export function useNotePopup() {
  return [useSyncExternalStore(subscribe, getNote), setNote] as const;
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

export function setNote(val: string | null) {
  text = val;
  notify();
}

export function getNote() {
  return text;
}

import { get, set } from "idb-keyval";

const supportsFs = typeof window.showDirectoryPicker === "function";

const DB_KEY = "service-data-handler";

let handle: FileSystemDirectoryHandle | undefined = undefined;

export async function initHandle() {
  handle = await get(DB_KEY);
}

export function getHandle() {
  if (!handle) {
    throw new DOMException("Handle does not exist", "InvalidStateException");
  }

  return handle;
}

export async function setHandle(newHandle: FileSystemDirectoryHandle) {
  await set(DB_KEY, newHandle);
  handle = newHandle;
}

export function handleExists(): boolean {
  return handle != null;
}

export function supportsFileSystemAPI(): boolean {
  return supportsFs;
}

export async function handleAuthorized(): Promise<boolean> {
  if (!handle) {
    throw new DOMException("Handle does not exist", "InvalidStateException");
  }

  return (await handle.queryPermission({ mode: "readwrite" })) === "granted";
}

export async function authorizeHandle() {
  if (!handle) {
    throw new DOMException("Handle does not exist", "InvalidStateException");
  }

  document.dispatchEvent(
    new CustomEvent("app:authorization-changed", {
      detail: {
        authorized: await handle.requestPermission({ mode: "readwrite" }),
      },
    }),
  );
}

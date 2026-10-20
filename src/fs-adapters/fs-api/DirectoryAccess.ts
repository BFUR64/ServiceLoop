import { get, set } from "idb-keyval";
import { setToastNotification } from "../../hooks/useToast";

export const SUPPORTS_FS = typeof window.showDirectoryPicker === "function";

const DB_KEY = "service-data-handler";

let handle: FileSystemDirectoryHandle | undefined = undefined;

/**
 * Restores the previously selected directory handle from IndexedDB.
 *
 * If no handle has been saved, the in-memory handle remains undefined.
 *
 * @throws If the IndexedDB operation fails.
 */
export async function initHandle() {
  handle = await get(DB_KEY);
}

/**
 * Checks whether a directory handle is currently available in memory.
 *
 * @returns True if a handle exists; otherwise, false.
 */
export function handleExists(): boolean {
  return handle != null;
}

/**
 * Returns the currently selected directory handle.
 *
 * @returns The current directory handle.
 * @throws {DOMException} If no directory handle is available.
 */
export function getHandle() {
  if (!handle) {
    throw new DOMException("Handle does not exist", "InvalidStateError");
  }

  return handle;
}

/**
 * Returns the name of the currently selected directory.
 *
 * @returns The directory name, or "No folder selected" if no handle is available.
 */
export function getHandleName(): string {
  return handle?.name ?? "No folder selected";
}

/**
 * Persists a directory handle in IndexedDB and updates the in-memory handle.
 *
 * The in-memory handle is updated only after persistence succeeds.
 *
 * @param newHandle - The directory handle to persist and select.
 * @throws If the IndexedDB operation fails.
 */
export async function setHandle(
  newHandle: FileSystemDirectoryHandle,
): Promise<void> {
  await set(DB_KEY, newHandle);
  handle = newHandle;
}

/**
 * Checks whether the current directory handle has read-write permission.
 *
 * This function queries the current permission state without requesting
 * additional permission from the user.
 *
 * @returns True if read-write permission is granted; otherwise, false.
 * @throws {DOMException} If no directory handle is available.
 * @throws If the browser's permission query fails.
 */
export async function handleAuthorized(): Promise<boolean> {
  const handle = getHandle();

  return (await handle.queryPermission({ mode: "readwrite" })) === "granted";
}

/**
 * Requests read-write permission for the current directory handle.
 *
 * Dispatches an "app:authorization-changed" event containing the resulting
 * PermissionState after the permission request resolves.
 *
 * @throws {DOMException} If no directory handle is available.
 * @throws If the browser's permission request fails.
 */
export async function authorizeHandle() {
  const handle = getHandle();

  document.dispatchEvent(
    new CustomEvent("app:authorization-changed", {
      detail: {
        authorized: await handle.requestPermission({ mode: "readwrite" }),
      },
    }),
  );
}

/**
 * Opens a directory picker and persists the selected directory handle.
 *
 * Dispatches "app:folder-changed" after the handle is persisted.
 *
 * @throws {DOMException} If the picker is cancelled or blocked by the browser.
 * @throws If persisting the selected handle fails.
 */
export async function requestFolder() {
  await setHandle(await window.showDirectoryPicker({ mode: "readwrite" }));
  document.dispatchEvent(new Event("app:folder-changed"));
}

/**
 * Handles folder selection initiated by the user.
 *
 * Treats picker cancellation as a normal outcome. Displays a notification
 * if the browser blocks folder selection or another error occurs.
 *
 * @remarks Unexpected errors are logged to the console. Errors are handled
 * here rather than propagated to the caller.
 */
export async function handleFolderSelection() {
  try {
    await requestFolder();
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      // Do not throw a toast just because the user cancelled it.
      return;
    }

    if (error instanceof DOMException && error.name === "SecurityError") {
      setToastNotification(
        "The browser blocked folder selection. Check browser security restrictions.",
      );
      return;
    }

    console.error("Failed to select folder:", error);
    setToastNotification("Failed to select or save the selected folder.");
  }
}

/**
 * Checks whether the current directory handle can be enumerated.
 *
 * @returns True if directory enumeration succeeds; false if the directory
 * cannot be found.
 * @throws {DOMException} If no directory handle is available.
 * @throws If enumeration fails for a reason other than NotFoundError.
 */
export async function directoryAvailable(): Promise<boolean> {
  const handle = getHandle();

  try {
    for await (const _ of handle.values()) {
      break;
    }

    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "NotFoundError") {
      return false;
    }

    throw error;
  }
}

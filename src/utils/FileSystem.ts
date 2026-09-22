import { getHandle, setHandle } from "./HandleState";

export async function requestFolder() {
  await setHandle(await window.showDirectoryPicker({ mode: "readwrite" }));
  document.dispatchEvent(new Event("app:folder-changed"));
}

export async function directoryAvailable(): Promise<boolean> {
  const handle = getHandle();

  try {
    // Force the browser to resolve/access the directory.
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

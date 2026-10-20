import { SUPPORTS_FS } from "../fs-adapters/fs-api/DirectoryAccess";
import { FILE_NAME, saveFile } from "../fs-adapters/fs-api/FileAccess";
import { getServiceData } from "../state/ServiceDataMemory";

let initialized = false;
let paused = false;
let saving = false;

export function initFileUpdaterListener() {
  if (SUPPORTS_FS) {
    document.addEventListener("app:authorization-changed", (event) => {
      if (event.detail.authorized === "granted" && !initialized) {
        initialized = true;

        setInterval(async () => {
          if (paused || saving) return;

          saving = true;

          try {
            await saveFile(getServiceData());
          } catch (error) {
            console.error(`Failed to update ${FILE_NAME}:`, error);
          } finally {
            saving = false;
          }
        }, 1000);
      }
    });
  }
}

export function setPaused(val: boolean) {
  paused = val;
}

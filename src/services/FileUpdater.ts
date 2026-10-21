import {
  directoryAvailable,
  handleAuthorized,
  SUPPORTS_FS,
} from "../fs-adapters/fs-api/DirectoryAccess";
import {
  FILE_NAME,
  loadFile,
  saveFile,
} from "../fs-adapters/fs-api/FileAccess";
import { getServiceData } from "../state/ServiceDataMemory";
import { saveToIdb } from "../state/ServiceDataStore";

let paused = false;
let saving = false;

export function initFileUpdaterListener() {
  if (SUPPORTS_FS) {
    setInterval(async () => {
      if (!((await handleAuthorized()) && (await directoryAvailable()))) return;

      if (paused || saving) return;

      saving = true;

      try {
        const serviceDataFile = await loadFile();
        const serviceDataMemory = getServiceData();

        if (serviceDataFile.revision > serviceDataMemory.revision) {
          await saveToIdb(serviceDataFile);
        } else if (serviceDataMemory.revision > serviceDataFile.revision) {
          await saveFile(serviceDataMemory);
        }
      } catch (error) {
        console.error(`Failed to update ${FILE_NAME}:`, error);
      } finally {
        saving = false;
      }
    }, 1000);
  }
}

export function setPaused(val: boolean) {
  paused = val;
}

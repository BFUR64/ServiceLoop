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

/**
 * Initializes a periodic listener that synchronizes service data between
 * IndexedDB and the file system based on their revision numbers.
 *
 * Every second, if the File System Access API is supported, permission is
 * granted, and the target directory is available, the listener compares
 * the revisions of the file system data and in-memory data. The data source
 * with the higher revision overwrites the other.
 *
 * Synchronization is skipped while paused or while another synchronization
 * operation is in progress. Errors are logged without terminating future
 * synchronization attempts.
 *
 * Does nothing if the File System Access API is unsupported.
 */
export function initFileUpdaterListener(): void {
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

/**
 * Pauses or resumes file synchronization. Does not interrupt ongoing
 * synchronization operations.
 *
 * @param val - Whether synchronization should be paused.
 */
export function setPaused(val: boolean) {
  paused = val;
}

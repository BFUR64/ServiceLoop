import * as fileAccess from "../fs-adapters/fs-api/FileAccess";
import { setNote } from "../hooks/useNotePopup";
import { getServiceData } from "../state/ServiceDataMemory";
import { saveToIdb } from "../state/ServiceDataStore";

/**
 * Initializes a listener that synchronizes service data when the active
 * folder changes.
 *
 * Listens for the `app:folder-changed` custom event on the document.
 * When triggered, checks whether the selected folder contains a service
 * data file. If the file exists, its contents are loaded and saved to
 * IndexedDB. Otherwise, the current in-memory service data is saved to
 * a new file in the selected folder.
 *
 * Displays a notification when synchronization completes successfully.
 * Errors encountered during the operation are logged to the console.
 */
export function initFolderChangeListener(): void {
  document.addEventListener("app:folder-changed", async () => {
    try {
      const fileExists = await fileAccess.checkFileExists();

      if (fileExists) {
        const data = await fileAccess.loadFile();
        await saveToIdb(data);
      } else {
        await fileAccess.saveFile(getServiceData());
      }

      setNote(`ServiceData imported!`);
    } catch (error) {
      console.error(
        "Failed to load file or save service data to IndexedDB after folder change:",
        error,
      );
    }
  });
}

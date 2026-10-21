import * as fileAccess from "../fs-adapters/fs-api/FileAccess";
import { setText } from "../hooks/useNotePopup";
import { saveToIdb } from "../state/ServiceDataStore";

/**
 * Initializes a listener that imports service data when the active folder
 * changes.
 *
 * Listens for the `app:folder-changed` custom event on the document.
 * When triggered, loads service data from the selected folder and saves it
 * to IndexedDB. Displays a success notification after the import completes.
 *
 * Errors encountered during loading or saving are logged to the console.
 */
export function initFolderChangeListener(): void {
  document.addEventListener("app:folder-changed", async () => {
    try {
      const data = await fileAccess.loadFile();

      await saveToIdb(data);

      setText(`ServiceData imported!`);
    } catch (error) {
      console.error(
        "Failed to load file or save service data to IndexedDB after folder change:",
        error,
      );
    }
  });
}

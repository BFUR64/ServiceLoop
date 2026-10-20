import * as fileAccess from "../fs-adapters/fs-api/FileAccess";
import { setText } from "../hooks/useNotePopup";
import { saveToIdb } from "../state/ServiceDataStore";

export function initFolderChangeListener() {
  document.addEventListener("app:folder-changed", async () => {
    const data = await fileAccess.loadFile();

    await saveToIdb(data);

    setText(`ServiceData imported!`);
  });
}

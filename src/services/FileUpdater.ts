import { supportsFileSystemAPI } from "../fs-adapters/fs-api/DirectoryAccess";
import { saveFile } from "../fs-adapters/fs-api/FileAccess";
import { getServiceData } from "../state/ServiceDataMemory";

export function initFileUpdaterListener() {
  if (supportsFileSystemAPI()) {
    document.addEventListener("app:authorization-changed", (event) => {
      if (event.detail.authorized === "granted") {
        setInterval(async () => {
          await saveFile(getServiceData());
        }, 1000);
      }
    });
  }
}

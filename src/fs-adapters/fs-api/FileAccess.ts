import { emptyServiceData, type ServiceData } from "../../models/ServiceData";
import {
  directoryAvailable,
  getHandle,
  handleAuthorized,
} from "./DirectoryAccess";

export async function loadFile(): Promise<ServiceData> {
  const handle = getHandle();

  if (!((await handleAuthorized()) && (await directoryAvailable()))) {
    throw new DOMException(
      "Not authorized / Directory does not exist",
      "InvalidStateError",
    );
  }

  try {
    const fileHandle = await handle.getFileHandle("service-loop.json");
    const file = await fileHandle.getFile();
    const text = await file.text();

    return JSON.parse(text) as ServiceData;
  } catch (error) {
    // We finished searching and never found the file
    // Create a default file for the next `loadFile()` call
    if (error instanceof DOMException && error.name === "NotFoundError") {
      await saveFile(emptyServiceData);
      return emptyServiceData;
    }

    throw error;
  }
}

export async function saveFile(data: ServiceData) {
  const handle = getHandle();

  if (!((await handleAuthorized()) && (await directoryAvailable()))) {
    throw new DOMException(
      "Not authorized / Directory does not exist",
      "InvalidStateError",
    );
  }

  const fileHandle = await handle.getFileHandle("service-loop.json", {
    create: true,
  });

  const writable = await fileHandle.createWritable();

  try {
    await writable.write(JSON.stringify(data, null, 2));
  } finally {
    await writable.close();
  }
}

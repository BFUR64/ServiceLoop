import { directoryAvailable } from "./FileSystem";
import { getHandle, handleAuthorized } from "./HandleState";

export interface ServiceData {
  schemaVersion: number;
  revision: number;
  vehicles: VehicleData[];
}

export interface VehicleData {
  id: string;
  nickname: string;
  note: string | null;
  make: string | null;
  model: string | null;
  trim: string | null;
  year: string | null;
  engine: string | null;
  fuel: string | null;
  currentOdometer: number;
  taskItems: TaskItem[];
  maintenanceItems: MaintenanceItem[];
}

export interface TaskItem {
  id: string;
  name: string;
  note: string | null;
  priority: boolean;
}

export interface MaintenanceItem {
  id: string;
  name: string;
  note: string | null;
  dateServiced: string;
  mileageServiced: number;
  intervalKm: number | null;
  intervalTime: IntervalTime;
  priority: boolean;
}

export interface IntervalTime {
  unit: TimeUnit;
  value: number | null;
}

export type TimeUnit = "day" | "week" | "month" | "year";

export const emptyServiceData: ServiceData = {
  schemaVersion: 1,
  revision: 1,
  vehicles: [],
};

export async function loadFile(): Promise<ServiceData> {
  const handle = getHandle();

  if (!((await handleAuthorized()) && (await directoryAvailable()))) {
    throw new DOMException(
      "Not authorized / Directory does not exist",
      "InvalidStateException",
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
      "InvalidStateException",
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

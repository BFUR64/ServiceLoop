import {
  emptyServiceData,
  type MaintenanceItem,
  type ServiceData,
  type TaskItem,
  type VehicleData,
} from "../models/ServiceData";
import { loadFile, saveFile } from "../services/FileAccess";
import {
  directoryAvailable,
  handleAuthorized,
  handleExists,
} from "../services/DirectoryAccess";

let serviceData: ServiceData = emptyServiceData;

const listeners: Set<() => void> = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function notify() {
  for (const listener of listeners) {
    listener();
  }
}

export function getServiceData() {
  return serviceData;
}

export async function loadData() {
  try {
    if (
      handleExists() &&
      (await handleAuthorized()) &&
      (await directoryAvailable())
    ) {
      serviceData = await loadFile();
      notify();
    }
  } catch (error) {
    console.error("Failed to load service data:", error);
  }
}

export function addVehicle(data: VehicleData) {
  serviceData = {
    ...serviceData,
    vehicles: [...serviceData.vehicles, data],
  };

  notify();
  persistServiceData();
}

export function updateVehicle(vId: string, changes: Partial<VehicleData>) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            ...changes,
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function removeVehicle(vId: string) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.filter((vehicle) => vehicle.id !== vId),
  };

  notify();
  persistServiceData();
}

export function addTaskItem(vId: string, data: TaskItem) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            taskItems: [...vehicle.taskItems, data],
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function addMaintenanceItem(vId: string, data: MaintenanceItem) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            maintenanceItems: [...vehicle.maintenanceItems, data],
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function updateTaskItem(
  vId: string,
  sId: string,
  changes: Partial<TaskItem>,
) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            taskItems: vehicle.taskItems.map((item) =>
              item.id === sId
                ? {
                    ...item,
                    ...changes,
                  }
                : item,
            ),
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function updateMaintenanceItem(
  vId: string,
  sId: string,
  changes: Partial<MaintenanceItem>,
) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            maintenanceItems: vehicle.maintenanceItems.map((item) =>
              item.id === sId
                ? {
                    ...item,
                    ...changes,
                  }
                : item,
            ),
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function removeTaskItem(vId: string, sId: string) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            taskItems: vehicle.taskItems.filter((item) => item.id !== sId),
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

export function removeMaintenanceItem(vId: string, sId: string) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.map((vehicle) =>
      vehicle.id === vId
        ? {
            ...vehicle,
            maintenanceItems: vehicle.maintenanceItems.filter(
              (item) => item.id !== sId,
            ),
          }
        : vehicle,
    ),
  };

  notify();
  persistServiceData();
}

function persistServiceData() {
  saveFile(serviceData).catch((error: unknown) => {
    console.error("Failed to save service data:", error);
  });
}

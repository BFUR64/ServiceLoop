import {
  emptyServiceData,
  loadFile,
  saveFile,
  type MaintenanceItem,
  type ServiceData,
  type TaskItem,
  type VehicleData,
} from "../utils/FileHandler";
import { directoryAvailable } from "../utils/FileSystem";
import { handleAuthorized, handleExists } from "../utils/HandleState";

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
  if (
    handleExists() &&
    (await handleAuthorized()) &&
    (await directoryAvailable())
  ) {
    serviceData = await loadFile();
    notify();
  }
}

export function addVehicle(data: VehicleData) {
  serviceData = {
    ...serviceData,
    vehicles: [...serviceData.vehicles, data],
  };

  notify();
  saveFile(serviceData);
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
  saveFile(serviceData);
}

export function removeVehicle(vId: string) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.filter((vehicle) => vehicle.id !== vId),
  };

  notify();
  saveFile(serviceData);
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
  saveFile(serviceData);
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
  saveFile(serviceData);
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
  saveFile(serviceData);
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
  saveFile(serviceData);
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
  saveFile(serviceData);
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
  saveFile(serviceData);
}

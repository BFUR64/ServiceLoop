import {
  emptyServiceData,
  type MaintenanceItem,
  type ServiceData,
  type TaskItem,
  type VehicleData,
} from "../models/ServiceData";
import { loadFromIdb, saveToIdb } from "./ServiceDataStore";

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
  const loadedServiceData = await loadFromIdb();

  if (loadedServiceData == undefined) {
    await saveToIdb(emptyServiceData);
    return;
  }

  serviceData = loadedServiceData;
  notify();
}

export async function addVehicle(data: VehicleData) {
  serviceData = {
    ...serviceData,
    vehicles: [...serviceData.vehicles, data],
  };

  notify();
  await saveToIdb(serviceData);
}

export async function updateVehicle(
  vId: string,
  changes: Partial<VehicleData>,
) {
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
  await saveToIdb(serviceData);
}

export async function removeVehicle(vId: string) {
  serviceData = {
    ...serviceData,
    vehicles: serviceData.vehicles.filter((vehicle) => vehicle.id !== vId),
  };

  notify();
  await saveToIdb(serviceData);
}

export async function addTaskItem(vId: string, data: TaskItem) {
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
  await saveToIdb(serviceData);
}

export async function addMaintenanceItem(vId: string, data: MaintenanceItem) {
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
  await saveToIdb(serviceData);
}

export async function updateTaskItem(
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
  await saveToIdb(serviceData);
}

export async function updateMaintenanceItem(
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
  await saveToIdb(serviceData);
}

export async function removeTaskItem(vId: string, sId: string) {
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
  await saveToIdb(serviceData);
}

export async function removeMaintenanceItem(vId: string, sId: string) {
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
  await saveToIdb(serviceData);
}

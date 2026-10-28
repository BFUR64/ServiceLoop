import { ServiceData } from "@/models/service-data";
import { useSyncExternalStore } from "react";

export function useServiceData() {
  return useSyncExternalStore(subscribe, getServiceData, getServiceData);
}

const data: ServiceData = {
  schemaVersion: 1,
  revision: 14,
  vehicles: [
    {
      nickname: "Terrance Motorcycle",
      note: null,
      make: "Honda",
      model: "XRM",
      trim: "110",
      year: "2006",
      engine: "110cc",
      fuel: "RON95",
      currentOdometer: 52043,
      id: "b10e6dac-17e6-4b18-a22b-1ff1921ad15a",
      taskItems: [
        {
          id: "8d103d3b-f457-424d-8255-800540dc742a",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "1",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "2",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "3",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "4",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "5",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "6",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "7",
          priority: false,
          name: "EKO3RJGUHNJFKLEORGFIJNEMFKGLKJHNFGKJHFNDKFJGFN",
          note: null,
        },
        {
          id: "dc1bb113-16b4-4848-b867-996c6ccff72c",
          priority: false,
          name: "Add Railing",
          note: null,
        },
      ],
      maintenanceItems: [
        {
          id: "0c37fea0-1462-4f52-af67-ba325686214f",
          priority: false,
          name: "Air Filter",
          note: null,
          dateServiced: "2025-07-01T06:01:18.270Z",
          mileageServiced: 48000,
          intervalKm: 15000,
          intervalTime: {
            value: 18,
            unit: "month",
          },
        },
        {
          id: "95fd198d-da27-4ff7-adde-569d24ebdf66",
          priority: false,
          name: "Engine Oil",
          note: null,
          dateServiced: "2026-08-01T06:02:08.765Z",
          mileageServiced: 50928,
          intervalKm: 1500,
          intervalTime: {
            value: 3,
            unit: "month",
          },
        },
        {
          id: "577594cb-1f60-4f3b-a241-dd844bcdd705",
          priority: false,
          name: "Chain Adjustment",
          note: null,
          dateServiced: "2026-10-18T06:06:38.807Z",
          mileageServiced: 52018,
          intervalKm: 1000,
          intervalTime: {
            value: null,
            unit: "month",
          },
        },
        {
          id: "fa312dd4-f9d2-462b-9924-07fbf254ca91",
          priority: false,
          name: "Spark Plugs",
          note: null,
          dateServiced: "2026-08-15T06:04:47.480Z",
          mileageServiced: 51000,
          intervalKm: 8000,
          intervalTime: {
            value: 2,
            unit: "year",
          },
        },
        {
          id: "2e84477a-96f8-4367-875b-84215de257c4",
          priority: false,
          name: "Valve Clearance",
          note: null,
          dateServiced: "2026-08-15T06:05:20.197Z",
          mileageServiced: 51000,
          intervalKm: 6000,
          intervalTime: {
            value: null,
            unit: "month",
          },
        },
        {
          id: "edd0ef01-f9dd-4f7c-b9e6-a2628dd5350a",
          priority: false,
          name: "Chain Clean/Lube",
          note: null,
          dateServiced: "2026-10-18T06:06:39.809Z",
          mileageServiced: 52018,
          intervalKm: 500,
          intervalTime: {
            value: 1,
            unit: "month",
          },
        },
      ],
    },
    {
      id: "00123912039213029-12-312-3213123-1212-312-",
      nickname: "TEIC",
      note: null,
      make: null,
      model: null,
      trim: null,
      year: null,
      engine: null,
      fuel: null,
      currentOdometer: 0,
      taskItems: [],
      maintenanceItems: [],
    },
  ],
};

let serviceData: ServiceData = data;

const listeners: Set<() => void> = new Set<() => void>();

export function subscribe(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getServiceData() {
  return serviceData;
}

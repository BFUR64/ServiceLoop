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

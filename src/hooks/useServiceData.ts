import { useSyncExternalStore } from "react";
import { getServiceData, subscribe } from "../state/ServiceDataMemory";

export function useServiceData() {
  return useSyncExternalStore(subscribe, getServiceData);
}

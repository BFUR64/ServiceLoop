import { useSyncExternalStore } from "react";
import { getServiceData, subscribe } from "../state/DataStorage";

export function useServiceData() {
  return useSyncExternalStore(subscribe, getServiceData);
}

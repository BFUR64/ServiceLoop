import { del, get, set } from "idb-keyval";
import { type ServiceData } from "../models/ServiceData";

export const DB_KEY = "service-data";

export async function saveToIdb(serviceData: ServiceData): Promise<void> {
  await set(DB_KEY, serviceData);

  document.dispatchEvent(new Event("app:data-store-changed"));
}

export async function loadFromIdb(): Promise<ServiceData | undefined> {
  return (await get(DB_KEY)) as ServiceData | undefined;
}

export async function deleteDataFromIdb() {
  await del(DB_KEY);

  document.dispatchEvent(new Event("app:data-store-changed"));
}

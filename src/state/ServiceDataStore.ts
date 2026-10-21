import { del, get, set } from "idb-keyval";
import { type ServiceData } from "../models/ServiceData";

export const DB_KEY = "service-data";

/**
 * Saves service data to IndexedDB.
 *
 * Dispatches an `app:data-store-changed` event after the save succeeds.
 *
 * @param serviceData - The service data to persist.
 * @throws If the IndexedDB operation fails.
 */
export async function saveToIdb(serviceData: ServiceData): Promise<void> {
  await set(DB_KEY, serviceData);

  document.dispatchEvent(new Event("app:data-store-changed"));
}

/**
 * Loads service data from IndexedDB.
 *
 * @returns The stored service data, or `undefined` if no data exists.
 * @throws If the IndexedDB operation fails.
 */
export async function loadFromIdb(): Promise<ServiceData | undefined> {
  return (await get(DB_KEY)) as ServiceData | undefined;
}

/**
 * Deletes service data from IndexedDB.
 *
 * Dispatches an `app:data-store-changed` event after the deletion succeeds.
 *
 * @throws If the IndexedDB operation fails.
 */
export async function deleteDataFromIdb(): Promise<void> {
  await del(DB_KEY);

  document.dispatchEvent(new Event("app:data-store-changed"));
}

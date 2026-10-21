import { loadData } from "../state/ServiceDataMemory";

/**
 * Initializes a listener that reloads in-memory service data whenever the
 * underlying data store changes.
 *
 * Listens for the `app:data-store-changed` custom event on the document and
 * asynchronously calls {@link loadData} when the event is dispatched.
 *
 * Errors encountered during loading are logged to the console.
 */
export default function initServiceDataMemoryListener(): void {
  document.addEventListener("app:data-store-changed", async () => {
    try {
      await loadData();
    } catch (error) {
      console.error(
        "Failed to load service data after data store change:",
        error,
      );
    }
  });
}

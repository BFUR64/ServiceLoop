import { loadData } from "../state/ServiceDataMemory";

export default function initServiceDataMemoryListener() {
  document.addEventListener("app:data-store-changed", () => {
    loadData();
  });
}

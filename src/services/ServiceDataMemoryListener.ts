import { loadData } from "../state/ServiceDataMemory";

export default function initServiceDataMemoryListener() {
  document.addEventListener("app:folder-changed", () => {
    loadData();
  });

  document.addEventListener("app:authorization-changed", (event) => {
    if (event.detail.authorized) {
      loadData();
    }
  });
}

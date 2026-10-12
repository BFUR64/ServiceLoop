import { loadData } from "../state/DataStorage";

export default function initDataService() {
  document.addEventListener("app:folder-changed", () => {
    loadData();
  });

  document.addEventListener("app:authorization-changed", (event) => {
    if (event.detail.authorized) {
      loadData();
    }
  });
}

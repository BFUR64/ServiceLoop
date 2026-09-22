import { loadData } from "../state/DataStorage";

export default function initDataService() {
  document.addEventListener("app:folder-changed", () => {
    loadData();
  });
}

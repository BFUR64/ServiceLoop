import type { ServiceData } from "../models/ServiceData";

export function exportJSON(data: ServiceData, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

export async function importJSON(file: File) {
  const text = await file.text();
  return JSON.parse(text);
}

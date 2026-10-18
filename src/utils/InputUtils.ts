export function validateName(name: string): string {
  if (name.trim() === "") {
    return "Cannot be empty";
  }

  return "";
}

export function normalizeOdometer(stringNum: string) {
  const number = Number.parseInt(stringNum);

  if (!Number.isFinite(number) || number < 0) {
    return 0;
  }

  return number;
}

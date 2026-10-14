export function validateName(name: string): string {
  if (name.trim() === "") {
    return "Cannot be empty";
  }

  return "";
}

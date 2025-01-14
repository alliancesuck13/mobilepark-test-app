export function generateRandomId(
  min: number = 1,
  max: number = 1_000_00,
): number {
  if (min >= max) {
    throw new Error("Минимальное значение должно быть меньше максимального");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

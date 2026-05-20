export function getRandomInt(
  min: number,
  max: number,
  multiplier: number = 1
): number {
  const minMultiple = Math.ceil(min / multiplier);
  const maxMultiple = Math.floor(max / multiplier);
  return (
    Math.floor(Math.random() * (maxMultiple - minMultiple + 1) + minMultiple) *
    multiplier
  );
}

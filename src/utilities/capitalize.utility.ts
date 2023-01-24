export const Capitalize = (value: string = ""): string => {
  const valueLower = value.toLowerCase()
  return valueLower.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}
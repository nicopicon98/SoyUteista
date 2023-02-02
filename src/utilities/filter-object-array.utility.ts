export const existsObject = 
  (array: Array<any>, key: string, value: string): boolean => {
  return array.some(function(item) {
    return item[key].includes(value);
  });
}
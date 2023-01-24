export const replaceNull = (someObj: any, replaceValue = "") => {
  const replacer = (key: any, value: any) => String(value) === "null" || String(value) === "undefined" ? replaceValue : value;
  return JSON.parse(JSON.stringify(someObj, replacer));
}
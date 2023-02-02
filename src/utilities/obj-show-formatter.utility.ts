export const objectShownFormmatter = (obj: any) => {
  const seen = []
  const a = JSON.stringify(obj, function (key, val) {
    if (val != null && typeof val == "object") {
      if (seen.indexOf(val as never) >= 0) {
        return;
      }
      seen.push(val as never);
    }
    return val
  })
  return a
} 
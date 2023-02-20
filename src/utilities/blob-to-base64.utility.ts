// export const blobToBase64 = (blob: Blob) => {
//   return new Promise((resolve, _) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.readAsDataURL(blob);
//   });
// }

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Invalid base64 data"));
      }
    };
    reader.onerror = (event) => {
      reject(event.target?.error ?? new Error("Unknown error"));
    };
    reader.readAsDataURL(blob);
  });
};
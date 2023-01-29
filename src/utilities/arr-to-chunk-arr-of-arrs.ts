import { Service } from "@src/screens/crear-cita-bienestar/models/services.model"

export const arrToChunkArrOfArrs =
  (arr: Service[], perChunk: number): Array<Service[]> => {
    const newArr = arr.reduce((resultArray: Array<Service[]>, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, [])
    return newArr
  }
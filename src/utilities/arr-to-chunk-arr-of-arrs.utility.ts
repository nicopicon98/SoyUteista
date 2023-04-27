import { IBienestarService } from "@src/screens/crear-cita-bienestar/models/services.model"

export const arrToChunkArrOfArrs =
  (arr: IBienestarService[], perChunk: number): Array<IBienestarService[]> => {
    const newArr = arr.reduce((resultArray: Array<IBienestarService[]>, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, [])
    return newArr
  }
import { ISegmentedService } from "@src/screens/crear-cita-bienestar/models/services.model"

export const arrToChunkArrOfArrs =
  (arr: ISegmentedService[], perChunk: number): Array<ISegmentedService[]> => {
    const newArr = arr.reduce((resultArray: Array<ISegmentedService[]>, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, [])
    return newArr
  }
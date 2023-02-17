export interface IEnable {
  id_modulo: number,
  nombre: string,
  habilitado: number
}

export interface IRespEnable {
  data: {
    id_modulo: number,
    nombre: string,
    habilitado: number
  }[]
}
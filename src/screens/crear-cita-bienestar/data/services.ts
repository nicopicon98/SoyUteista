import { ISegmentedService } from "@src/models"


export const servicesFn = (fn: () => void) => {
  const services: ISegmentedService[] = [
    {
      value: 'odontologia',
      label: 'Odontologia',
      icon: 'tooth-outline',
    },
    {
      value: 'psicologia',
      label: 'Psicologia',
      icon: 'head-snowflake-outline',
    },
    {
      value: 'medicina',
      label: 'Medicina',
      icon: 'stethoscope',
    },
  ]
  return services.map(e => {
    return { ...e, onPress: fn }
  })
}
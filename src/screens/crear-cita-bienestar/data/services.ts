import { Service } from '../models/services.model';

export const servicesFn = (fn: () => void) => {
  const services: Service[] = [
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
  const servicesResp = services.map(e => {
    return { ...e, onPress: fn }
  })
  return servicesResp
}
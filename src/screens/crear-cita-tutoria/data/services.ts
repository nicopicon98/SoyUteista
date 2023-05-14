import {ISegmentedService} from '@src/models';

export const servicesFn = (fn: () => void) => {
  const services: ISegmentedService[] = [
    {
      value: 'PRESENCIAL',
      label: 'Presencial',
      icon: 'human-male-board',
    },
    {
      value: 'REMOTO',
      label: 'Remoto',
      icon: 'laptop',
    },
  ];
  return services.map(e => {
    return {...e, onPress: fn};
  });
};

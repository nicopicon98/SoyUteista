import {IProfessionalSchedule} from '@src/models';

type CalendarFormat = {
  [date: string]: {
    marked: boolean;
    dotColor: string;
    customStyles: {
      container: {
        backgroundColor: string;
      };
      text: {
        color: string;
      };
    };
  };
};

export function scheduleDataToCalendarFormat(
  data: IProfessionalSchedule[],
): CalendarFormat {
  const formattedData: CalendarFormat = {};
  data.forEach(item => {
    const date = new Date(item.date);
    formattedData[date.toISOString().split('T')[0]] = {
      marked: true,
      dotColor: 'blue',
      customStyles: {
        container: {
          backgroundColor: 'green',
        },
        text: {
          color: 'black',
        },
      },
    };
  });
  return formattedData;
}

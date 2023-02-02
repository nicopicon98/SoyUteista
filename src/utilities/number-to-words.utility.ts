export const numberToWords = (number: string) => {
  switch (number) {
    case '01:00':
    case '13:00':
      return "one";
    case '02:00':
    case '14:00':
      return "two";
    case '03:00':
    case '15:00':
      return "three";
    case '04:00':
    case '16:00':
      return "fourth";
    case '05:00':
    case '17:00':
      return "five";
    case '06:00':
    case '18:00':
      return "six";
    case '07:00':
    case '19:00':
      return "seven";
    case '08:00':
    case '20:00':
      return "eight";
    case '09:00':
    case '21:00':
      return "nine";
    case '10:00':
    case '22:00':
      return "ten";
    case '11:00':
    case '23:00':
      return "eleven";
    case '12:00':
    case '00:00':
      return "twelve";
    default:
      return ""
  }
} 
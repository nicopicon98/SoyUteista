export const numberToWords = (number: string) => {
  switch (number) {
    case '01':
    case '13':
      return "one";
    case '02':
    case '14':
      return "two";
    case '03':
    case '15':
      return "three";
    case '04':
    case '16':
      return "four";
    case '05':
    case '17':
      return "five";
    case '06':
    case '18':
      return "six";
    case '07':
    case '19':
      return "seven";
    case '08':
    case '20':
      return "eight";
    case '09':
    case '21':
      return "nine";
    case '10':
    case '22':
      return "ten";
    case '11':
    case '23':
      return "eleven";
    case '12':
    case '00':
      return "twelve";
    default:
      return ""
  }
} 
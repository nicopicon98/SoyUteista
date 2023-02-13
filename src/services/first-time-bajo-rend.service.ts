import AsyncStorage from '@react-native-async-storage/async-storage';

export class BajoRendManager {
  
  static setFirstTimeAsync = () => {
    return AsyncStorage.setItem('firstTimeBajoRend', "true");
  }

  static getFirstTimeAsync = () => {
    return AsyncStorage.getItem('firstTimeBajoRend');
  }
}
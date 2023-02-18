import { colores } from "@src/theme";
import { Appearance } from "react-native";


export const screens = (navigation: any) => {
  const colorScheme = Appearance.getColorScheme();
  return [
    {
      icon: 'heart-flash',
      label: 'Bienestar',
      color: colores.Pantone_382_C,
      style: { borderRadius: 100, backgroundColor: colorScheme === 'dark' ? 'white' : colores.Pantone_383_C },
      onPress: () => navigation.navigate('Bienestar'),
    },
    {
      icon: 'human-male-board',
      label: 'Tutorias',
      style: { borderRadius: 100, backgroundColor: colorScheme === 'dark' ? 'white' : colores.Pantone_383_C },
      color: colores.Pantone_382_C,
      onPress: () => navigation.navigate('Tutorias'),
    }
  ]
}


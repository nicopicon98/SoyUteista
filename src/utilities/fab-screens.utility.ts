import { colores } from "@src/theme";


export const screens = (navigation: any) => ([
  {
    icon: 'heart-flash',
    label: 'Bienestar',
    color: colores.Pantone_382_C,
    style: { borderRadius: 100 },
    onPress: () => navigation.navigate('Bienestar'),
  },
  {
    icon: 'human-male-board',
    label: 'Tutorias',
    style: { borderRadius: 100 },
    color: colores.Pantone_382_C,
    onPress: () => navigation.navigate('Tutorias'),
  }
])
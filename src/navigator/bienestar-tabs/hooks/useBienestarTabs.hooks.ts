import { BienestarInstitucionalScreen } from '@src/screens/bienestar-institucional';
import { CrearCitaBienestarScreen } from '@src/screens/crear-cita-bienestar';
import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react'

export const useBienestarTabs = (amountCitas: number) => {
  const [index, setIndex] = useState(0);
  const [badgeVisible, setBadgeVisible] = useState(true);
  const routes = [
    {
      key: 'agendar',
      title: 'Agenda tu cita',
      focusedIcon: 'calendar-account',
      unfocusedIcon: 'calendar-account-outline',
    },
    {
      key: 'todas',
      title: 'Todas tus citas',
      focusedIcon: 'album',
      badge: badgeVisible  && amountCitas > 0 && amountCitas,
    },
  ]

  const renderScene = BottomNavigation.SceneMap({
    agendar: CrearCitaBienestarScreen,
    todas: BienestarInstitucionalScreen
  });

  return {
    index,
    setIndex,
    routes,
    renderScene,
    setBadgeVisible
  }
}
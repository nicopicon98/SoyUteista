import { useRoute } from '@react-navigation/native';
import { AppBarComponent } from '@src/components/app-bar';
import { SplashTemp } from '@src/components/splash-temp';
import React, { useLayoutEffect } from 'react'
import { Text, View } from 'react-native';

export const TempScreen = () => {

  const route = useRoute();
  const { name } = route;

  return (
    <>
      <AppBarComponent title={name} />
      <SplashTemp />
    </>
  )
}

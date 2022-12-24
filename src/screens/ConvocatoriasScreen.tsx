import React from 'react';
import {View} from 'react-native-animatable';
import AppBarComponent from '../components/AppBarComponent';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ListConvocatorias from '../components/ListConvocatorias';

const ConvocatoriasScreen = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <AppBarComponent title="Convocatorias" />
      <View
        style={{
          flex: 1,
          marginBottom: bottom,
          backgroundColor: 'white'
        }}>
          <ListConvocatorias/>
        </View>
    </>
  );
};

export default ConvocatoriasScreen;

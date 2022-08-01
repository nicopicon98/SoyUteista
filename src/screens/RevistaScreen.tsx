import React from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Appearance } from 'react-native';
import { Text } from 'react-native-animatable';
import { Revista } from '../components/Revista';

import { useRevista } from '../hooks/useRevista';
import { colores, fonts } from '../theme/appTheme';

export const RevistaScreen = () => {
  const { height, width } = useWindowDimensions();
  const { isLoading, revistas } = useRevista();
  const colorScheme = Appearance.getColorScheme();

  return (
    <View style={{...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white'}}>
      {isLoading
        ? <ActivityIndicator style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} color={colores.Pantone_382_C} size='large' />
        : <View style={{ alignItems: 'center' }}>
          <FlatList
            data={revistas}
            keyExtractor={(revista) => revista.url}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                marginBottom: width * 0.04,
                top: width * 0.05,
                paddingBottom: width * 0.03,
                fontSize: width * 0.09,
                left: -(width * 0.005)
              }}>Revista SoyUteísta</Text>
            )}
            renderItem={({ item, index }) => <Revista item={item} />}
          />
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  globalMargin: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 35,
    fontFamily: fonts.semibold
  }
});
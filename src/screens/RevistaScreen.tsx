import React from 'react'
import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-animatable';
import { Revista } from '../components/Revista';

import { useRevista } from '../hooks/useRevista';
import { colores } from '../theme/appTheme';

export const RevistaScreen = () => {
  const { height, width } = useWindowDimensions();
  const { isLoading, revistas } = useRevista();

  return (
    <View style={styles.container}>
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
                ...styles.globalMargin,
                marginBottom: 20,
                marginHorizontal: 20,
                top: 20,
                flexDirection: 'column',
                paddingBottom: 10,
                alignItems: 'center'
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
    fontWeight: 'bold'
  }
});
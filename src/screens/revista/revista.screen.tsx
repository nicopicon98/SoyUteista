import { View, ActivityIndicator, StyleSheet, FlatList, useWindowDimensions, Appearance, RefreshControl } from 'react-native';
import { AppBarComponent } from '@src/components/app-bar';
import { Text } from 'react-native-animatable';
import { Revista } from './components/revista';
import { colores, fonts } from '@src/theme';
import { useRevista } from './hooks';
import { useState } from 'react';

export const RevistaScreen = () => {
  const { width } = useWindowDimensions();
  const { isLoading, revistas, loadRevista } = useRevista();
  const colorScheme = Appearance.getColorScheme();

  const [isRefreshing, setIsRefreshing] = useState(false);

  //pull to refresh
  const loadNoticiasFromBackend = async () => {
    //primero, ponemos la pantalla en modo de carga
    setIsRefreshing(true);
    //cargamos la info
    await loadRevista();
    //finalmente, ponemos la pantalla en modo false
    setIsRefreshing(false);
  };

  return (
    <>
      <AppBarComponent title="Revista" />
      <View
        style={{
          ...styles.container,
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
        }}>
        {isLoading ? (
          <ActivityIndicator
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
            color={colores.Pantone_382_C}
            size="large"
          />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <FlatList
              data={revistas}
              keyExtractor={revista => revista.url}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <Text
                  style={{
                    ...styles.title,
                    marginBottom: width * 0.04,
                    top: width * 0.05,
                    paddingBottom: width * 0.03,
                    fontSize: width * 0.09,
                    left: -(width * 0.005),
                  }}>
                  Revista SoyUteísta
                </Text>
              }
              renderItem={Revista}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={loadNoticiasFromBackend}
                />
              }
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  globalMargin: {
    marginHorizontal: 20,
  },
  title: {
    fontFamily: fonts.semibold,
  },
});

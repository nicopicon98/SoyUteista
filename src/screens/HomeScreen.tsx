import React, { useContext, useEffect, useState } from 'react';
import { Alert, Appearance, FlatList, StyleSheet, Text, View, useWindowDimensions, RefreshControl } from 'react-native';

import { Noticia } from '../components/Noticia';
import { SkeletonNews } from '../components/SkeletonNews';
import { useMantenteAlDia } from '../hooks/useMantenteAlDia';
import { AuthContext } from '../context/AuthContext';
import { fonts } from '../theme/appTheme';
import AppBarComponent from '../components/AppBarComponent';


export const HomeScreen = () => {
  const { isLoading, noticias, loadNoticia } = useMantenteAlDia();
  const { authState: { user } } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const colorScheme = Appearance.getColorScheme();
  useEffect(() => {
    if (user!.userResult !== 1) {
      Alert.alert(
        "Atención",
        user!.userError,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }, [])

    //pull to refresh
    const loadNoticiasFromBackend = async () => {
      //primero, ponemos la pantalla en modo de carga
      setIsRefreshing(true);
      //cargamos la info
      await loadNoticia();
      //finalmente, ponemos la pantalla en modo false
      setIsRefreshing(false);
    }

  return (
    <>
    <AppBarComponent title='Noticias'/>
    <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {(isLoading) && <SkeletonNews />}
      {!isLoading &&
        <View style={{
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          marginHorizontal: width * 0.037
        }}>
          <FlatList
            data={noticias}
            keyExtractor={(noticia) => noticia.url}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                marginBottom: width * 0.04,
                top: width * 0.05,
                paddingBottom: width * 0.03,
                fontSize: width * 0.09,
                left: -(width * 0.005)
              }}>Últimas Noticias</Text>
            )}
            renderItem={Noticia}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadNoticiasFromBackend}
              />
            }
          />
        </View>
      }
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.semibold,
  }
});
import {
  Alert,
  Appearance,
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  RefreshControl,
  Dimensions
} from 'react-native';
import { SkeletonNews } from '@src/components/skeleton-news';
import { AppBarComponent } from '@src/components/app-bar';
import { useContext, useEffect, useState } from 'react';
import { Noticia } from '@src/components/noticia';
import { fonts } from '@src/theme';
import { AuthContext } from '@src/context/auth';
import { useNoticias } from './hooks';

const { width } = Dimensions.get("window");

export const HomeScreen = () => {
  const { isLoading, noticias, loadNoticia } = useNoticias();
  const { authState: { user } } = useContext(AuthContext);
  const { width } = useWindowDimensions();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const colorScheme = Appearance.getColorScheme();

  const alertUseError = () => {
    Alert.alert(
      "Atención",
      user!.userError,
      [
        { text: "OK", onPress: () => { } }
      ]
    );
  }

  useEffect(() => {
    if (user!.userResult !== 1) alertUseError()
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
      {/* <ModalBajoRend /> */}
      <AppBarComponent title='Noticias' />
      <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
        {(isLoading) && <SkeletonNews />}
        {!isLoading &&
          <>
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
          </>
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
  },
  imageLogo: {
    width: width * 0.8,
    height: width * 0.4,
  },
});
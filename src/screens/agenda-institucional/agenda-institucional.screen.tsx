import { Appearance, FlatList, RefreshControl, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SkeletonNews } from '@src/components/skeleton-news';
import { AppBarComponent } from '@src/components/app-bar';
import { Noticia } from '@src/components/noticia';
import { useAgendaInstitucional } from './hooks';
import { fonts } from '@src/theme/app.theme';
import { useState } from 'react';
import { useSnackbar } from '@src/context/snackbar';


export const AgendaInstitucionalScreen = () => {
  const { isLoading, agendas, loadNoticia } = useAgendaInstitucional();
  const colorScheme = Appearance.getColorScheme();
  const { width } = useWindowDimensions();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const {showMessage} = useSnackbar();

  //pull to refresh
  const loadNoticiasFromBackend = async () => {
    //primero, ponemos la pantalla en modo de carga
    setIsRefreshing(true);
    //cargamos la info
    try {
      await loadNoticia();
      setIsRefreshing(false);
    } catch (error) {
      showMessage('En este momento estamos experimentando problemas con el servidor, intentalo mas tarde', 'warning')
    }
    //finalmente, ponemos la pantalla en modo false
    
  }

  return (
    <>
    <AppBarComponent title='Agenda'/>
    <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {isLoading 
      ? <SkeletonNews />
      : <View style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          marginHorizontal: width * 0.037
        }}>
          <FlatList
            data={agendas}
            keyExtractor={(noticia) => noticia.url}
            showsVerticalScrollIndicator={false}
            //header
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                marginBottom: width * 0.04,
                top: width * 0.05,
                paddingBottom: width * 0.03,
                fontSize: width * 0.09,
              }}>Agenda institucional</Text>
            )}
            renderItem={Noticia}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadNoticiasFromBackend}
              />
            }
          />
        </View>}
    </View>
    </>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  globalMargin: {
    marginHorizontal: 20
  },
  title: {
    fontSize: 35,
    fontFamily: fonts.semibold_italic
  }
});
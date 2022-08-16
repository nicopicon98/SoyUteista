import React, { useContext, useState } from 'react';
import { Appearance, FlatList, RefreshControl, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { Noticia } from '../components/Noticia';
import { SkeletonNews } from '../components/SkeletonNews';
import { useAgendaInstitucional } from '../hooks/useAgendaInstitucional';
import { fonts } from '../theme/appTheme';



export const AgendaInstitucionalScreen = () => {
  const { isLoading, agendas, loadNoticia } = useAgendaInstitucional();
  const colorScheme = Appearance.getColorScheme();
  const { width } = useWindowDimensions();

  const [isRefreshing, setIsRefreshing] = useState(false);

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
    <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
      {isLoading && <SkeletonNews />}

      {!isLoading &&
        <View style={{
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          marginHorizontal: width * 0.06
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
            renderItem={({ item, index }) => <Noticia item={item} />}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={loadNoticiasFromBackend}
              />
            }
          />
        </View>}
    </View>
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
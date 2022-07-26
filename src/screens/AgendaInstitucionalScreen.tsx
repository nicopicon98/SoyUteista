import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { Noticia } from '../components/Noticia';
import { SkeletonNews } from '../components/SkeletonNews';
import { useAgendaInstitucional } from '../hooks/useAgendaInstitucional';



export const AgendaInstitucionalScreen = () => {
  const { isLoading, agendas } = useAgendaInstitucional();

  return (
    <View style={styles.container}>
      {isLoading && <SkeletonNews />}

      {!isLoading &&
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={agendas}
            keyExtractor={(noticia) => noticia.url}
            showsVerticalScrollIndicator={false}
            //header
            ListHeaderComponent={(
              <Text style={{
                ...styles.title,
                ...styles.globalMargin,
                marginBottom: 20,
                marginHorizontal: 20,
                top: 20,
                paddingBottom: 10,
                alignItems: 'center'
              }}>Agenda institucional</Text>
            )}
            renderItem={({ item, index }) => <Noticia item={item} />}
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
    fontWeight: 'bold'
  }
});
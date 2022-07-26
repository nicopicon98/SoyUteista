import React, { useContext, useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';

import { useMantenteAlDia } from '../hooks/useMantenteAlDia';
import { Noticia } from '../components/Noticia';
import { SkeletonNews } from '../components/SkeletonNews';
import { AuthContext } from '../context/AuthContext';



export const HomeScreen = () => {
  const { isLoading, noticias } = useMantenteAlDia();
  const { authState: { user } } = useContext(AuthContext);

  useEffect(() => {

    if (user!.userResult !== 1) {
      Alert.alert(
        "Atencion",
        user!.userError,
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }

  }, [])


  return (
    <View style={styles.container}>
      {(isLoading) && <SkeletonNews />}
      {!isLoading &&
        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={noticias}
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
              }}>Últimas Noticias</Text>
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
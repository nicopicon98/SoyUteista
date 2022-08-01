import React, { useContext, useEffect } from 'react';
import { Alert, Appearance, FlatList, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import { Noticia } from '../components/Noticia';
import { SkeletonNews } from '../components/SkeletonNews';
import { useMantenteAlDia } from '../hooks/useMantenteAlDia';
import { AuthContext } from '../context/AuthContext';
import { fonts } from '../theme/appTheme';


export const HomeScreen = () => {
  const { isLoading, noticias } = useMantenteAlDia();
  const { authState: { user } } = useContext(AuthContext);
  const { width } = useWindowDimensions();
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

  return (
    <View style={styles.container}>
      {(isLoading) && <SkeletonNews />}
      {!isLoading &&
        <View style={{
          alignItems: 'center',
          backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
          marginHorizontal: width * 0.06
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
          />
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontFamily: fonts.semibold,
  }
});
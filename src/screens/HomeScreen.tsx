import React, { useContext } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '../context/UserContext';
import { SkeletonNew } from '../components/SkeletonNew';
import { useMantenteAlDia } from '../hooks/useMantenteAlDia';
import { Noticia } from '../components/Noticia';
import { SkeletonAnimation } from '../components/SkeletonAnimation';
import { SkeletonNews } from '../components/SkeletonNews';



const HomeScreen = () => {
  const userContext = useContext(UserContext);
  const { isLoading, noticias } = useMantenteAlDia();

  return (
    <View style={styles.container}>
      {/* <ActivityIndicator
        color={colores.Pantone_382_C}
        animating={userContext.userLoading}
        size='large'
      />
      {!userContext.userLoading && <Text> Hello {userContext.userFirstName}!</Text>} */}
      {(userContext.userLoading || isLoading) && <SkeletonNews />}
      
       {!userContext.userLoading && !isLoading &&
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

export default HomeScreen;
import React from 'react';
import {Image, View} from 'react-native-animatable';
import { FlatList, Text, useWindowDimensions, StyleSheet } from 'react-native';
import {useConvocatorias} from '../hooks/useConvocatorias';

const ListConvocatorias = () => {
  const {convocatorias, isLoading} = useConvocatorias();
  const {height} = useWindowDimensions();
  return (
    <>
      <View style={{flex: 1}}>
        <FlatList
          data={convocatorias}
          renderItem={({item}) => (
            <>
              <View
                style={styles.container}>
                <Image
                  source={{uri: item.foto}}
                  style={{width: '100%', height: '100%'}}
                  resizeMode={'cover'}
                />
                <Text>{item.titulo}</Text>
                <Text>{item.descripcion}</Text>
              </View>
            </>
          )}
          keyExtractor={item => item.idConvocatoria.toString()}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 15,
    elevation: 9,
  },
});

export default ListConvocatorias;

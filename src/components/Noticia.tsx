import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { MantenteAlDiaInterface } from '../interfaces/MantenteAlDiaInterface';
import { colores, fonts } from '../theme/appTheme';

interface Props {
  item: MantenteAlDiaInterface;
}

const { width, height } = Dimensions.get('window');

export const Noticia = ({ item }: Props) => {
  return (
    <View style={styles.noticiaCard}>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
      >
        <View>
          {/* Categoria */}
          <Text style={{
            fontFamily: fonts.semibold_italic,
            fontSize: width * 0.04
          }}>{item.categoria}</Text>

          {/* Imagen */}
          <Image
            source={{
              uri: item.foto
            }}
            style={{ ...styles.noticiaImageFeature, }}
          />

          {/* Titulo */}
          <Text style={{
            fontSize: width * 0.04,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            fontFamily: fonts.regular
          }}>
            {item.titulo}
          </Text>

          {/* Descripcion */}
          <Text style={{
            marginTop: width * 0.01,
            fontFamily: fonts.regular
          }}>{item.descripcion}...</Text>

          {/* Fecha de publicacion */}
          <View style={{
            flexDirection: 'row',
            marginTop: width * 0.016,
            alignItems: 'center',
          }}>
            <Text style={{
              marginRight: width * 0.01
            }}>
              <Icon
                name={'calendar-sharp'}
                size={20}
                color={colores.Pantone_383_C}
              />
            </Text>
            <Text style={{ fontFamily: fonts.semibold_italic }}>
              {item.fecha}
            </Text>
          </View>

          {/* Autor */}
          <View style={{
            flexDirection: 'row',
            marginTop: width * 0.01,
            alignItems: 'center'
          }}>
            <Text style={{
              marginRight: width * 0.01
            }}>
              <Icon name={'person-sharp'} size={20} color={colores.Pantone_383_C} />
            </Text>
            <Text style={{ fontFamily: fonts.semibold_italic }}>
              Oficina de comunicaciones
            </Text>
          </View>

          {/* Divisor */}
          <View
            style={{
              borderBottomColor: colores.Cool_Gray_5_C,
              borderBottomWidth: width*0.005,
              opacity: 0.4,
              marginTop: width*0.02
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  noticiaImageFeature: {
    width: width * 0.90,
    height: height * 0.25,
    alignSelf: 'center',
    marginTop: width * 0.01,
    backgroundColor: 'white'
  },
  noticiaCard: {
    alignItems: 'center',
    marginBottom: width * 0.04,
  }
});

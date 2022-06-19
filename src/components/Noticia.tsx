import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { NoticiaInterface } from '../interfaces/mantenteAlDiaInterface';
import { Linking } from 'react-native';
import { colores } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  item: NoticiaInterface;
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
            fontStyle: 'italic',
            fontWeight: '600'
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
            fontSize: 17,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            {item.titulo}
          </Text>

          {/* Descripcion */}
          <Text style={{
            marginTop: 2
          }}>{item.descripcion}...</Text>

          {/* Fecha de publicacion */}
          <View style={{
            flexDirection: 'row',
            marginTop: 3,
            alignItems: 'center'
          }}>
            <Text style={{
              marginRight: 2
            }}>
              <Icon name={'calendar-sharp'} size={20} color={colores.Pantone_382_C} />
            </Text>
            <Text style={{
              fontWeight: '800',
            }}>
              {item.fecha}
            </Text>
          </View>

          {/* Autor */}
          <View style={{
            flexDirection: 'row',
            marginTop: 3,
            alignItems: 'center'
          }}>
            <Text style={{
              marginRight: 2
            }}>
              <Icon name={'person-sharp'} size={20} color={colores.Pantone_382_C} />
            </Text>
            <Text style={{
              fontWeight: '800',
            }}>
              Oficina de comunicaciones
            </Text>
          </View>

          {/* Divisor */}
          <View
            style={{
              borderBottomColor: colores.Cool_Gray_5_C,
              borderBottomWidth: 1,
              opacity: 0.4,
              marginTop: 5
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  noticiaImageFeature: {
    width: width * 0.9,
    height: height * 0.25,
    alignSelf: 'center',
    marginTop: 3,
    backgroundColor: 'white'
  },
  noticiaCard: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  }
});

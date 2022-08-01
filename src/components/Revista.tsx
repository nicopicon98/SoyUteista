import React from 'react'
import { Text, View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { colores } from '../theme/appTheme';
import { RevistaInterface } from '../interfaces/RevistaInterface';

interface Props {
  item: RevistaInterface;
}

const { width, height } = Dimensions.get('window');

export const Revista = ({ item }: Props) => {
  return (
    <View style={styles.noticiaCard}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Linking.openURL(item.url)}
      >
        <View>
          {/* Titulo */}
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            textTransform: 'capitalize'
          }}>
            Edición {item.edicion}
          </Text>

          {/* Imagen */}
          <Image
            source={{
              uri: item.foto
            }}
            style={{ ...styles.noticiaImageFeature, }}
          />


          {/* Fecha de publicacion */}
          <View style={{
            flexDirection: 'row',
            marginTop: 3,
            alignItems: 'center'
          }}>
            <Text style={{
              marginRight: 2
            }}>
              <Icon name={'calendar-sharp'} size={20} color={colores.Pantone_383_C} />
            </Text>
            <Text style={{
              fontWeight: '800',
              textTransform: 'capitalize'
            }}>
              {item.date}
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
              <Icon name={'person-sharp'} size={20} color={colores.Pantone_383_C} />
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
    height: height * 0.6,
    alignSelf: 'center',
    backgroundColor: 'white'
  },
  noticiaCard: {
    alignItems: 'center',
    marginBottom: 25,
  }
});

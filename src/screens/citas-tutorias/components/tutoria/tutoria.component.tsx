import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Appearance } from 'react-native';
import { Image } from 'react-native-elements';
import { colores } from '../../../../theme/appTheme';
import { TutoriaModal } from '../../../../components/tutoria-modal/tutoria-modal.component';
import { GraphManager } from '../../../../services';
import { TutoriaResp } from '../../../../models';
import { blobToBase64 } from '../../../../utilities';

interface Props {
  item: TutoriaResp
}

export const Tutoria = ({ item }: Props) => {
  const imageLogo: string = "https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg";
  const [tutorPhoto, setTutorPhoto] = useState(imageLogo);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    getTutorPhoto();
  }, [])

  const getTutorPhoto = async () => {
    try {
      const userImage: Blob = await GraphManager.getUserPhotoAsync(item.correo_tutor);
      const answerBase64: any = await blobToBase64(userImage);
      const photo: string[] = answerBase64.split(',');
      setTutorPhoto('data:image/png;base64,' + photo[1]);
    } catch (error) {
      console.log(error);
      setTutorPhoto(imageLogo);
    }
  }
  
  return (
    <View>
      <TutoriaModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        infoTutoria={item}
      />
      <TouchableWithoutFeedback
        onPress={() => setModalVisible(true)}>
        <View style={styles.mainCardView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.subCardView}>
              <Image
                source={{ uri: tutorPhoto }}
                resizeMode="contain"
                style={{
                  borderRadius: 100,
                  height: 55,
                  width: 55,
                }}
              />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {item.nombre_tutor}
              </Text>
              <View
                style={{ marginTop: 2, borderWidth: 0, width: '100%' }}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'capitalize'
                  }}>
                  {item.nombre_asignatura}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'capitalize'
                  }}>
                  {item.dia} - {item.franja_nombre}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'lowercase'
                  }}>
                  {item.correo_tutor}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              height: 25,
              backgroundColor: colores.Pantone_382_C,
              borderWidth: 0,
              width: 25,
              marginLeft: -26,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Text style={{ color: 'white' }}>
              {item.estado}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainCardView: {
    height: 90,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

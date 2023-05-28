import {TutoriaModal} from '@src/components/custom-modals/tutoria/tutoria-modal.component';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native-elements';
import {useEffect, useState} from 'react';
import {ITutoriaResp} from '@src/models';
import {Tutorias} from '@src/services';
import {colores} from '@src/theme';

interface IProps {
  item: ITutoriaResp;
}

export const Tutoria = ({item}: IProps) => {
  const imageTutor: {uri: string} = {
    uri: 'https://avatarairlines.com/wp-content/uploads/2020/05/Male-placeholder.jpeg',
  };
  const [tutorPhoto, setTutorPhoto] = useState(imageTutor);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getTutorPhoto();
  }, []);

  const getTutorPhoto = async () => {
    try {
      const tutorPhotoResp = await Tutorias.getUserPhoto(item.correo_tutor);
      setTutorPhoto(tutorPhotoResp);
    } catch (error) {
      setTutorPhoto(imageTutor);
    }
  };

  return (
    <View>
      <TutoriaModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        infoTutoria={item}
      />
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.mainCardView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.subCardView}>
              <Image
                source={tutorPhoto}
                resizeMode="contain"
                style={{
                  borderRadius: 100,
                  height: 55,
                  width: 55,
                }}
              />
            </View>
            <View style={{marginLeft: 12}}>
              <Text
                style={{
                  fontSize: 14,
                  color: 'black',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                }}>
                {item.nombre_tutor}
              </Text>
              <View style={{marginTop: 2, borderWidth: 0, width: '100%'}}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'capitalize',
                  }}>
                  {item.nombre_asignatura}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'capitalize',
                  }}>
                  {item.dia} - {item.franja_nombre}
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 12,
                    textTransform: 'lowercase',
                  }}>
                  {item.correo_tutor}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginLeft: -26,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            {item.remoto === '0' ? (
              <Icon
                name="human-male-board"
                size={30}
                color={colores.Pantone_382_C}
              />
            ) : (
              <Icon
                name="laptop"
                size={30}
                color={colores.Pantone_382_C}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

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
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
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

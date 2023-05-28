import {colores} from '@src/theme';
import {
  Modal,
  Text,
  StyleSheet,
  View,
  Pressable,
  Appearance,
  Dimensions,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ITutoriaResp} from '@src/models';
import Clipboard from '@react-native-clipboard/clipboard';
import {ToastAndroid} from 'react-native';

interface IProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  infoTutoria: ITutoriaResp;
}

const {width} = Dimensions.get('screen');

const LinkTutoria = ({linkRemoto}: {linkRemoto: string}) => {
  const openURL = () => {
    Linking.openURL(linkRemoto);
  };

  const copyToClipboard = () => {
    Clipboard.setString(linkRemoto);
    ToastAndroid.show('URL copiada con exito!', ToastAndroid.SHORT);
  };

  return (
    <View
      style={{
        ...styles.modalTextContainerValue,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 0,
      }}>
      <TouchableOpacity onPress={openURL}>
        <Text
          style={{
            color: colores.Pantone_382_C,
            fontWeight: 'bold',
            fontSize: width * 0.035,
          }}>
          https://teams.microsoft.com/...
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={copyToClipboard}>
        <Icon name="copy-outline" size={25} color={colores.Pantone_382_C} />
      </TouchableOpacity>
    </View>
  );
};

export const TutoriaModal = ({
  modalVisible,
  setModalVisible,
  infoTutoria,
}: IProps) => {
  return (
    <Modal
      animationType="fade"
      hardwareAccelerated={true}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Close modal */}
          <Pressable
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={styles.buttonClose}>
            <Icon name="close-circle" size={25} color={colores.Cool_Gray_5_C} />
          </Pressable>
          <View
            style={{
              paddingHorizontal: width * 0.03,
            }}>
            {/* Nombre tutor */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>
                Nombre tutor:{' '}
              </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.nombre_tutor}
              </Text>
            </View>
            {/* Asignatura */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>
                Asignatura:{' '}
              </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.nombre_asignatura}
              </Text>
            </View>
            {/* Tema */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>Tema: </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.tema}
              </Text>
            </View>
            {/* Modalidad */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>
                Modalidad:{' '}
              </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.remoto === '0' ? 'PRESENCIAL' : 'REMOTO'}
              </Text>
            </View>
            {/* Lugar o Link */}
            <View style={{...styles.modalTextContainer, alignItems: 'center'}}>
              <Text style={{...styles.modalTextContainerLabel}}>
                {infoTutoria.remoto === '0' ? 'Lugar:' : 'Link:'}
              </Text>
              {infoTutoria.remoto === '0' ? (
                <Text style={{...styles.modalTextContainerValue}}>
                  {infoTutoria.lugar}
                </Text>
              ) : (
                <LinkTutoria linkRemoto={infoTutoria.remoto} />
              )}
            </View>
            {/* Dia */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>Dia: </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.dia}
              </Text>
            </View>
            {/* Franja Horaria */}
            <View style={{...styles.modalTextContainer}}>
              <Text style={{...styles.modalTextContainerLabel}}>Hora: </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.franja_nombre}
              </Text>
            </View>
            {/* Fecha Solicitud */}
            <View style={{...styles.modalTextContainer, alignItems: 'center'}}>
              <Text style={{...styles.modalTextContainerLabel}}>
                Fecha de solicitud:{' '}
              </Text>
              <Text style={{...styles.modalTextContainerValue}}>
                {infoTutoria.fecha_solicitud}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: width * 0.9,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTextContainer: {
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
  },
  modalTextContainerLabel: {
    fontWeight: 'bold',
    color: 'black',
    flexBasis: '40%',
  },
  modalTextContainerValue: {
    flexBasis: '60%',
    textTransform: 'capitalize',
    color: 'black',
  },
});

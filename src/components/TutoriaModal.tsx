import React, { useState } from 'react'
import { Alert, Modal, Text, StyleSheet, View, Pressable, Appearance } from 'react-native';
import { } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Ionicons';
import { TutoriasAllInterface } from '../interfaces/TutoriasAllInterface';
import { colores } from '../theme/appTheme';

interface Props {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  infoTutoria: TutoriasAllInterface;
}

const colorScheme = Appearance.getColorScheme();

export const TutoriaModal = ({ modalVisible, setModalVisible, infoTutoria }: Props) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        hardwareAccelerated={true}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Close modal */}
            <Pressable
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
              style={styles.buttonClose}
            >
              <Icon
                name="close-circle"
                size={25}
                color={colores.Cool_Gray_5_C}
                />
            </Pressable>
            {/* Nombre tutor */}
            <View style={{ ...styles.modalText, marginTop: 10, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Nombre tutor: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.nombre_tutor}</Text>
            </View>
            {/* Asignatura */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Asignatura: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.nombre_asignatura}</Text>
            </View>
            {/* Tema */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Tema: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.tema}</Text>
            </View>
            {/* Lugar */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Lugar: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.lugar}</Text>
            </View>
            {/* Dia */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Dia: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.dia}</Text>
            </View>
            {/* Franja Horaria */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Hora: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.franja_nombre}</Text>
            </View>
            {/* Fecha Solicitud */}
            <View style={{ ...styles.modalText, flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', color: 'black' }}>Fecha de la solicitud: </Text>
              <Text style={{ textTransform: 'capitalize', color: 'black' }}>{infoTutoria.fecha_solicitud}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 0,
  }
});
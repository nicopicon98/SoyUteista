import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

export const HomeScreen = () => {
  const [showModal, setShowModal] = useState(false);
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          {/*All views of Modal*/}
          {/*Animation can be slide, slide, none*/}
          <View style={styles.modal}>
            <Text style={styles.text}>Modal is open!</Text>
            <Button
              title="Click To Close Modal"
              onPress={() => {
                setShowModal(!showModal);
              }}
            />
          </View>
        </Modal>
        {/*Updating the state to make Modal Visible*/}
        <Button
          title="Click To Open Modal"
          onPress={() => {
            setShowModal(!showModal);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  modal: {
    flex: 1,
    backgroundColor: 'black',
    padding: 100,
  },
  text: {
    color: 'white',
  },
});
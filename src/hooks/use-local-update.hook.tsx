import React, {useEffect, useState} from 'react';
import {Button, Text, View} from 'react-native';
import SpInAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';

const inAppUpdates = new SpInAppUpdates(
  false, // isDebug
);

const useLocalUpdate = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cancel, setCancel] = useState(0);

  const checkForUpdate = async () => {
    const updateAvailability = await inAppUpdates.checkNeedsUpdate();
    if ('totalBytes' in updateAvailability.other) {
      if (updateAvailability.other.totalBytes > 0) {
        setShowUpdateModal(true);
      }
    }
  };

  const handleUpdate = async () => {
    await inAppUpdates.startUpdate({
      updateType: IAUUpdateKind.IMMEDIATE,
    });

    inAppUpdates.addIntentSelectionListener(async updateState => {
      if (updateState == 6) {
        setCancel(cancel + 1);
        setCompleted(true);
      }
    });
    setShowUpdateModal(false);
  };

  const renderUpdateModal = () => {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: 'black',
            opacity: 0.45,
            width: '100%',
            height: '100%',
          }}
        />
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            padding: 20,
            borderRadius: 10,
          }}>
          <View>
            <Text>¡Hay una nueva actualización disponible!</Text>
            <Button title="Actualizar" onPress={handleUpdate} />
          </View>
        </View>
      </View>
    );
  };

  useEffect(() => {
    const checkForUpdateLoop = async () => {
      await checkForUpdate();
      if (showUpdateModal || completed) {
        checkForUpdateLoop();
      }
    };
    checkForUpdateLoop();
  }, [cancel]);
  return {
    showUpdateModal,
    renderUpdateModal,
  };
};

export default useLocalUpdate;

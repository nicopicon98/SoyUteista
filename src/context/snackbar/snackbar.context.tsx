import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Portal } from 'react-native-paper';
import { Dimensions, Text, View } from 'react-native';
import { colores } from '@src/theme';

type TSnackbar = 'success' | 'warning' | 'danger' | 'info';

interface SnackbarProps {
  isVisible: boolean;
  showMessage: (msg: string, type: TSnackbar, duration?: number) => void;
  hideMessage: () => void;
}
const { height } = Dimensions.get("screen");
// Create a context for the Snackbar provider
const SnackbarContext = createContext({} as SnackbarProps);

// Create a custom hook for consuming the Snackbar context
export const useSnackbar = () => useContext(SnackbarContext);

// Create the Snackbar provider component
export const SnackbarProvider = ({ children }) => {
  const [type, setType] = useState('info')
  const [message, setMessage] = useState('');
  const [duration, setDuration] = useState(3000);
  const [isVisible, setIsVisible] = useState(false);

  // Function to show the Snackbar with a message
  const showMessage = (msg: string, type: string, durationArg: number = 3000) => {
    setType(type);
    setMessage(msg);
    setDuration(durationArg)
    setIsVisible(true);
  }

  // Function to hide the Snackbar
  const hideMessage = () => {
    setIsVisible(false);
  }

  return (
    <SnackbarContext.Provider value={{
      isVisible,
      showMessage,
      hideMessage
    }}>
      {children}
      <Portal>
        <Snackbar
          visible={isVisible}
          onDismiss={hideMessage}
          duration={duration}
          action={{
            label: '',
            onPress: hideMessage,
            textColor: colores.White,
          }}
          elevation={5}
          wrapperStyle={{
            top: 0, // Set the bottom value to the height of your Modal
          }}
          style={{
            marginBottom: height * 0.1,
            backgroundColor: type === 'success'
              ? colores.Pantone_383_C
              : type === 'warning'
                ? colores.warning
                : type === 'info'
                  ? colores.info
                  : type === 'danger'
                    ? colores.danger
                    : colores.Pantone_383_C,
          }}
        >
          {type === 'success' && <View style={{ display: 'flex', flexDirection: 'row', }}>
            <Icon name="check-circle-outline" size={20} color={colores.White} />
            <Text style={{ color: 'white', marginLeft: 5 }}>{message}</Text>
          </View>}

          {/* Warning */}
          {type === 'warning' && <View style={{ display: 'flex', flexDirection: 'row', }}>
            <Icon name="alert-outline" size={20} color={colores.White} />
            <Text style={{ color: 'white', marginLeft: 5 }}>{message}{duration}</Text>
          </View>}

          {type === 'info' && <View style={{ display: 'flex', flexDirection: 'row', }}>
            <Icon name="information-outline" size={20} color={colores.White} />
            <Text style={{ color: 'white', marginLeft: 5 }}>{message}</Text>
          </View>}

          {/* Danger */}
          {type === 'danger' && <View style={{ display: 'flex', flexDirection: 'row', }}>
            <Icon name="close-octagon" size={20} color={colores.White} />
            <Text style={{ color: 'white', marginLeft: 5 }}>{message}</Text>
          </View>}
        </Snackbar>
      </Portal>
    </SnackbarContext.Provider>
  );
}

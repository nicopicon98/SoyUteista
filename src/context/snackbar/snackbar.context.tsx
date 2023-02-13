import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Portal } from 'react-native-paper';
import { Text } from 'react-native';

interface SnackbarProps {
  isVisible: boolean;
  showMessage: (msg: string) => void;
  hideMessage: () => void;
}

// Create a context for the Snackbar provider
const SnackbarContext = createContext({} as SnackbarProps);

// Create a custom hook for consuming the Snackbar context
export const useSnackbar = () => useContext(SnackbarContext);

// Create the Snackbar provider component
export const SnackbarProvider = ({ children }) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  // Function to show the Snackbar with a message
  const showMessage = (msg: string) => {
    setMessage(msg);
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
      <Snackbar
        visible={isVisible}
        onDismiss={hideMessage}
        duration={7000}
        action={{
          label: 'OK',
          onPress: hideMessage
        }}
        wrapperStyle={{top: 0}}
      >
        <Text style={{ backgroundColor: 'red' }}>xs</Text>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
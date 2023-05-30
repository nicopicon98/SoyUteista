import {View, StyleSheet, Dimensions, ImageSourcePropType} from 'react-native';
import {Dialog, Portal, Text} from 'react-native-paper';
import {Image} from 'react-native-elements';

const {width: phoneWidth} = Dimensions.get('window');

interface IProps {
  buttonsAction?: JSX.Element[] | JSX.Element;
  topImg?: ImageSourcePropType;
  hideDialog: () => void;
  dialogContent?: string;
  dialogIsOpen: boolean;
  dialogTitle: string;
  width?: number;
  height?: number;
}

export const SimpleDialog = ({
  topImg = require('@src/resources/Images/bajo-ren.jpg'),
  dialogTitle,
  dialogContent,
  dialogIsOpen,
  hideDialog,
  buttonsAction,
  width = phoneWidth * 0.8,
  height = phoneWidth * 0.4,
}: IProps) => {
  return (
    <Portal>
      <Dialog
        visible={dialogIsOpen}
        onDismiss={hideDialog}
        dismissable={true}
        style={{backgroundColor: 'white', alignItems: 'flex-end'}}>
        <View style={{alignSelf: 'center'}}>
          <Image source={topImg} resizeMode="contain" style={{width, height}} />
        </View>
        <View style={{alignSelf: 'flex-start'}}>
          <Dialog.Title style={{color: 'black'}}>{dialogTitle}</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={{color: 'black'}}>{dialogContent}</Text>
          </Dialog.Content>
        </View>
        <Dialog.Actions>{buttonsAction}</Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  imageLogo: {
    width: phoneWidth * 0.8,
    height: phoneWidth * 0.4,
  },
});

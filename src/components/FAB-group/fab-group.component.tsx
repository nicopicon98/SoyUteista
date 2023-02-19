import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { colores } from '@src/theme';
import { IFabScreens } from '@src/models';
import { Dimensions } from 'react-native';

interface IProps {
  screens: IFabScreens[]
}
const { width } = Dimensions.get("screen");
export const FABGroup = ({ screens }: IProps) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        color='white'
        icon={open ? 'close' : 'plus'}
        actions={screens}
        onStateChange={onStateChange}
        onPress={() => {
          if (!open) {
            //
          }
        }}
        variant="surface"
        fabStyle={{
          borderRadius: 1000,
          backgroundColor: colores.Pantone_383_C,
        }}
      />
    </Portal>
  );
};
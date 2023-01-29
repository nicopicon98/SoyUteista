import * as React from 'react';
import { FAB, Portal } from 'react-native-paper';
import { colores } from '@src/theme';
import { FabScreens } from '@src/models/fab-screens.model';

interface Props {
  screens: FabScreens[]
}

export const FABGroup = ({ screens }: Props) => {
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
            console.log("opened")
          }
        }}
        fabStyle={{
          borderRadius: 1000,
          backgroundColor:
            colores.Pantone_383_C,
        }}
      />
    </Portal>
  );
};
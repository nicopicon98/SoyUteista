import {Dimensions, StyleSheet} from 'react-native';
import {SegmentedButtons} from 'react-native-paper';
import {arrToChunkArrOfArrs} from '@src/utilities';
import {Dispatch, SetStateAction} from 'react';
import {ISegmentedService} from '@src/models';

interface IProps {
  buttons: ISegmentedService[];
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
  maxWidthValue: number;
}

const {width} = Dimensions.get('window');
export const SegmentedButtonsCustom = ({
  buttons,
  value,
  onValueChange,
  maxWidthValue,
}: IProps) => {
  const services = arrToChunkArrOfArrs(buttons, 3);
  const buttonsSegments = services.map((buttons, _) => {
    return (
      <SegmentedButtons
        value={value}
        key={_}
        onValueChange={onValueChange}
        buttons={buttons}
        style={{...style.segmentedButtons, maxWidth: width * maxWidthValue}}
      />
    );
  });

  return <>{buttonsSegments}</>;
};

const style = StyleSheet.create({
  segmentedButtons: {
    justifyContent: 'center',
    marginBottom: width * 0.02,
  },
});

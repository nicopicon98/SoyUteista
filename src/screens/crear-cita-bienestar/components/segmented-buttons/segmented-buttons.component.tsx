import { Dimensions, StyleSheet } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { arrToChunkArrOfArrs } from "@src/utilities";
import { IBienestarService } from '../../models';
import { Dispatch, SetStateAction } from "react";

interface IProps {
  buttons: IBienestarService[];
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
}

const { width } = Dimensions.get("window")
export const SegmentedButtonsCustom = ({ buttons, value, onValueChange }: IProps) => {

  const services = arrToChunkArrOfArrs(buttons, 3);
  const buttonsSegments = services.map((buttons, _) => {
    return <SegmentedButtons
      value={value}
      key={_}
      onValueChange={onValueChange}
      buttons={buttons}
      style={style.segmentedButtons}
    />
  })

  return <>{buttonsSegments}</>
}

const style = StyleSheet.create({
  segmentedButtons: {
    maxWidth: width * 0.3,
    justifyContent: 'center',
    marginBottom: width * 0.02
  }
})
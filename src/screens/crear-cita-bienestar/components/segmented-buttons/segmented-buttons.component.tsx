import { Dimensions, StyleSheet } from "react-native";
import { Service } from '../../models/services.model';
import { arrToChunkArrOfArrs } from "@src/utilities";
import { SegmentedButtons } from "react-native-paper";
import { Dispatch, SetStateAction } from "react";

interface Props {
  buttons: Service[];
  value: string;
  onValueChange: Dispatch<SetStateAction<string>>;
}

const { width } = Dimensions.get("window")
export const SegmentedButtonsResponsive = ({ buttons, value, onValueChange }: Props) => {

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
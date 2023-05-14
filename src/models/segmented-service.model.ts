import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface ISegmentedService {
  value: string;
  icon?: IconSource;
  disabled?: boolean;
  accessibilityLabel?: string;
  onPress?: (event: GestureResponderEvent) => void;
  label?: string;
  showSelectedCheck?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface IFabScreens {
  icon: IconSource;
  label?: string;
  color?: string;
  labelTextColor?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  size?: 'small' | 'medium';
  testID?: string;
} 
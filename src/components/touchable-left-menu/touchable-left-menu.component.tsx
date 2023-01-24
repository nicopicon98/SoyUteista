import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '@src/context';
import { useContext } from 'react'

type TouchableLeftMenuType = "signOut" | "navigate";

interface TouchableLeftMenuProps {
  type: TouchableLeftMenuType,
  iconColor: string;
  iconSize: number;
  iconName: string;
  menuText: string;
  screenDestiny?: string;
  navigation?: DrawerNavigationHelpers;
  textStyles?: any;
  buttonStyles?: any;
}

const { width } = Dimensions.get('window');

export const TouchableLeftMenu = ({
  type,
  iconColor,
  iconSize,
  iconName,
  menuText,
  screenDestiny = "",
  navigation,
  textStyles = styles.menuText,
  buttonStyles = styles.menuBtn }: TouchableLeftMenuProps) => {
  const { signOut } = useContext(AuthContext);
  return (
    <TouchableOpacity
      onPress={
        type === "navigate"
          ? () => navigation!.navigate(screenDestiny)
          : () => signOut()
      }
      style={buttonStyles}
    >
      <Text><Icon name={iconName} size={iconSize} color={iconColor} /></Text>
      <Text style={textStyles}> {menuText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  menuBtn: {
    marginVertical: width*0.02,
    flexDirection: 'row'
  },
  menuText: {
    fontSize: 20,
    marginTop: 2,
    marginLeft: 8,
  }
});

// async () => await signOut()
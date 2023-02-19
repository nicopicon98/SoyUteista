import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Text, StyleSheet, Dimensions, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '@src/context/auth';
import { useContext } from 'react'
import { Divider } from 'react-native-paper';

type TTouchableLeftMenu = "signOut" | "navigate";

interface IProps {
  type: TTouchableLeftMenu,
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
  textStyles = styles.menuText, }: IProps) => {
  const { signOut } = useContext(AuthContext);
  return (
    <>
      <TouchableOpacity
        onPress={
          type === "navigate"
            ? () => navigation!.navigate(screenDestiny)
            : () => signOut()
        }
      >
        <View style={{...styles.btnContainer}}>
          <Text><Icon name={iconName} size={width * 0.06} color={iconColor} /></Text>
          <Text style={textStyles}> {menuText}</Text>
        </View>
      </TouchableOpacity>
      <Divider />
    </>
  )
}

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: width * 0.02,
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuText: {
    fontSize: width * 0.05,
  }
});
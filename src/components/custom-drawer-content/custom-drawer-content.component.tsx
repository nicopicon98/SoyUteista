import {DrawerContentScrollView} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {TouchableLeftMenu} from '../touchable-left-menu';
import {CustomDrawerContentProps} from '@src/models';
import {colores, GlobalStyles} from '@src/theme';
import {AuthContext} from '@src/context/auth';
import {Image} from 'react-native-elements';
import {useContext} from 'react';

const {width, height} = Dimensions.get('screen');

export const CustomDrawerContent = (props: CustomDrawerContentProps) => {
  const {
    authState: {user},
  } = useContext(AuthContext);
  const customHeight = user!.userResult !== 1 ? height * 0.62 : height

  return (
    <DrawerContentScrollView
      {...props}
      style={{
        ...styles.menuGlobalContainer,
        backgroundColor: props.darkMode === 'dark' ? 'black' : 'white',
      }}>
      {/* Profile: Image, Name, E-mail */}
      <View style={GlobalStyles.profileView}>
        {/* Profile Image */}
        <Image
          source={user!.userPhoto}
          resizeMode="contain"
          style={GlobalStyles.profilePhoto}
        />
        {/* Profile User Name */}
        <Text
          style={{
            ...GlobalStyles.profileUserName,
            marginTop: 10,
          }}>
          {user!.userFullName}
        </Text>
        {/* Profile Email */}
        <Text style={GlobalStyles.profileEmail}>{user!.userEmail}</Text>
      </View>

      {/* Menu */}
      <View
        style={{
          ...styles.menuContainer,
          height: height * 0.75,
        }}>
        {/* Inicio */}
        <TouchableLeftMenu
          type="navigate"
          iconColor={colores.Cool_Gray_5_C}
          iconSize={30}
          iconName="home-sharp"
          menuText="Noticias"
          screenDestiny="Inicio"
          navigation={props.navigation}
        />

        {/* Perfil */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="person-sharp"
            menuText="Perfil"
            screenDestiny="Perfil"
            navigation={props.navigation}
          />
        )}

        {/* Carnet */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="albums"
            menuText="Carnet"
            screenDestiny="Carnet"
            navigation={props.navigation}
          />
        )}

        {/* Horario */}
        {user!.userResult === 1 &&
          user!.userMoreInfo.C_FRAN_DESCRIPCION.toLowerCase() !== 'virtual' && (
            <TouchableLeftMenu
              type="navigate"
              iconColor={colores.Cool_Gray_5_C}
              iconSize={30}
              iconName="calendar-sharp"
              menuText="Horario"
              screenDestiny="Horario"
              navigation={props.navigation}
            />
          )}

        {/* Notas actuales */}
        {user!.userResult === 1 &&
          user!.userMoreInfo.C_FRAN_DESCRIPCION.toLowerCase() !== 'virtual' && (
            <TouchableLeftMenu
              type="navigate"
              iconColor={colores.Cool_Gray_5_C}
              iconSize={30}
              iconName="newspaper-outline"
              menuText="Notas actuales"
              screenDestiny="Notas"
              navigation={props.navigation}
            />
          )}

        {/* Exito Escolar  */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="golf"
            menuText="Tutorías"
            screenDestiny="Tutorias"
            navigation={props.navigation}
          />
        )}

        {/* Exito Escolar  */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="happy"
            menuText="Exito Escolar"
            screenDestiny="ExitoEscolar"
            navigation={props.navigation}
          />
        )}

        {/* Directorio Institucional  */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="at-circle"
            menuText="Directorio Institucional"
            screenDestiny="DirectorioInstitucional"
            navigation={props.navigation}
          />
        )}
        {/* Convocatorias */}
        {user!.userResult === 1 && (
          <TouchableLeftMenu
            type="navigate"
            iconColor={colores.Cool_Gray_5_C}
            iconSize={30}
            iconName="ribbon"
            menuText="Convocatorias"
            screenDestiny="Convocatorias"
            navigation={props.navigation}
          />
        )}

        {/* Agenda */}
        <TouchableLeftMenu
          type="navigate"
          iconColor={colores.Cool_Gray_5_C}
          iconSize={30}
          iconName="bookmark-sharp"
          menuText="Agenda UTS"
          screenDestiny="Agenda"
          navigation={props.navigation}
        />

        {/* Revista */}
        <TouchableLeftMenu
          type="navigate"
          iconColor={colores.Cool_Gray_5_C}
          iconSize={30}
          iconName="book-sharp"
          menuText="Revista"
          screenDestiny="Revista"
          navigation={props.navigation}
        />

        {/* Cerrar sesion */}
        <TouchableLeftMenu
          type="signOut"
          iconColor={colores.Cool_Gray_5_C}
          iconSize={30}
          iconName="log-out-sharp"
          menuText="Cerrar sesión"
        />

        {/* Logo */}
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('@resources/Images/Logo-UTS-1.png')}
            resizeMode="contain"
            style={{
              width: width * 0.38,
              height: width * 0.38,
            }}
          />
        </View>
      </View>
      {/* Franja */}
      <View
        style={{
          backgroundColor: colores.Pantone_382_C,
          width: '100%',
          borderWidth: customHeight * 0.00001,
          height: customHeight * 0.1,
        }}
      />

      {/*End Menu */}
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  menuGlobalContainer: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    marginTop: width * 0.04,
    marginHorizontal: width * 0.06,
  },
  menuBtn: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  menuText: {
    fontSize: 20,
    marginTop: 2,
    marginLeft: 8,
    textTransform: 'capitalize',
  },
  backgroundMenuBTN: {
    position: 'relative',
    top: 5,
    backgroundColor: colores.Pantone_382_C,
    color: 'white',
    marginVertical: 8,
    align: 'flex-end',
    padding: 12,
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 9,
  },
  menuSignOutText: {
    fontSize: 20,
    marginTop: 2,
    marginLeft: 8,
    textTransform: 'capitalize',
    color: 'white',
  },
});

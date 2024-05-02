import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {AppBarComponent} from '@src/components/app-bar';
import {AuthContext} from '@src/context/auth';
import {Text} from 'react-native-animatable';
import {Image} from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import {colores, fonts} from '@src/theme';
import {useContext, useState} from 'react';
import {ICarnet} from '@src/models';
import {carnetInitializer} from './utils';
import {useMultipleCareers} from './hooks';
import {PickCareerDropdown, ImageBackgroundCarnet} from './components';
import {userMoreInfoToItemsAdapter} from './adapters';

const {width} = Dimensions.get('window');

export const CarnetScreen = () => {
  const {
    authState: {user},
  } = useContext(AuthContext);
  const {twoCareers} = useMultipleCareers(user!); // Check if user has two careers

  const [userInfo, setUserInfo] = useState<ICarnet>(
    user?.userMoreInfo2[0] || carnetInitializer,
  );
  const [carrer, setCarrer] = useState(
    user?.userMoreInfo2[0]?.C_PROG_NOMBRE || '',
  );
  const [openCarreerDropdown, setOpenCarreerDropdown] = useState(false);

  const items = userMoreInfoToItemsAdapter(user!);

  const handleSelectItem = (value: string) => {
    const selectedInfo = user?.userMoreInfo2.find(
      info => info.C_PROG_NOMBRE === value,
    );
    if (selectedInfo) {
      setUserInfo(selectedInfo);
      setCarrer(selectedInfo.C_PROG_NOMBRE);
    }
  };

  const pickCarrerDropdown = (
    <PickCareerDropdown
      items={items || []}
      carrer={carrer}
      setCarrer={setCarrer}
      openCarreerDropdown={openCarreerDropdown}
      setOpenCarreerDropdown={setOpenCarreerDropdown}
      handleSelectItem={handleSelectItem}
    />
  );

  const imageLogo: string = '@resources/Images/Logo.png';
  const imageEscudo: string = '@resources/Images/carnetEscudo.png';

  const fullName: string = `${userInfo.C_PENG_PRIMERNOMBRE} ${
    userInfo.C_PENG_SEGUNDONOMBRE || ''
  } ${userInfo.C_PENG_PRIMERAPELLIDO} ${userInfo.C_PENG_SEGUNDOAPELLIDO}`;
  const urlQR: string = `https://soyuteista.uts.edu.co/carnet/getData.php?email=${userInfo.C_PENG_EMAILINSTITUCIONAL}&prog_name=${userInfo.C_PROG_NOMBRE}`;
  console.log(userInfo.C_PROG_NOMBRE);
  console.log(urlQR);
  return (
    <>
      <AppBarComponent title="Carnet" />
      {twoCareers ? pickCarrerDropdown : null}
      <View style={styles.container}>
        <ImageBackgroundCarnet>
          <ScrollView>
            <View
              style={{
                padding: width * 0.06,
                paddingTop: 0,
                paddingBottom: width * 0.03,
              }}>
              {/* Cabecera */}
              <View style={styles.cabecera}>
                <Text style={styles.text}>Carnet estudiantil digital</Text>
              </View>
              {/* Logo and Escudo */}
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginTop: width * 0.03,
                  alignItems: 'center',
                }}>
                <Image
                  source={require(imageLogo)}
                  resizeMode="contain"
                  style={styles.imageLogo}
                />
                <Image
                  source={require(imageEscudo)}
                  resizeMode="contain"
                  style={styles.imageEscudo}
                />
              </View>
              {/* Nombre */}
              <Text style={{...styles.fullName}}>{fullName}</Text>
              {/* Identificacion */}
              <Text style={styles.id}>
                C.C {userInfo.C_PEGE_DOCUMENTOIDENTIDAD}
              </Text>
              {/* Programa Academico */}
              <Text style={styles.programa}>{userInfo.C_PROG_NOMBRE}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider}>
              <Text style={styles.dividerText}>{userInfo.C_UNID_NOMBRE}</Text>
            </View>

            {/* QR - Descripcion - valido hasta */}
            <View style={{padding: width * 0.03, paddingTop: 0}}>
              <View style={{flexDirection: 'row', marginTop: width * 0.06}}>
                {/* QR */}
                <View
                  style={{paddingLeft: width * 0.04, marginTop: width * 0.01}}>
                  <QRCode value={urlQR} size={width * 0.39} />
                </View>
                {/* Descripcion - valido hasta */}
                <View style={styles.desValContainer}>
                  {/* Descripcion */}
                  <Text style={styles.descripcion}>
                    Este carnet acredita al portador como estudiante de las UTS,
                    su uso es personal e intransferible. Escanee el siguiente
                    código QR para verificar la validez de este documento.
                    {'\n'}
                    {'\n'}
                    Válido hasta:{' '}
                    {typeof userInfo.C_PEUN_FECHAFIN === 'string'
                      ? userInfo.C_PEUN_FECHAFIN.slice(0, 10)
                      : ''}
                  </Text>
                </View>
              </View>
            </View>

            {/* UTS url */}
            <Text style={styles.UTSurl}>www.uts.edu.co</Text>
          </ScrollView>
        </ImageBackgroundCarnet>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    paddingTop: 0,
  },
  text: {
    color: 'white',
    fontSize: width * 0.054,
    fontFamily: fonts.semibold,
  },
  cabecera: {
    alignContent: 'center',
    backgroundColor: colores.Pantone_383_C,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: width * 0.1,
    borderBottomRightRadius: width * 0.1,
    width: width * 0.75,
    alignSelf: 'center',
    padding: width * 0.025,
  },
  imageLogo: {
    width: width * 0.5,
    height: width * 0.29,
  },
  imageEscudo: {
    width: width * 0.4,
    height: width * 0.4,
  },
  fullName: {
    marginTop: width * 0.02,
    fontSize: width * 0.1,
    color: colores.Pantone_383_C,
    fontFamily: fonts.semibold,
  },
  id: {
    fontSize: width * 0.07,
    marginTop: width * 0.01,
    fontFamily: fonts.semibold,
    color: colores.Brown,
  },
  programa: {
    fontSize: width * 0.043,
    marginTop: width * 0.01,
    fontFamily: fonts.semibold,
    color: colores.Brown,
  },
  divider: {
    backgroundColor: colores.Brown,
    padding: width * 0.014,
    alignItems: 'center',
  },
  dividerText: {
    color: colores.Pantone_383_C,
    fontSize: width * 0.05,
    fontFamily: fonts.semibold,
  },
  UTSurl: {
    fontSize: width * 0.09,
    color: colores.Brown,
    fontFamily: fonts.semibold,
    alignSelf: 'center',
    marginTop: width * 0.019,
  },
  descripcion: {
    fontSize: width * 0.0389,
    fontFamily: fonts.semibold,
    color: colores.Brown,
    textAlign: 'justify',
  },
  desValContainer: {
    marginLeft: width * 0.03,
    marginRight: width * 0.03,
    flexGrow: 1,
    flex: 1,
  },
});

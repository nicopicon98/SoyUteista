import { View, Text, StyleSheet, Appearance, Dimensions, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDirectorioEscolar } from '../../hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Capitalize, removeSpaces } from '@src/utilities';

import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { colores } from '@src/theme';

const { width } = Dimensions.get("screen");
export const CardsDirectorioEscolar = () => {
  const { directories, isLoading } = useDirectorioEscolar();
  const colorScheme = Appearance.getColorScheme();

  // console.log(JSON.stringify(directories, null, 2));

  return (
    <View style={{
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
      padding: width * 0.03,
    }}>
      {isLoading
        ? <ActivityIndicator style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
        : <ScrollView>
          {directories?.map((directory, index1) => {
            return (
              <List.AccordionGroup>
                <List.Accordion
                  theme={{
                    colors: {
                      primary: colorScheme === 'dark' ? 'white' : colores.Pantone_382_C,
                      background: colorScheme === 'dark' ? 'black' : 'white',
                    }
                  }}
                  left={props => <List.Icon {...props} icon="folder" color={colorScheme === 'dark' ? 'white' : colores.Pantone_382_C } />}
                  title={directory.dependencia}
                  id="0">
                  {
                    directory.infoDependencia.map((e, index) => {
                      return (
                        <>
                          <List.Item
                            title={
                              <View>
                                <InfoDependencia label="Nombre" value={removeSpaces(e.nombre)} />
                                <InfoDependencia
                                  label="Cargo"
                                  value={removeSpaces(e.profesion)}
                                  icon="briefcase"
                                />
                                <InfoDependencia
                                  label="Correo"
                                  value={removeSpaces(e.correo)}
                                  icon="email"
                                />
                                <InfoDependencia
                                  label="Extension"
                                  value={`${e.extension}`}
                                  icon="cellphone"
                                />
                              </View>
                            }
                          />
                          <Divider />
                        </>
                      )
                    })
                  }
                </List.Accordion>
              </List.AccordionGroup>
            )
          })}
        </ScrollView>
      }
    </View>
  )
}

interface IInfoDependenciaProps {
  label: string;
  value: string;
  icon?: string;
}

const InfoDependencia = ({ label, value, icon = "account" }: IInfoDependenciaProps) => {

  const colorScheme = Appearance.getColorScheme();

  return (
    <View style={{ flexDirection: 'row' }}>
      <Icon
        color={colorScheme === 'dark' ? colores.White  : colores.Pantone_382_C }
        size={width * 0.05}
        name={icon}
      />
      <Text>
        <Text style={{ fontWeight: 'bold', color: colorScheme === 'dark' ? colores.Cool_Gray_5_C : colores.Pantone_382_C  }}>{label}: </Text>
        {Capitalize(value)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    borderRadius: 15,
    elevation: 9,
  },
  overflow: {
    overflow: 'hidden',
    backgroundColor: '#efefef',
  },
  button: {
    textAlign: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold'
  },
});
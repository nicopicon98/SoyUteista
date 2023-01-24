import { useDirectorioEscolar } from '../../../../hooks/use-directorio-escolar';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';

export const CardsDirectorioEscolar = () => {
  const { state } = useDirectorioEscolar();
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {state?.map((elemento, index) => {
          return (
            <>
              <View key={index} style={styles.container}>
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                  <Text style={{ fontSize: 24 }}>
                    Dependencia: {elemento.dependencia}
                  </Text>
                  {elemento.infoDependencia.map((elementoD, indexD) => {
                    return (
                      <>
                        <View
                          style={{
                            marginTop: 10,
                            backgroundColor: '#f2f2f2',
                            borderRadius: 10,
                          }}
                          key={indexD}>
                          <View style={{ marginHorizontal: 10, marginVertical: 8 }}>
                            <Text>Nombre: {elementoD.nombre}</Text>
                            <Text>Cargo: {elementoD.profesion}</Text>
                            <Text>Correo: {elementoD.correo}</Text>
                            <Text>Extension: {elementoD.extension}</Text>
                          </View>
                        </View>
                      </>
                    );
                  })}
                </View>
              </View>
            </>
          );
        })}
      </ScrollView>
    </View>
  );
};

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
});
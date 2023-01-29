import { SegmentedButtonsResponsive } from "./components/segmented-buttons";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardBienestar } from "@src/components/card-bienestar"
import { useGetProByField } from "./hooks";
import { StyleSheet, Text } from 'react-native';
import { servicesFn } from "./data";
import { useState } from 'react';
import { ActivityIndicator } from "react-native-paper";

export const CrearCitaBienestarScreen = () => {
  const [value, setValue] = useState<string>('odontologia');
  const {
    fetchProfessionalsByField,
    professionals,
    isLoadingProfessionals
  } = useGetProByField();

  const pressFieldHandler = async function () {
    const _field = this.value;
    console.log(_field)
    await fetchProfessionalsByField(_field);
  }

  const servicesButtons = servicesFn(pressFieldHandler);
  const professionalsView = !isLoadingProfessionals && professionals?.map(e => {
    return <Text style={{fontWeight: 'bold'}}>{}</Text>
  })

  console.log(professionals, 'root')

  return (
    <CardBienestar>
      <SafeAreaView style={styles.container}>
        <SegmentedButtonsResponsive
          buttons={servicesButtons}
          value={value}
          onValueChange={setValue}
        />
        {isLoadingProfessionals && <ActivityIndicator />}
        {!isLoadingProfessionals && professionalsView}
      </SafeAreaView>
    </CardBienestar>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
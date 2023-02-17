import { Convocatoria } from './components/list-convocatorias';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppBarComponent } from '../../components/app-bar';
import { View } from 'react-native-animatable';
import { StyleSheet, Dimensions, RefreshControl, FlatList, Appearance, Text } from 'react-native';
import { fonts } from '@src/theme';
import { SkeletonNews } from '@src/components/skeleton-news';
import { useConvocatorias } from './hooks';
import { useState } from 'react';

const { width } = Dimensions.get("screen");

export const ConvocatoriasScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const colorScheme = Appearance.getColorScheme();
  const { convocatorias, getConvocatorias, isLoading } = useConvocatorias();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onLoadConvocatorias = () => getConvocatorias();

  return (
    <>
      <AppBarComponent title="Convocatorias" />
      <View style={{ ...styles.container, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}>
        {isLoading
          ? <SkeletonNews />
          : <View style={{
            alignItems: 'center',
            backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
            marginHorizontal: width * 0.037
          }}>
            <FlatList
              data={convocatorias}
              keyExtractor={(noticia) => noticia.url}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={(
                <Text style={{
                  ...styles.title,
                  marginBottom: width * 0.04,
                  top: width * 0.05,
                  paddingBottom: width * 0.03,
                  fontSize: width * 0.09,
                  left: -(width * 0.005)
                }}>Convocatorias</Text>
              )}
              renderItem={Convocatoria}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={onLoadConvocatorias}
                />
              }
            />
          </View>
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: fonts.semibold,
  },
  imageLogo: {
    width: width * 0.8,
    height: width * 0.4,
  },
});
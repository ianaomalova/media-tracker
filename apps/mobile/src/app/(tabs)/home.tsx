import Screen from '@/components/Screen';
import Carousel from '@/components/home/HeroCarousel';
import TitleSection from '@/components/home/TitleSection';
import { SAMPLE_TITLES } from '@/mock.data';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <Screen edges={['bottom']}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Carousel items={SAMPLE_TITLES} />
          <TitleSection items={SAMPLE_TITLES} heading="Top picks for you" />
          <TitleSection items={SAMPLE_TITLES} heading="Popular movies" />
        </ScrollView>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
  },
});

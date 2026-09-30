import { Screen } from '@/shared/ui';
import { HeroCarousel, TitleSection } from '@/features/home';
import { SAMPLE_TITLES } from '@/mock.data';
import { ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <Screen edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
      >
        <HeroCarousel items={SAMPLE_TITLES} />
        <TitleSection items={SAMPLE_TITLES} heading="Top picks for you" />
        <TitleSection items={SAMPLE_TITLES} heading="Popular movies" />
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  content: {
    paddingBottom: 90,
  },
});

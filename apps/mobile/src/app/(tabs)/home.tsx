import { Screen } from '@/shared/ui';
import { HeroCarousel, HeroCarouselSkeleton, TitleSection, useTrending } from '@/features/home';
import { SAMPLE_TITLES } from '@/mock.data';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';

export default function HomeScreen() {
  const {
    data: trending,
    isPending: isTrendingPending,
    isError: isTrendingError,
    isRefetching: isTrendingRefetching,
    refetch: refetchTrending,
  } = useTrending(10);

  return (
    <Screen edges={[]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="never"
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isTrendingRefetching}
            onRefresh={() => void refetchTrending()}
          />
        }
      >
        {isTrendingPending && (
          <View>
            <HeroCarouselSkeleton />
          </View>
        )}
        {isTrendingError && (
          <View>
            <Text>Error...</Text>
          </View>
        )}
        {trending && <HeroCarousel items={trending} />}
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

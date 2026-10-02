import { Screen } from '@/shared/ui';
import { HeroCarousel, HeroCarouselSkeleton, useTrending } from '@/features/home';
import { SAMPLE_TITLES } from '@/mock.data';
import { ScrollView, StyleSheet, View, Text, RefreshControl } from 'react-native';
import { useAiGetRecommendations, useTitleFindAll } from '@app/api-client';
import TitleSection from '@/shared/TitleSection';

export default function HomeScreen() {
  const {
    data: trending,
    isPending: isTrendingPending,
    isError: isTrendingError,
    isRefetching: isTrendingRefetching,
    refetch: refetchTrending,
  } = useTrending(20);

  // const {
  //   data: recommendations,
  //   isPending: isRecommendationsPending,
  //   isError: isRecommendationsError,
  //   isRefetching: isRecommendationsRefetching,
  //   refetch: refetchRecommendations,
  // } = useAiGetRecommendations();

  // const { data: popularMovies } = useTitleFindAll();

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
        {trending && <HeroCarousel items={trending.slice(0, 10)} />}
        {trending && <TitleSection items={trending.slice(10, 15)} heading="Top picks for you" />}
        {trending && <TitleSection items={trending.slice(15, 20)} heading="Popular movies" />}
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

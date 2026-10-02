import { useDiscoverFindByKey } from '@app/api-client';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import DiscoverDetailsSkeleton from './DiscoverDetailsSkeleton';
import { semanticColors } from '@app/design-tokens';
import { Cast } from '../Cast';
import GameMeta from './GameMeta';
import GlassButton from '@/shared/ui/GlassButton';
import { router } from 'expo-router';
import TitleSection from '@/shared/TitleSection/TitleSection';
import { Screen } from '@/shared/ui';
import DiscoverActions from './DiscoverActions';
import { ChevronLeft } from 'lucide-react-native';
import DiscoverHeader from './DiscoverHeader';

export default function DiscoverDetails({ discoverKey }: { discoverKey: string }) {
  const { data, isPending, isError } = useDiscoverFindByKey(discoverKey);

  if (isPending) {
    return <DiscoverDetailsSkeleton />;
  }

  if (isError) {
    return <View></View>;
  }

  return (
    <Screen edges={[]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="never"
        style={styles.scroll}
        contentContainerStyle={styles.container}
      >
        <View style={styles.cover}>
          <Image source={data?.coverUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
            style={StyleSheet.absoluteFill}
          />
          <GlassButton style={styles.backButton} effect="regular" onPress={() => router.back()}>
            <ChevronLeft color={semanticColors.text.primary} />
          </GlassButton>
        </View>
        <DiscoverHeader data={data} />
        <DiscoverActions />
        {data.type === 'GAME' && (
          <GameMeta type={data.type} metadata={data.metadata} creators={data.creators} />
        )}
        <View style={{ gap: 30 }}>
          {data.cast.length > 0 && <Cast title="Cast" cast={data.cast} />}
          {data.creators.length > 0 && <Cast title="Creators" cast={data.creators} />}
        </View>
        {data.similar.length > 0 && (
          <TitleSection items={data.similar} heading="You may also like" />
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },

  container: {
    paddingBottom: 30,
  },

  cover: {
    height: 450,
    overflow: 'hidden',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
});

import { useDiscoverFindByKey } from '@app/api-client';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import DiscoverDetailsSkeleton from './DiscoverDetailsSkeleton';
import { formatReleaseDate, formatRuntime } from '@app/utils';
import { semanticColors } from '@app/design-tokens';
import { ChevronLeft, Star } from 'lucide-react-native';
import { useState } from 'react';
import { Cast } from './Cast';
import GlassButton from '@/shared/ui/GlassButton';
import { router } from 'expo-router';

export default function DiscoverDetails({ discoverKey }: { discoverKey: string }) {
  const { data, isPending, isError } = useDiscoverFindByKey(discoverKey);

  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  if (isPending) {
    return <DiscoverDetailsSkeleton />;
  }

  if (isError) {
    return <View></View>;
  }

  return (
    <View>
      <View style={styles.cover}>
        <Image source={data?.coverUrl} style={StyleSheet.absoluteFill} contentFit="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.95)']}
          style={StyleSheet.absoluteFill}
        />
        <GlassButton style={styles.backButton} effect="regular" onPress={() => router.back()}>
          <ChevronLeft color={semanticColors.text.primary} />
        </GlassButton>
        <View style={styles.content}>
          <View style={styles.header}>
            {data.ageRating && (
              <View style={styles.ageRatingWrapper}>
                <Text style={styles.ageRatingText}>{data.ageRating}</Text>
              </View>
            )}

            {data.ageRating && <View style={styles.separator} />}

            {data.releaseDate && (
              <Text style={styles.releaseDate}>{formatReleaseDate(data.releaseDate)}</Text>
            )}
            <View style={styles.separator} />
            {data.genres && <Text style={styles.genres}>{data.genres.join(' · ')}</Text>}
            {data.genres && <View style={styles.separator} />}
            {typeof data.metadata.runtimeMinutes === 'number' && (
              <Text style={styles.runtime}>{formatRuntime(data.metadata.runtimeMinutes)}</Text>
            )}
          </View>
          {data.rating && (
            <View style={styles.ratingWrapper}>
              <Star size={17} color="#FACC15" fill="#FACC15" />
              <Text style={styles.ratingValue}>{data.rating.toFixed(1)}</Text>
            </View>
          )}
          {data.description && (
            <Pressable
              onPress={() => {
                if (canExpand) setExpanded((value) => !value);
              }}
            >
              <Text
                style={styles.description}
                numberOfLines={expanded ? undefined : 2}
                ellipsizeMode="tail"
              >
                {data.description}
              </Text>
              <Text
                style={[styles.description, styles.measurer]}
                onTextLayout={(event) => {
                  setCanExpand(event.nativeEvent.lines.length > 2);
                }}
              >
                {data.description}
              </Text>
            </Pressable>
          )}
        </View>
      </View>
      <Cast cast={data.cast} />
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    height: 450,
    overflow: 'hidden',
  },

  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    gap: 14,
  },

  header: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  ageRatingWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: semanticColors.text.primary,
  },

  ageRatingText: {
    color: semanticColors.text.primary,
  },

  genres: {
    color: semanticColors.text.primary,
  },

  releaseDate: {
    color: semanticColors.text.primary,
  },

  runtime: {
    color: semanticColors.text.primary,
  },

  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingValue: {
    color: semanticColors.text.primary,
  },

  description: {
    color: semanticColors.text['little-muted'],
  },

  measurer: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
  },

  separator: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
});

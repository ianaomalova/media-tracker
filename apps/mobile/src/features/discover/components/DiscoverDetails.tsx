import { useDiscoverFindByKey } from '@app/api-client';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import DiscoverDetailsSkeleton from './DiscoverDetailsSkeleton';
import { formatReleaseDate, formatRuntime } from '@app/utils';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import {
  Bookmark,
  ChevronLeft,
  CircleCheck,
  Share,
  Star,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react-native';
import { useState } from 'react';
import { Cast } from './Cast';
import GameMeta from './GameMeta';
import GlassButton from '@/shared/ui/GlassButton';
import { router } from 'expo-router';
import TitleSection from '@/shared/TitleSection/TitleSection';
import { Button, Screen } from '@/shared/ui';

const DESCRIPTION_PREVIEW_LINES = 2;
const DESCRIPTION_LINE_HEIGHT = 20;
const DESCRIPTION_SLOT_HEIGHT = DESCRIPTION_LINE_HEIGHT * DESCRIPTION_PREVIEW_LINES;
const COVER_PADDING = 20;

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
          <View style={styles.content}>
            <Text style={styles.contentName}>{data.name || data.originalName}</Text>
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
            {data.description && <View style={styles.descriptionSlot} />}
          </View>
        </View>
        {data.description && (
          <Pressable
            style={styles.descriptionWrap}
            onPress={() => {
              if (canExpand) setExpanded((value) => !value);
            }}
          >
            <Text
              style={[styles.description, !expanded && styles.descriptionCollapsed]}
              numberOfLines={expanded ? undefined : DESCRIPTION_PREVIEW_LINES}
              ellipsizeMode="tail"
            >
              {data.description}
            </Text>
            <Text
              style={[styles.description, styles.measurer]}
              onTextLayout={(event) => {
                setCanExpand(event.nativeEvent.lines.length > DESCRIPTION_PREVIEW_LINES);
              }}
            >
              {data.description}
            </Text>
          </Pressable>
        )}
        {data.type === 'GAME' && (
          <GameMeta type={data.type} metadata={data.metadata} creators={data.creators} />
        )}
        <Button variant="primary" icon={Bookmark} style={styles.addCollectionButton}>
          Add to collection
        </Button>
        <View style={styles.actions}>
          <View style={styles.actionsItem}>
            <Button iconOnly icon={CircleCheck} variant="secondary"></Button>
            <Text style={styles.actionsItemText}>Watched</Text>
          </View>
          <View style={styles.actionsItem}>
            <Button iconOnly icon={Share} variant="secondary"></Button>
            <Text style={styles.actionsItemText}>Share</Text>
          </View>
          <View style={styles.actionsItem}>
            <Button iconOnly icon={ThumbsUp} variant="secondary"></Button>
            <Text style={styles.actionsItemText}>Like</Text>
          </View>
          <View style={styles.actionsItem}>
            <Button iconOnly icon={ThumbsDown} variant="secondary"></Button>
            <Text style={styles.actionsItemText}>Dislike</Text>
          </View>
        </View>
        {(data.cast.length > 0 || data.creators.length > 0) && (
          <Cast cast={data.cast && data.creators} />
        )}
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

  content: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    padding: COVER_PADDING,
    gap: 14,
  },

  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },

  contentName: {
    fontSize: fontSize['3xl'],
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
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
    fontWeight: fontWeight.medium,
  },

  genres: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  releaseDate: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  runtime: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingValue: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  description: {
    color: semanticColors.text['little-muted'],
    lineHeight: DESCRIPTION_LINE_HEIGHT,
  },

  descriptionCollapsed: {
    minHeight: DESCRIPTION_SLOT_HEIGHT,
  },

  descriptionSlot: {
    height: DESCRIPTION_SLOT_HEIGHT,
  },

  descriptionWrap: {
    marginTop: -(DESCRIPTION_SLOT_HEIGHT + COVER_PADDING),
    marginBottom: COVER_PADDING,
    paddingHorizontal: COVER_PADDING,
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

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  actionsItem: {
    gap: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionsItemText: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
    fontSize: fontSize.sm,
  },

  addCollectionButton: {
    width: '100%',
    marginTop: 16,
  },
});

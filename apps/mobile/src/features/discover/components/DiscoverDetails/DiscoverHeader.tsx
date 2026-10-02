import type { DiscoverDetailsResponse } from '@app/api-client';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { formatReleaseDate, formatRuntime } from '@app/utils';
import { Star } from 'lucide-react-native';
import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { MediaTypeBadge } from '@/shared/ui';

interface Props {
  data: DiscoverDetailsResponse;
}

const DESCRIPTION_PREVIEW_LINES = 2;
const DESCRIPTION_LINE_HEIGHT = 20;
const DESCRIPTION_SLOT_HEIGHT = DESCRIPTION_LINE_HEIGHT * DESCRIPTION_PREVIEW_LINES;
const COVER_PADDING = 20;

export default function DiscoverHeader({ data }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const metaItems = [
    <MediaTypeBadge key="type" type={data.type} size="full" />,
    data.releaseDate ? (
      <Text key="date" style={styles.releaseDate}>
        {formatReleaseDate(data.releaseDate)}
      </Text>
    ) : null,
    data.ageRating ? (
      <View key="age" style={styles.ageRatingWrapper}>
        <Text style={styles.ageRatingText}>{data.ageRating}</Text>
      </View>
    ) : null,
    typeof data.metadata.runtimeMinutes === 'number' ? (
      <Text key="runtime" style={styles.runtime}>
        {formatRuntime(data.metadata.runtimeMinutes)}
      </Text>
    ) : null,
  ].filter((item) => item != null);

  return (
    <View>
      <View style={styles.overlayAnchor}>
        <View style={styles.content}>
          <Text style={styles.contentName}>{data.name || data.originalName}</Text>
          <View style={styles.header}>
            {metaItems.flatMap((item, index) =>
              index === 0
                ? [item]
                : [<View key={`separator-${index}`} style={styles.separator} />, item],
            )}
          </View>
          {data.genres?.length ? (
            <Text style={styles.genres}>{data.genres.join(' · ')}</Text>
          ) : null}
          {data.type === 'TV_SHOW' && (
            <View style={styles.tvMeta}>
              {typeof data.metadata.seasons === 'number' && (
                <Text style={styles.seasons}>{data.metadata.seasons} seasons</Text>
              )}
              <Text style={{ color: semanticColors.text.primary }}>·</Text>
              {typeof data.metadata.episodes === 'number' && (
                <Text style={styles.episodes}>{data.metadata.episodes} episodes</Text>
              )}
            </View>
          )}
          {data.rating && (
            <View style={styles.ratingWrapper}>
              <Star size={17} color={semanticColors.ratingStar} fill={semanticColors.ratingStar} />
              <Text style={styles.ratingValue}>{data.rating.toFixed(1)}</Text>
              {data.ratingCount != null && data.ratingCount > 0 && (
                <Text style={styles.ratingCount}>({formatCompactCount(data.ratingCount)})</Text>
              )}
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
          <Text style={styles.descriptionMore}>{canExpand && !expanded ? 'Show more' : null}</Text>
        </Pressable>
      )}
    </View>
  );
}

function formatCompactCount(value: number) {
  if (value < 1000) return String(value);

  const compact = value < 1_000_000 ? value / 1000 : value / 1_000_000;
  const suffix = value < 1_000_000 ? 'K' : 'M';
  const rounded = compact >= 10 ? Math.round(compact) : Math.round(compact * 10) / 10;

  return `${rounded}${suffix}`;
}

const styles = StyleSheet.create({
  overlayAnchor: {
    height: 0,
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

  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ageRatingWrapper: {},

  ratingValue: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  ratingCount: {
    color: semanticColors.text['little-muted'],
    fontWeight: fontWeight.medium,
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

  separator: {
    width: 1,
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.45)',
  },

  tvMeta: {
    flexDirection: 'row',
    gap: 4,
  },

  seasons: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
  },

  episodes: {
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

  descriptionMore: {
    color: semanticColors.text.primary,
    fontWeight: fontWeight.medium,
    textAlign: 'left',
    marginTop: 6,
  },

  measurer: {
    position: 'absolute',
    opacity: 0,
    left: 0,
    right: 0,
  },
});

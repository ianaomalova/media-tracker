import {
  CreatorRole,
  DiscoverDetailsResponseType,
  type CreatorResponse,
  type DiscoverDetailsResponseMetadata,
} from '@app/api-client';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import {
  Gamepad2,
  Globe,
  Laptop,
  Monitor,
  Smartphone,
  Terminal,
  type LucideIcon,
} from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  type: DiscoverDetailsResponseType;
  metadata: DiscoverDetailsResponseMetadata;
  creators: CreatorResponse[];
}

export default function GameMeta({ metadata, creators }: Props) {
  const playtimeHours = readPlaytime(metadata.averagePlaytimeHours);
  const platforms = readPlatforms(metadata.platforms);
  const studio = readStudio(creators);

  if (playtimeHours == null && platforms.length === 0 && !studio) return null;

  return (
    <View style={styles.block}>
      {platforms.length > 0 && (
        <View style={styles.line}>
          <Text style={styles.label}>Platforms:</Text>
          <View style={styles.icons}>
            {platforms.map((platform) => {
              const Icon = platformIcon(platform);
              return (
                <View key={platform} accessibilityLabel={platform}>
                  <Icon size={18} strokeWidth={2} color={semanticColors.text.primary} />
                </View>
              );
            })}
          </View>
        </View>
      )}
      {studio && (
        <Text style={styles.lineText} numberOfLines={1}>
          <Text style={styles.label}>Studio: </Text>
          <Text style={styles.value}>{studio}</Text>
        </Text>
      )}
      {playtimeHours != null && (
        <Text style={styles.lineText}>
          <Text style={styles.label}>Playtime: </Text>
          <Text style={styles.value}>{formatPlaytime(playtimeHours)}</Text>
        </Text>
      )}
    </View>
  );
}

function readPlaytime(value: unknown) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function readPlatforms(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string' && item.length > 0);
}

function readStudio(creators: CreatorResponse[]) {
  return creators
    .filter((creator) => creator.role === CreatorRole.STUDIO)
    .map((creator) => creator.name)
    .join(', ');
}

function formatPlaytime(hours: number) {
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))}m`;
  if (Number.isInteger(hours)) return `${hours}h`;
  return `${hours.toFixed(1)}h`;
}

function platformIcon(name: string): LucideIcon {
  const key = name.toLowerCase();

  if (key.includes('linux')) return Terminal;
  if (key.includes('mac')) return Laptop;
  if (key === 'pc' || key.includes('windows')) return Monitor;
  if (key.includes('android') || key.includes('ios')) return Smartphone;
  if (key.includes('web') || key.includes('browser')) return Globe;

  return Gamepad2;
}

const styles = StyleSheet.create({
  block: {
    gap: 6,
    paddingHorizontal: 20,
  },

  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  lineText: {
    color: semanticColors.text.primary,
  },

  label: {
    color: semanticColors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },

  value: {
    color: semanticColors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

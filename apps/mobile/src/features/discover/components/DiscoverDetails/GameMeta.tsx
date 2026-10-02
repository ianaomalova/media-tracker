import {
  CreatorRole,
  DiscoverDetailsResponseType,
  type CreatorResponse,
  type DiscoverDetailsResponseMetadata,
} from '@app/api-client';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import {
  Gamepad,
  Gamepad2,
  Globe,
  Joystick,
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
  const platforms = groupPlatforms(readPlatforms(metadata.platforms));
  const studio = readStudio(creators);

  if (playtimeHours == null && platforms.length === 0 && !studio) return null;

  return (
    <View style={styles.block}>
      {platforms.length > 0 && (
        <View style={styles.line}>
          <Text style={styles.label}>Platforms:</Text>
          <View style={styles.icons}>
            {platforms.map((platform) => {
              const Icon = platform.icon;

              return (
                <View key={platform.family} accessibilityLabel={platform.label}>
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

function groupPlatforms(platforms: string[]) {
  const groups = new Map<string, { icon: LucideIcon; names: string[] }>();

  for (const platform of platforms) {
    const { family, icon } = resolvePlatform(platform);
    const group = groups.get(family);

    if (group) {
      group.names.push(platform);
    } else {
      groups.set(family, { icon, names: [platform] });
    }
  }

  return [...groups.entries()].map(([family, group]) => ({
    family,
    icon: group.icon,
    label: group.names.join(', '),
  }));
}

function resolvePlatform(name: string): { family: string; icon: LucideIcon } {
  const key = name.toLowerCase();

  if (key.includes('linux')) return { family: 'linux', icon: Terminal };
  if (
    key === 'mac' ||
    key.includes('macos') ||
    key.includes('mac os') ||
    key.includes('macintosh')
  ) {
    return { family: 'mac', icon: Laptop };
  }
  if (key === 'pc' || key.includes('windows')) return { family: 'pc', icon: Monitor };
  if (key.includes('android') || key === 'ios' || key.includes('iphone') || key.includes('ipad')) {
    return { family: 'mobile', icon: Smartphone };
  }
  if (key.includes('web') || key.includes('browser')) return { family: 'web', icon: Globe };
  if (key.includes('xbox')) return { family: 'xbox', icon: Gamepad2 };
  if (
    key.includes('playstation') ||
    key.includes('psp') ||
    key.includes('ps vita') ||
    /^ps\d/.test(key)
  ) {
    return { family: 'playstation', icon: Gamepad };
  }
  if (
    key.includes('nintendo') ||
    key.includes('switch') ||
    key.includes('wii') ||
    key.includes('gamecube') ||
    key.includes('game boy') ||
    key.includes('gameboy') ||
    key === 'nes' ||
    key === 'snes' ||
    key === 'ds' ||
    key.includes('3ds')
  ) {
    return { family: 'nintendo', icon: Joystick };
  }

  return { family: name, icon: Gamepad2 };
}

const styles = StyleSheet.create({
  block: {
    gap: 10,
    paddingHorizontal: 20,
    marginTop: 20,
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

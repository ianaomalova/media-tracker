import { StyleSheet, Text, View } from 'react-native';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';

interface ProfileStatsProps {
  completed: number;
  inProgress: number;
  watchlist: number;
}

export default function ProfileStats({ completed, inProgress, watchlist }: ProfileStatsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your activity</Text>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{inProgress}</Text>
          <Text style={styles.statLabel}>In progress</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{watchlist}</Text>
          <Text style={styles.statLabel}>Watchlist</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    marginTop: 28,
  },

  title: {
    marginBottom: 14,

    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: semanticColors.text.primary,
  },

  stats: {
    flexDirection: 'row',
    gap: 10,
  },

  statCard: {
    flex: 1,
    minHeight: 50,

    alignItems: 'center',
    justifyContent: 'center',

    paddingHorizontal: 8,
    paddingVertical: 14,

    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(77, 141, 255, 0.22)',

    backgroundColor: 'rgba(20, 31, 52, 0.7)',
  },

  statValue: {
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },

  statLabel: {
    marginTop: 5,

    fontSize: fontSize.xs,
    color: semanticColors.text['little-muted'],
    textAlign: 'center',
  },
});

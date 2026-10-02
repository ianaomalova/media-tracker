import { Button, GlassButton } from '@/shared/ui';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { Bookmark, ThumbsUp, CircleCheck, ThumbsDown, Share } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function DiscoverActions() {
  return (
    <View>
      <View style={styles.addCollectionButtonContainer}>
        <Button variant="primary" icon={Bookmark} style={styles.addCollectionButton}>
          Add to collection
        </Button>
      </View>
      <View style={styles.actions}>
        <View style={styles.actionsItem}>
          <GlassButton style={{ width: 54, height: 54 }} effect="regular">
            <CircleCheck color={semanticColors.text.primary} />
          </GlassButton>
          <Text style={styles.actionsItemText}>Watched</Text>
        </View>
        <View style={styles.actionsItem}>
          <GlassButton style={{ width: 54, height: 54 }} effect="regular">
            <Share color={semanticColors.text.primary} />
          </GlassButton>
          <Text style={styles.actionsItemText}>Share</Text>
        </View>
        <View style={styles.actionsItem}>
          <GlassButton style={{ width: 54, height: 54 }} effect="regular">
            <ThumbsUp color={semanticColors.text.primary} />
          </GlassButton>
          <Text style={styles.actionsItemText}>Like</Text>
        </View>
        <View style={styles.actionsItem}>
          <GlassButton style={{ width: 54, height: 54 }} effect="regular">
            <ThumbsDown color={semanticColors.text.primary} />
          </GlassButton>
          <Text style={styles.actionsItemText}>Dislike</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
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

  addCollectionButtonContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },

  addCollectionButton: {
    marginTop: 10,
    width: '100%',
  },
});

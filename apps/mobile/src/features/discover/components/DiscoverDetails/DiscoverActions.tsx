import { Button } from '@/shared/ui';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { Bookmark, ThumbsUp, CircleCheck, ThumbsDown, Share } from 'lucide-react-native';
import { View, Text, StyleSheet } from 'react-native';

export default function DiscoverActions() {
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
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

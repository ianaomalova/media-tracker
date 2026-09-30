import { View, Text, FlatList, StyleSheet } from 'react-native';
import TitleCard from './TitleCard';
import { GlassButton } from '@/shared/ui';
import { ChevronRight } from 'lucide-react-native';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import type { TitleListItemResponse } from '@app/api-client';

interface Props {
  items: TitleListItemResponse[];
  heading: string;
}

export default function TitleSection({ items, heading }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>{heading}</Text>
        {items?.length > 0 && (
          <GlassButton>
            <ChevronRight color={semanticColors.text.primary} />
          </GlassButton>
        )}
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <TitleCard item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 34,
  },

  list: {
    gap: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  heading: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: semanticColors.text.primary,
  },
});

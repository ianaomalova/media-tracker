import { View, Text, FlatList, StyleSheet } from 'react-native';
import TitleCard from './TitleCard';
import { SAMPLE_TITLES } from '@/mock.data';
import GlassButton from '@/components/ui/GlassButton';
import { ChevronRight } from 'lucide-react-native';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';

export default function TitleSection() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Top picks for you</Text>
        <GlassButton>
          <ChevronRight color={semanticColors.text.primary} />
        </GlassButton>
      </View>
      <FlatList
        data={SAMPLE_TITLES}
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

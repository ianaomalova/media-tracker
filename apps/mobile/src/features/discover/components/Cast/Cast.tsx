import type { PersonResponse } from '@app/api-client';
import { fontSize, fontWeight, semanticColors } from '@app/design-tokens';
import { splitName } from '@app/utils';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Props {
  cast: PersonResponse[];
}

export default function Cast({ cast }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Cast</Text>
        <View style={styles.seeAll}>
          <Text style={styles.titleSeeAll}>See all</Text>
          <ChevronRight size={18} color={semanticColors.text.primary} />
        </View>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cast}
        data={cast}
        renderItem={({ item }) => (
          <View key={item.name} style={styles.person}>
            <Image
              source={
                item.photoUrl || require('@/assets/images/project-images/profile/default-photo.png')
              }
              style={styles.image}
            />

            <View>
              <Text style={styles.name} numberOfLines={1}>
                {splitName(item.name).first}
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                {splitName(item.name).last}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 10,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 999,
  },

  title: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  seeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },

  titleText: {
    color: semanticColors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.medium,
  },

  titleSeeAll: {
    color: semanticColors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },

  name: {
    width: '100%',
    textAlign: 'center',
    color: semanticColors.text.primary,
    fontSize: fontSize.xs,
  },

  cast: {
    gap: 20,
  },

  person: {
    width: 80,
    alignItems: 'center',
    gap: 10,
  },
});

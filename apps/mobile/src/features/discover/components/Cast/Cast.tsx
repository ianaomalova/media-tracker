import type { PersonResponse } from '@app/api-client';
import { fontSize, semanticColors } from '@app/design-tokens';
import { splitName } from '@app/utils';
import { Image } from 'expo-image';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Props {
  cast: PersonResponse[];
}

export default function Cast({ cast }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cast</Text>
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
    color: semanticColors.text.primary,
    fontSize: fontSize.xl,
    marginBottom: 16,
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

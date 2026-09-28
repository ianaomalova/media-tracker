import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function Avatar() {
  return (
    <View>
      <Image
        source={require('@/assets/images/project-images/profile/avatar.png')}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    borderWidth: 3,
    borderColor: '#4D8DFF',
  },
});

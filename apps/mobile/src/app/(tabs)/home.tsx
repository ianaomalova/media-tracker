import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import Screen from '@/components/Screen';
import Button from '@/components/ui/Button';
import { ChevronLeft, Delete, Download } from 'lucide-react-native';
import GlassButton from '@/components/ui/GlassButton';
import Carousel from '@/components/ui/Carousel';

export default function HomeScreen() {
  return (
    <Screen edges={[]}>
      <Carousel />
      {/* <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85',
        }}
        resizeMode="cover"
        style={styles.background}
      >
        <View style={styles.content}>
          <Button variant="primary" icon={Download}>
            Primary
          </Button>
          <Button variant="secondary" icon={Delete} />
          <GlassButton tintColor="rgba(80, 20, 12, 0.2)">
            <ChevronLeft size={22} color="white" strokeWidth={2} />
          </GlassButton>
        </View>
      </ImageBackground> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 24,
  },
});

import { StyleSheet } from 'react-native';
import Screen from '@/components/Screen';
import Carousel from '@/components/home/HeroCarousel';
import TitleSection from '@/components/home/TitleSection';

export default function HomeScreen() {
  return (
    <Screen edges={[]}>
      <Carousel />
      <TitleSection />
    </Screen>
  );
}

// const styles = StyleSheet.create({
//   background: {
//     flex: 1,
//   },

//   content: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     gap: 16,
//     padding: 24,
//   },
// });

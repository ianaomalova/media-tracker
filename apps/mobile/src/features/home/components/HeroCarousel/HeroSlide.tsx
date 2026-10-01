import type { DiscoverItemResponse } from '@app/api-client';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from 'react-native-reanimated';

import HeroCover from './HeroCover';

interface Props {
  item: DiscoverItemResponse;
  width: number;
  index: number;
  scrollX: SharedValue<number>;
}

export default function HeroSlide({ item, width, index, scrollX }: Props) {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

  const imageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          inputRange,
          [-width * 0.12, 0, width * 0.12],
          Extrapolation.CLAMP,
        ),
      },
      {
        scale: interpolate(scrollX.value, inputRange, [1.08, 1, 1.08], Extrapolation.CLAMP),
      },
    ],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollX.value, inputRange, [0, 1, 0], Extrapolation.CLAMP),
    transform: [
      {
        translateY: interpolate(scrollX.value, inputRange, [24, 0, 24], Extrapolation.CLAMP),
      },
    ],
  }));

  return (
    <HeroCover item={item} style={{ width }} imageStyle={imageStyle} contentStyle={contentStyle} />
  );
}

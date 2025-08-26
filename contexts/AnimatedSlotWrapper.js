import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  useSharedValue,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { usePathname } from 'expo-router';
import { Platform } from 'react-native';

export const AnimatedSlotWrapper = ({ children }) => {
  const progress = useSharedValue(0);
  const pathname = usePathname(); // rerun effect on route change
  const isInsideChat = pathname.startsWith('/chat/');

  useEffect(() => {
    progress.value = 0;
    progress.value = withTiming(1, { duration: 400 });
  }, [pathname]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [100, 0]);
    const scale = interpolate(progress.value, [0, 1], [1.05, 1]);
    const opacity = interpolate(progress.value, [0, 1], [0.2, 1]);

    return {
      opacity,
      transform: [
        { translateY },
        { scale },
      ],
    };
  });

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(200)}
      style={[{ flex: 1 }, Platform.OS !== 'web' && !isInsideChat && animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

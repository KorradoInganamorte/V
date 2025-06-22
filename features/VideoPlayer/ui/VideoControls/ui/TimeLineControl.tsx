import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
} from "react-native-reanimated";

import Slider from "@react-native-community/slider";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const currentTime = useVideoPlayerStore(state => state.currentTime);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);

  const bufferedPosition = useVideoPlayerStore(state => state.bufferedPosition);
  const duration = useVideoPlayerStore(state => state.duration);

  const isSliding = useVideoPlayerStore(state => state.isSliding);
  const setIsSliding = useVideoPlayerStore(state => state.setIsSliding);

  const isOpenSettings = useVideoPlayerStore(state => state.isOpenSettings);

  const bufferWidth = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  const [trackColor, setTrackColor] = useState<string>("#E11D48");
  const progressColorAnimated = useSharedValue(0);

  useEffect(() => {
    const ration = bufferedPosition / duration;

    bufferWidth.value = withTiming(ration, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, [bufferedPosition, duration, bufferWidth]);

  useEffect(() => {
    const progress = currentTime / duration;
    progressWidth.value = withTiming(progress, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });
  }, [currentTime, duration, progressWidth]);

  const bufferStyle = useAnimatedStyle(() => ({
    width: `${bufferWidth.value * 100}%`,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  useAnimatedReaction(
    () => progressColorAnimated.value,
    value => {
      const color = interpolateColor(value, [0, 1], ["#E11D48", "transparent"]);
      runOnJS(setTrackColor)(color);
    },
    [progressColorAnimated]
  );

  useEffect(() => {
    if(isOpenSettings) progressColorAnimated.value = withTiming(1, { duration: 200 });
    else progressColorAnimated.value = withTiming(0, { duration: 400 });
  }, [isOpenSettings])

  return (
    <View className="relative w-full">
      <Animated.View style={bufferStyle} className="absolute left-0 top-1/2 h-[0.2rem] w-full -translate-y-1/2 bg-gray-500"></Animated.View>

      <Animated.View style={progressStyle} className="absolute left-0 top-1/2 h-[0.2rem] w-full -translate-y-1/2 bg-rose-600" />

      <View className="absolute top-1/2 flex h-[1rem] w-full -translate-y-1/2 justify-center">
        <Slider
          style={{
            marginLeft: Platform.select({ ios: 0, android: -15 }),
            marginRight: Platform.select({ ios: 0, android: -15 }),
          }}
          disabled={isOpenSettings}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          step={0.1}
          minimumTrackTintColor="#e11d48"
          maximumTrackTintColor="#ffffff"
          thumbTintColor={trackColor}
          onSlidingStart={() => {
            player?.pause();
            setIsSliding(true);
          }}
          onValueChange={value => {
            if (isSliding && player) {
              setCurrentTime(value);
            }
          }}
          onSlidingComplete={value => {
            player?.seekBy(value - player.currentTime);
            player?.play();
            setIsSliding(false);
          }}
        />
      </View>
    </View>
  );
};

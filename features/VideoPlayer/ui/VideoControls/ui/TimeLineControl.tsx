import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

import Slider from "@react-native-community/slider";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const currentTime = useVideoPlayerStore(state => state.currentTime);
  const bufferedPosition = useVideoPlayerStore(state => state.bufferedPosition);
  const duration = useVideoPlayerStore(state => state.duration);

  const bufferWidth = useSharedValue(0);

  useEffect(() => {
    const ration = bufferedPosition / duration;

    bufferWidth.value = withTiming(ration, {
      duration: 2000,
      easing: Easing.out(Easing.exp),
    });
  }, [bufferedPosition, duration, bufferWidth]);

  const bufferStyle = useAnimatedStyle(() => ({
    width: `${bufferWidth.value * 100}%`,
  }));

  const isSliding = useVideoPlayerStore(state => state.isSliding);
  const setIsSliding = useVideoPlayerStore(state => state.setIsSliding);

  return (
    <View className="relative w-full flex-col items-center">
      <Animated.View
        style={bufferStyle}
        className={`absolute left-[1.15rem] top-1/2 h-[0.15rem] max-w-[92.25%] -translate-y-[0.1rem]  bg-gray-500`}
      ></Animated.View>

      <Slider
        style={{ width: "100%" }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime || 0}
        minimumTrackTintColor="#ED0000"
        maximumTrackTintColor="#ffffff"
        thumbTintColor="#ED0000"
        onSlidingStart={() => {
          player?.pause();
          setIsSliding(true);
        }}
        onValueChange={value => isSliding && player?.seekBy(value - player.currentTime)}
        onSlidingComplete={value => {
          player?.seekBy(value - player.currentTime);
          player?.play();
          setIsSliding(false);
        }}
      />
    </View>
  );
};

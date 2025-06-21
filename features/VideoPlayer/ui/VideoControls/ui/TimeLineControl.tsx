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

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);
  const isOpenSettings = useVideoPlayerStore(state => state.isOpenSettings);

  return (
    <View className="relative min-h-[1.5rem] w-full flex-col items-center">
      <Animated.View
        style={bufferStyle}
        className={`absolute left-0 top-1/2 h-[0.15rem] w-full -translate-y-[0.15rem] bg-gray-500`}
      ></Animated.View>

      {!isOpenSettings && (
        <Slider
          style={{ width: isFullscreen ? "105%" : "108%" }}
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
      )}
    </View>
  );
};

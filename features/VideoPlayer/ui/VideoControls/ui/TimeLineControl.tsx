import { useEffect, useState } from "react";
import { DimensionValue, View } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const [trackWidth, setTrackWidth] = useState(0);

  const currentTime = useVideoPlayerStore(state => state.currentTime);
  const bufferedPosition = useVideoPlayerStore(state => state.bufferedPosition);
  const duration = useVideoPlayerStore(state => state.duration);

  const bufferWidth = useSharedValue(0);
  const progressWidth = useSharedValue(0);

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
      duration: 200,
      easing: Easing.linear,
    });
  }, [currentTime, duration, progressWidth]);

  const bufferStyle = useAnimatedStyle(() => ({
    width: `${bufferWidth.value * 100}%`,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  // const thumbStyle = useAnimatedStyle(() => {
  //   type typeX = "more" | "less"  | "middle"
  //   const x: typeX = currentTime < 5 ? "less" : currentTime > (duration - 5) ? "more" : "middle"

  //   const leftMiddle: DimensionValue = `${progressWidth.value * 100}%`
  //   const leftLess: DimensionValue = "1.4%"
  //   const leftMore: DimensionValue = `${trackWidth - 10}%`

  //   return {
  //     left: `${x === "middle" ? leftMiddle : x === "less" ? leftLess : leftMore}`
  //   }
  // });

  const thumbStyle = useAnimatedStyle(() => {
    console.log(trackWidth - 16);
    const min = 0.45 * 16; // если 1rem = 16px
    const max = trackWidth - min;
    const pos = Math.max(min, Math.min(max, progressWidth.value * trackWidth));
    return { left: pos };
  });

  const isSliding = useVideoPlayerStore(state => state.isSliding);
  const setIsSliding = useVideoPlayerStore(state => state.setIsSliding);

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);
  const isOpenSettings = useVideoPlayerStore(state => state.isOpenSettings);

  return (
    <View className="relative h-5 w-full" onLayout={e => setTrackWidth(e.nativeEvent.layout.width)}>
      <View className="absolute left-0 top-1/2 h-[0.2rem] w-full -translate-y-1/2 bg-zinc-700"></View>

      <Animated.View style={bufferStyle} className="absolute left-0 top-1/2 h-[0.2rem] w-full -translate-y-1/2 bg-zinc-500" />

      <Animated.View style={progressStyle} className="absolute left-0 top-1/2 h-[0.2rem] w-full -translate-y-1/2 bg-rose-700" />

      <View className="absolute top-1/2">
        <Animated.View style={thumbStyle} className="h-[0.9rem] w-[0.9rem] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-rose-700" />
      </View>
    </View>
  );
};

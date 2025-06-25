import { useEffect } from "react";
import { Platform, View } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, Easing } from "react-native-reanimated";

import Slider from "@react-native-community/slider";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const currentTime = useVideoPlayerStore(state => state.currentTime);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);

  const bufferedPosition = useVideoPlayerStore(state => state.bufferedPosition);
  const duration = useVideoPlayerStore(state => state.duration);

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  const isSliding = useVideoPlayerStore(state => state.isSliding);
  const setIsSliding = useVideoPlayerStore(state => state.setIsSliding);

  const isVisibleControls = useVideoPlayerStore(state => state.isVisibleControls);
  const setIsVisibleControls = useVideoPlayerStore(state => state.setIsVisibleControls);

  const isOpenSettings = useVideoPlayerStore(state => state.isOpenSettings);

  const bufferWidth = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  const controlsOpacity = useSharedValue(isVisibleControls ? 1 : 0);

  useEffect(() => {
    controlsOpacity.value = withTiming(isVisibleControls ? 1 : 0, { duration: 250 });
  }, [isVisibleControls]);

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

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: isSliding ? 1 : controlsOpacity.value,
  }));

  const bufferStyle = useAnimatedStyle(() => ({
    width: `${bufferWidth.value * 100}%`,
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  return (
    <View className="relative w-full">
      {!isFullscreen && <View className="absolute left-0 top-1/2 h-[0.15rem] w-full -translate-y-1/2 bg-zinc-700"></View>}

      {isVisibleControls && (
        <Animated.View
          style={bufferStyle}
          className="absolute left-0 top-1/2 h-[0.15rem] w-full -translate-y-1/2 bg-zinc-400"
        ></Animated.View>
      )}

      {!isFullscreen && (
        <Animated.View
          style={progressStyle}
          className={`absolute left-0 top-1/2 h-[0.15rem] w-full -translate-y-1/2 ${(isVisibleControls || isSliding) ? "bg-rose-600" : "bg-slate-200"}`}
        />
      )}

      <Animated.View
        style={[{ flex: 1 }, controlsAnimatedStyle]}
        className="absolute top-1/2 flex h-[2rem] w-full -translate-y-1/2 justify-center"
      >
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
          minimumTrackTintColor={(isVisibleControls || isSliding) ? "#e11d48" : "#ffffff"}
          maximumTrackTintColor="#737373"
          thumbTintColor={isOpenSettings ? "transparent" : "#e11d48"}
          onSlidingStart={() => {
            player?.pause();
            setIsVisibleControls(true)
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
      </Animated.View>
    </View>
  );
};

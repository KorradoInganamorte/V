import React, { JSX, useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import { useVideoPlayerStore } from "../models/store";
import { FullscreenControl, PlaybackControl, SettingsControl, SkipControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  const hideControlsTimeout = useRef<number | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // const videoUrl = useVideoPlayerStore(state => state.videoUrl);
  const videoFile = useVideoPlayerStore(state => state.videoFile);
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  const [isRepeatable, setIsRepeatable] = useState<boolean>(false);

  const isVisibleControls = useVideoPlayerStore(state => state.isVisibleControls);
  const setIsVisibleControls = useVideoPlayerStore(state => state.setIsVisibleControls);

  const controlsOpacity = useSharedValue(isVisibleControls ? 1 : 0);

  useEffect(() => {
    controlsOpacity.value = withTiming(isVisibleControls ? 1 : 0, { duration: 250 });
  }, [isVisibleControls]);

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const setPlayer = useVideoPlayerStore(state => state.setPlayer);
  const setStatus = useVideoPlayerStore(state => state.setStatus);
  const setIsPlaying = useVideoPlayerStore(state => state.setIsPlaying);
  const setIsEnded = useVideoPlayerStore(state => state.setIsEnded);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);
  const setBufferedPosition = useVideoPlayerStore(state => state.setBufferedPosition);
  const setDuration = useVideoPlayerStore(state => state.setDuration);
  const setIsOpenSettings = useVideoPlayerStore(state => state.setIsOpenSettings);

  const player = useVideoPlayer(videoFile, player => {
    player.timeUpdateEventInterval = 1;
  });
  useEffect(() => {
    setPlayer(player);
  }, [player, setPlayer]);

  useEffect(() => {
    if (player) {
      player.loop = isRepeatable;
    }
  }, [player, isRepeatable]);

  const { currentTime, bufferedPosition } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: 0,
  });
  useEffect(() => {
    setCurrentTime(currentTime);
    setBufferedPosition(bufferedPosition);
  }, [bufferedPosition, currentTime, setBufferedPosition, setCurrentTime]);

  const { duration } = useEvent(player, "sourceLoad", {
    duration: player.duration,
    videoSource: null,
    availableVideoTracks: [],
    availableSubtitleTracks: [],
    availableAudioTracks: [],
  });
  useEffect(() => {
    setDuration(duration);
  }, [duration, setDuration]);

  const { status, error } = useEvent(player, "statusChange", { status: player.status });
  const videoIsEndedCheck = useCallback(() => {
    if (status === "idle") {
      if (currentTime >= duration && duration > 0) setIsEnded(true);
    }
  }, [currentTime, duration, setIsEnded, status]);

  useEffect(() => {
    setStatus(status);
    videoIsEndedCheck();
  }, [status, setStatus, videoIsEndedCheck]);

  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  useEffect(() => {
    setIsPlaying(isPlaying);
  }, [isPlaying, setIsPlaying]);

  const handleShowControls = useCallback(() => {
    setIsVisibleControls(true);

    // Если видео играет, запускаем таймер на скрытие
    if (isPlaying) {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
      hideControlsTimeout.current = setTimeout(() => {
        setIsVisibleControls(false);
      }, 3000);
    }
  }, [isPlaying, setIsVisibleControls]);

  useEffect(() => {
    return () => {
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    };
  }, []);

  // Если видео на паузе — не скрываем контролы автоматически
  useEffect(() => {
    if (!isPlaying && hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current);
    } else if (isPlaying) handleShowControls();
  }, [isPlaying]);

  const handlePress = useCallback(() => {
    if (isVisibleControls) {
      setIsVisibleControls(false);
      if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    } else {
      handleShowControls();
    }
  }, [isVisibleControls, setIsVisibleControls, handleShowControls]);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsOpenSettings(true);
  }, [setIsOpenSettings]);

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    []
  );

  return (
    <SafeAreaView edges={isFullscreen ? [] : ["top"]} className="h-full w-full">
      <View className="relative items-center justify-center bg-black">
        <View className={`${isFullscreen ? "h-full" : "w-full"} aspect-video`}>
          <VideoView
            style={
              isFullscreen
                ? {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 1)",
                    borderRadius: 6,
                  }
                : {
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.85)",
                  }
            }
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls={false}
          />
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          className={`absolute h-full w-full ${isVisibleControls ? "bg-black/50" : "bg-transparent"}`}
        >
          <Animated.View pointerEvents={isVisibleControls ? "auto" : "none"} style={[{ flex: 1 }, controlsAnimatedStyle]}>
            <View className="absolute h-full w-full items-center justify-center">
              <PlaybackControl />
            </View>

            {status === "error" && (
              <View className="absolute left-0 top-0 z-10 h-full w-full items-center justify-center px-4">
                <Text className="text-2 rounded bg-red-600/80 px-4 py-2 font-medium text-white">
                  Произошла ошибка при загрузке видео {error?.message}
                </Text>
              </View>
            )}

            {status === "loading" && (
              <View className="absolute h-full w-full items-center justify-center">
                <TouchableOpacity className={`flex ${isFullscreen ? "h-20 w-20" : "h-14 w-14"} items-center justify-center rounded-full`}>
                  <ActivityIndicator size={isFullscreen ? 38 : 32} color="white" />
                </TouchableOpacity>
              </View>
            )}

            <View className={`absolute h-full w-full ${isFullscreen && "px-8"} items-end justify-start`}>
              <View className={`${!isFullscreen ? "mx-4 mt-2" : "mt-4"}`}>
                <SettingsControl openSettings={openSheet} />
              </View>
            </View>
          </Animated.View>
        </TouchableOpacity>

        <View pointerEvents="box-none" className="absolute h-full w-full items-center justify-center">
          <SkipControl />
        </View>

        <View className={`absolute -bottom-1 w-full ${isFullscreen && "bottom-3 px-8"}`}>
          <Animated.View pointerEvents={isVisibleControls ? "auto" : "none"} style={[{ flex: 1 }, controlsAnimatedStyle]}>
            <View className={`flex-row items-center justify-between ${isFullscreen ? "mb-2 px-0" : "mb-1 px-4"}`}>
              <TimeLapsControl />
              <FullscreenControl />
            </View>
          </Animated.View>

          <TimeLineControl />
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["30%"]}
        enablePanDownToClose
        onClose={() => setIsOpenSettings(false)}
        onAnimate={(fromIndex, toIndex) => {
          setIsOpenSettings(toIndex !== -1);
        }}
        animationConfigs={{
          damping: 120,
          stiffness: 100,
        }}
        backgroundStyle={{ backgroundColor: "#1a1a1a" }}
        handleIndicatorStyle={{ backgroundColor: "#383838" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex-1 px-8 py-2">
          <TouchableOpacity onPress={() => setIsRepeatable(prev => !prev)} className="flex flex-row items-center justify-between">
            <Text className="font-montserrat-medium text-lg text-slate-200">Повтор воспроизведения</Text>
            <Text className="font-montserrat-medium text-base text-zinc-500">{isRepeatable ? "Вкл." : "Выкл."}</Text>
          </TouchableOpacity>
          {/* Здесь будут настройки */}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

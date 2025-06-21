import { JSX, useCallback, useEffect, useRef } from "react";
import { StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import { useVideoPlayerStore } from "../models/store";
import { FullscreenControl, PlaybackControl, SettingsControl, SkipControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  // const videoUrl = useVideoPlayerStore(state => state.videoUrl);
  const videoFile = useVideoPlayerStore(state => state.videoFile);
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  const setPlayer = useVideoPlayerStore(state => state.setPlayer);
  const setStatus = useVideoPlayerStore(state => state.setStatus);
  const setIsPlaying = useVideoPlayerStore(state => state.setIsPlaying);
  const setIsEnded = useVideoPlayerStore(state => state.setIsEnded);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);
  const setBufferedPosition = useVideoPlayerStore(state => state.setBufferedPosition);
  const setDuration = useVideoPlayerStore(state => state.setDuration);
  const setIsOpenSettings = useVideoPlayerStore(state => state.setIsOpenSettings);

  const player = useVideoPlayer(videoFile, player => {
    player.loop = false;
    player.timeUpdateEventInterval = 1;
  });
  useEffect(() => {
    setPlayer(player);
  }, [player, setPlayer]);

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsOpenSettings(true)
  }, [setIsOpenSettings]);

  const renderBackdrop = useCallback(
    (props: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={0} appearsOnIndex={1} />
    ),
    []
  );

  return (
    <SafeAreaView edges={isFullscreen ? [] : ['top']} className="h-full w-full">
      <StatusBar hidden />
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

        {status === "error" && (
          <View className="absolute left-0 top-0 z-10 h-full w-full items-center justify-center px-4">
            <Text className="text-2 rounded bg-red-600/80 px-4 py-2 font-medium text-white">
              Произошла ошибка при загрузке видео {error?.message}
            </Text>
          </View>
        )}

        <View className="absolute h-full w-full items-center justify-center bg-black/50">
          <PlaybackControl />
        </View>

        <View className="absolute h-full w-full items-center justify-center">
          <SkipControl />
        </View>

        <View className={`absolute h-full w-full ${isFullscreen && "px-8"} items-end justify-start`}>
          <View className={`${!isFullscreen && "mx-4"} my-4`}>
            <SettingsControl openSettings={openSheet} />
          </View>
        </View>

        <View className={`absolute -bottom-3 w-full ${isFullscreen && "px-8 bottom-3"}`}>
          <View className={`flex-row items-end justify-between ${isFullscreen ? "px-0 mb-2" : "px-4 mb-1"}`}>
            <TimeLapsControl />
            <FullscreenControl />
          </View>

          <View className="w-full">
            <TimeLineControl />
          </View>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["30%"]}
        enablePanDownToClose
        onAnimate={(fromIndex, toIndex) => {
          if (toIndex === -1) setIsOpenSettings(false);
          else setIsOpenSettings(true);
        }}
        backgroundStyle={{ backgroundColor: "#363636" }}
        handleIndicatorStyle={{ backgroundColor: "#aaa" }}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className="flex-1 px-4">
          <Text></Text>
          {/* Здесь будут настройки */}
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
};

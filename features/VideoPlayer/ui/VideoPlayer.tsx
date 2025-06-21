import { useCallback, useEffect } from "react";
import { Text, View } from "react-native";

import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import { useVideoPlayerStore } from "../models/store";
import { FullscreenControl, PlaybackControl, SettingsControl, SkipControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  const videoUrl = useVideoPlayerStore(state => state.videoUrl);
  const videoFile = useVideoPlayerStore(state => state.videoFile);
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  const setPlayer = useVideoPlayerStore(state => state.setPlayer);
  const setStatus = useVideoPlayerStore(state => state.setStatus);
  const setIsPlaying = useVideoPlayerStore(state => state.setIsPlaying);
  const setIsEnded = useVideoPlayerStore(state => state.setIsEnded);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);
  const setBufferedPosition = useVideoPlayerStore(state => state.setBufferedPosition);
  const setDuration = useVideoPlayerStore(state => state.setDuration);

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

  return (
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
          <Text className="text-2 rounded bg-red-600/80 px-4 py-2 font-medium text-white">Произошла ошибка при загрузке видео {error?.message}</Text>
        </View>
      )}

      <View className="absolute h-full w-full items-center justify-center">
        <PlaybackControl />
      </View>

      <View className="absolute h-full w-full items-center justify-center">
        <SkipControl />
      </View>

      <View className="absolute h-full w-full items-end justify-start">
        <SettingsControl />
      </View>

      <View className={`absolute bottom-0 w-full ${isFullscreen ? "px-4" : "px-0"}`}>
        <View className="flex-row items-end justify-between px-4">
          <TimeLapsControl />
          <FullscreenControl />
        </View>

        <View className="w-full pb-1">
          <TimeLineControl />
        </View>
      </View>
    </View>
  );
};

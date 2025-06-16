import { useEffect } from "react";
import { Text, View } from "react-native";

import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";

import { useVideoPlayerStore } from "../models/store";
import { FullscreenControl, PlaybackControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  const videoUrl = useVideoPlayerStore(state => state.videoUrl);
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  const setPlayer = useVideoPlayerStore(state => state.setPlayer);
  const setStatus = useVideoPlayerStore(state => state.setStatus);
  const setIsPlaying = useVideoPlayerStore(state => state.setIsPlaying);
  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);
  const setPreviewTime = useVideoPlayerStore(state => state.setPreviewTime);
  const setDuration = useVideoPlayerStore(state => state.setDuration);

  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
    player.timeUpdateEventInterval = 0.1;
  });
  useEffect(() => { setPlayer(player); }, [player, setPlayer]);

  const { status } = useEvent(player, "statusChange", { status: player.status });
  useEffect(() => { setStatus(status); }, [status, setStatus]);

  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  useEffect(() => { setIsPlaying(isPlaying); }, [isPlaying, setIsPlaying]);

  const { currentTime } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: 0,
  });
  useEffect(() => {
    setCurrentTime(currentTime);
    setPreviewTime(currentTime);
  }, [currentTime, setCurrentTime, setPreviewTime]);

  const { duration } = useEvent(player, "sourceLoad", {
    duration: player.duration,
    videoSource: null,
    availableVideoTracks: [],
    availableSubtitleTracks: [],
    availableAudioTracks: [],
  });
  useEffect(() => { setDuration(duration); }, [duration, setDuration]);

  return (
    <View className="items-center justify-center bg-black">
      <View className={`relative ${isFullscreen ? "h-full" : "w-full"} aspect-video`}>
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

        {status === "error" && (
          <View className="absolute left-0 top-0 z-10 h-full w-full items-center justify-center">
            <Text className="text-2 rounded bg-red-600/80 px-4 py-2 font-medium text-white">Произошла ошибка при загрузке видео</Text>
          </View>
        )}

        <View className="absolute h-full w-full items-center justify-center px-3">
          <PlaybackControl />
        </View>

        <View className="absolute bottom-0 w-full">
          <View className="mb-1 flex-row items-end justify-between px-4">
            <TimeLapsControl />
            <FullscreenControl />
          </View>

          <View className="w-full pb-1">
            <TimeLineControl />
          </View>
        </View>
      </View>
    </View>
  );
};

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
  const setDuration = useVideoPlayerStore(state => state.setDuration);

  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
    player.timeUpdateEventInterval = 1;
  });
  useEffect(() => { setPlayer(player); }, [player, setPlayer]);

  const { status, error } = useEvent(player, "statusChange", { status: player.status });
  useEffect(() => { setStatus(status); }, [status, setStatus]);

  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  useEffect(() => { setIsPlaying(isPlaying); }, [isPlaying, setIsPlaying]);

  const { currentTime } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: 0,
  });
  useEffect(() => { setCurrentTime(currentTime); }, [currentTime, setCurrentTime]);

  const { duration } = useEvent(player, "sourceLoad", {
    duration: player.duration,
    videoSource: null,
    availableVideoTracks: [],
    availableSubtitleTracks: [],
    availableAudioTracks: [],
  });
  useEffect(() => { setDuration(duration); }, [duration, setDuration]);

  return (
    <View className="justify-center items-center bg-black">
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
          <View className="absolute top-0 left-0 w-full h-full justify-center items-center z-10">
            <Text className="text-white text-2 font-medium px-4 py-2 bg-red-600/80 rounded">Произошла ошибка при загрузке видео</Text>
          </View>
        )}

        <View className="absolute w-full h-full justify-center items-center px-3">
          <PlaybackControl />
        </View>

        <View className="absolute bottom-0 w-full">
          <View className="flex-row justify-between items-end px-4 mb-1">
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

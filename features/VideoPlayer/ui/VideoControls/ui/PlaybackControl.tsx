import { ActivityIndicator, TouchableOpacity, View } from "react-native";

import PlayIcon from "@expo/vector-icons/FontAwesome5";
import PauseIcon from "@expo/vector-icons/Fontisto";
import ReplayIcon from "@expo/vector-icons/MaterialIcons";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const PlaybackControl = () => {
  const status = useVideoPlayerStore(state => state.status);

  const isPlaying = useVideoPlayerStore(state => state.isPlaying);
  const onPlayback = useVideoPlayerStore(state => state.onPlayback);
  const onReplay = useVideoPlayerStore(state => state.onReplay);

  const isEnded = useVideoPlayerStore(state => state.isEnded);
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  return (
    <View className={`${isFullscreen ? "h-20 w-20" : "h-14 w-14"} rounded-full bg-black/40`}>
      {status === "readyToPlay" ? (
        isPlaying ? (
          <TouchableOpacity onPress={onPlayback} className="flex h-full w-full items-center justify-center">
            <PauseIcon name="pause" size={isFullscreen ? 26 : 20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlayback} className="flex h-full w-full items-center justify-center">
            <PlayIcon className="translate-x-[1.5] translate-y-[0.5]" name="play" size={isFullscreen ? 26 : 20} color="white" />
          </TouchableOpacity>
        )
      ) : (
        status === "idle" &&
        (isEnded ? (
          <TouchableOpacity onPress={onReplay} className="flex h-full w-full items-center justify-center">
            <ReplayIcon name="replay" size={isFullscreen ? 38 : 32} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPlayback} className="flex h-full w-full items-center justify-center">
            <PlayIcon className="translate-x-[1.5] translate-y-[0.5]" name="play" size={isFullscreen ? 26 : 20} color="white" />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};

import { ActivityIndicator, TouchableOpacity, View} from "react-native";

import PlayIcon from "@expo/vector-icons/FontAwesome5";
import PauseIcon from "@expo/vector-icons/Fontisto";
import ReplayIcon from '@expo/vector-icons/MaterialIcons';
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const PlaybackControl = () => {
  const player = useVideoPlayerStore(state => state.player)
  const isPlaying = useVideoPlayerStore(state => state.isPlaying)
  const status = useVideoPlayerStore(state => state.status)
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen)

  const onPlaybackPress = () => {
    if (isPlaying) player?.pause();
    else player?.play();
  };

  const onReplayPress = () => {
    player?.replay();
  };

  return (
    <View className={`${isFullscreen ? "h-16 w-16" : "h-12 w-12"} rounded-full bg-black/40`}>
        {
        status === "readyToPlay" 
        ? isPlaying 
          ? <TouchableOpacity onPress={onPlaybackPress} className="flex h-full w-full items-center justify-center"><PauseIcon name="pause" size={isFullscreen ? 26 : 20} color="white" /></TouchableOpacity>
          : <TouchableOpacity onPress={onPlaybackPress} className="flex h-full w-full items-center justify-center"><PlayIcon className="translate-x-[1.5] translate-y-[0.5]" name="play" size={isFullscreen ? 26 : 20} color="white" /></TouchableOpacity>
        : status === "idle" ? <TouchableOpacity onPress={onReplayPress} className="flex h-full w-full items-center justify-center"><ReplayIcon name="replay" size={isFullscreen ? 38 : 32} color="white" /></TouchableOpacity>
        : status === "loading" && <TouchableOpacity className="flex h-full w-full items-center justify-center"><ActivityIndicator size={isFullscreen ? 38 : 32} color="white" /></TouchableOpacity>
        }
    </View>
  );
};

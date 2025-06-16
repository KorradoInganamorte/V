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
    <TouchableOpacity>
      <View className={`flex justify-center items-center ${isFullscreen ? "w-16 h-16" : "w-12 h-12"} bg-black/40 rounded-full`}>
        {
        status === "readyToPlay" 
        ? isPlaying 
          ? <PauseIcon onPress={onPlaybackPress} name="pause" size={isFullscreen ? 26 : 20} color="white" />
          : <PlayIcon onPress={onPlaybackPress} className="translate-x-[1.5] translate-y-[0.5]" name="play" size={isFullscreen ? 26 : 20} color="white" />
        : status === "idle" ? <ReplayIcon onPress={onReplayPress} name="replay" size={isFullscreen ? 38 : 32} color="white" />
        : status === "loading" && <ActivityIndicator size={isFullscreen ? 38 : 32} color="white" />
        }
      </View>
    </TouchableOpacity>
  );
};

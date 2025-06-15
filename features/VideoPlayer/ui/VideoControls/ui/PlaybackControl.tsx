import { ActivityIndicator, TouchableOpacity, View} from "react-native";

import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";

import PlayIcon from "@expo/vector-icons/FontAwesome5";
import PauseIcon from "@expo/vector-icons/Fontisto";
import ReplayIcon from '@expo/vector-icons/MaterialIcons';

type PlaybackControlProps = {
  player: VideoPlayer;
};

export const PlaybackControl = ({ player }: PlaybackControlProps) => {
  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });
  const { status } = useEvent(player, "statusChange", { status: player.status })

  const onPlaybackPress = () => {
    if (isPlaying) player.pause();
    else player.play();
  };

  const onReplayPress = () => {
    player.replay();
  };

  return (
    <TouchableOpacity>
      <View className="flex justify-center items-center w-12 h-12 bg-black/40 rounded-full">
        {
        status === "readyToPlay" 
          ? isPlaying 
            ? <PauseIcon onPress={onPlaybackPress} name="pause" size={20} color="white" />
            : <PlayIcon onPress={onPlaybackPress} className="translate-x-[1.5] translate-y-[0.5]" name="play" size={20} color="white" />
        : status === "idle" ? <ReplayIcon onPress={onReplayPress} name="replay" size={32} color="white" />
        : status === "loading" && <ActivityIndicator size={32} color="white" />
        }
      </View>
    </TouchableOpacity>
  );
};

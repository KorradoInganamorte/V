import { TouchableOpacity, View } from "react-native";
import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";

import PlayIcon from "@expo/vector-icons/FontAwesome5";
import PauseIcon from "@expo/vector-icons/Fontisto";

type PlaybackControlProps = {
  player: VideoPlayer;
};

export const PlaybackControl = ({ player }: PlaybackControlProps) => {
  const { isPlaying } = useEvent(player, "playingChange", { isPlaying: player.playing });

  const onPlaybackPress = () => {
    if (isPlaying) player.pause();
    else player.play();
  };

  return (
    <TouchableOpacity onPress={onPlaybackPress}>
      <View className="flex justify-center items-center w-12 h-12 bg-black/40 rounded-full">
        {isPlaying ? (
          <PauseIcon name="pause" size={20} color="white" />
        ) : (
          <PlayIcon className="translate-x-[1.5] translate-y-[0.5]" name="play" size={20} color="white" />
        )}
      </View>
    </TouchableOpacity>
  );
};

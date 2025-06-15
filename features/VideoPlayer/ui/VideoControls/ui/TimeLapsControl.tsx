import { Text, View } from "react-native";

import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";
import { formattedTime } from "../utils";

type TimeLapsControlProps = { player: VideoPlayer };

export const TimeLapsControl = ({ player }: TimeLapsControlProps) => {
  const { currentTime } = useEvent(player, "timeUpdate", {
    currentTime: player.currentTime,
    currentLiveTimestamp: null,
    currentOffsetFromLive: null,
    bufferedPosition: 0,
  });

  const { duration } = useEvent(player, "sourceLoad", {
    duration: player.duration,
    videoSource: null,
    availableVideoTracks: [],
    availableSubtitleTracks: [],
    availableAudioTracks: [],
  });

  return (
    <View>
      <Text className="text-white text-xs">
        {formattedTime(currentTime || 0)} / {formattedTime(duration || 0)}
      </Text>
    </View>
  );
};

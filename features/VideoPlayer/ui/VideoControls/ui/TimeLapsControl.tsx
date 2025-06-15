import { Text, View } from "react-native";

import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";

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
        {formatTime(currentTime || 0)} / {formatTime(duration || 0)}
      </Text>
    </View>
  );
};

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

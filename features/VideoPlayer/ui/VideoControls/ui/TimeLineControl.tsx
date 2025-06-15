import { View } from "react-native";

import { useEvent } from "expo";
import { VideoPlayer } from "expo-video";

import Slider from "@react-native-community/slider";

type TimeLineControlProps = { player: VideoPlayer };

export const TimeLineControl = ({ player }: TimeLineControlProps) => {
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
    <View className="flex-col items-center w-full">
      <Slider
        style={{ width: "100%" }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime || 0}
        minimumTrackTintColor="#fff"
        maximumTrackTintColor="#888"
        thumbTintColor="#fff"
        onSlidingComplete={value => player.seekBy(value)}
      />
    </View>
  );
};

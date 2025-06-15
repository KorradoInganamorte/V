import { View } from "react-native";

import Slider from "@react-native-community/slider";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player)

  const currentTime = useVideoPlayerStore(state => state.currentTime)
  const duration = useVideoPlayerStore(state => state.duration)

  return (
    <View className="flex-col items-center w-full">
      <Slider
        style={{ width: "100%" }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime || 0}
        minimumTrackTintColor="#ED0000"
        maximumTrackTintColor="#ffffff"
        thumbTintColor="#ED0000"
        onSlidingComplete={value => player?.seekBy(value)}
      />
    </View>
  );
};

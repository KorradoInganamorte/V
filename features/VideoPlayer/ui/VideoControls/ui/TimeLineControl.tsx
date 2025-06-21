import { View } from "react-native";

import Slider from "@react-native-community/slider";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const TimeLineControl = () => {
  const player = useVideoPlayerStore(state => state.player)

  const currentTime = useVideoPlayerStore(state => state.currentTime)
  const duration = useVideoPlayerStore(state => state.duration)

  const isSliding = useVideoPlayerStore(state => state.isSliding)
  const setIsSliding = useVideoPlayerStore(state => state.setIsSliding)

  return (
    <View className="w-full flex-col items-center">
      <Slider
        style={{ width: "100%" }}
        minimumValue={0}
        maximumValue={duration || 1}
        value={currentTime || 0}
        minimumTrackTintColor="#ED0000"
        maximumTrackTintColor="#ffffff"
        thumbTintColor="#ED0000"
        onSlidingStart={() => {
          player?.pause()
          setIsSliding(true)
        }}
        onValueChange={(value) => isSliding && player?.seekBy(value - player.currentTime)}
        onSlidingComplete={value => {
          player?.seekBy(value - player.currentTime)
          player?.play()
          setIsSliding(false)
        }}
      />
    </View>
  );
};

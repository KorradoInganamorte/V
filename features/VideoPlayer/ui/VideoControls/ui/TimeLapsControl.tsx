import { Text, View } from "react-native";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";
import { formattedTime } from "../utils";

export const TimeLapsControl = () => {
  const currentTime = useVideoPlayerStore(state => state.currentTime)
  const duration = useVideoPlayerStore(state => state.duration)

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen)

  return (
    <View>
      <Text className={`text-white ${isFullscreen ? "text-xs" : "text-xs"}`}>
        {formattedTime(currentTime || 0)} / {formattedTime(duration || 0)}
      </Text>
    </View>
  );
};

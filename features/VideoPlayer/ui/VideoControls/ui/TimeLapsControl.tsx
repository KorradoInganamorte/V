import { Text, View } from "react-native";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";
import { formattedTime } from "../utils";

export const TimeLapsControl = () => {
  const previewTime = useVideoPlayerStore(state => state.previewTime)
  const duration = useVideoPlayerStore(state => state.duration)

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen)

  return (
    <View>
      <Text className={`text-white ${isFullscreen ? "text-sm" : "text-xs"}`}>
        {formattedTime(previewTime || 0)} / <Text className="text-slate-300">{formattedTime(duration || 0)}</Text>
      </Text>
    </View>
  );
};

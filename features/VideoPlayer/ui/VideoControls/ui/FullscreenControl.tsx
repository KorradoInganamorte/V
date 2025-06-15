import { TouchableOpacity, View } from "react-native";
import { VideoView } from "expo-video";

import ExpandIcon from "@expo/vector-icons/FontAwesome6";
import CollapseIcon from "@expo/vector-icons/MaterialCommunityIcons";

type FullscreenControlProps = {
  videoRef: React.RefObject<VideoView | null>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FullscreenControl = ({ videoRef, isFullscreen, setIsFullscreen }: FullscreenControlProps) => {
  const onEnterFullscreen = async () => {
    await videoRef.current?.enterFullscreen();
    setIsFullscreen(true);
  };

  const onExitFullscreen = async () => {
    await videoRef.current?.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <View className="relative">
      <TouchableOpacity onPress={() => (isFullscreen ? onExitFullscreen() : onEnterFullscreen())}>
        {isFullscreen ? (
          <CollapseIcon name="arrow-collapse" size={24} color="white" />
        ) : (
          <ExpandIcon name="expand" size={24} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

import { TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { VideoView } from "expo-video";


import ExpandIcon from "@expo/vector-icons/FontAwesome6";
import CollapseIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { changeScreenOrientation } from "@/shared/utils";

type FullscreenControlProps = {
  videoRef: React.RefObject<VideoView | null>;
  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FullscreenControl = ({ videoRef, isFullscreen, setIsFullscreen }: FullscreenControlProps) => {
  const navigation = useNavigation()
  
  const onEnterFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    navigation.setOptions({ headerShown: false })
    setIsFullscreen(true);
  };

  const onExitFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    navigation.setOptions({ headerShown: true })
    setIsFullscreen(false);
  };

  return (
    <TouchableOpacity onPress={() => (isFullscreen ? onExitFullscreen() : onEnterFullscreen())}>
      {isFullscreen ? <CollapseIcon name="arrow-collapse" size={20} color="white" /> : <ExpandIcon name="expand" size={20} color="white" />}
    </TouchableOpacity>
  );
};

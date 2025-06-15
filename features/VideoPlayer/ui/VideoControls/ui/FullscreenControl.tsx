import { TouchableOpacity } from "react-native";

import { useNavigation } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";

import ExpandIcon from "@expo/vector-icons/FontAwesome6";
import CollapseIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { changeScreenOrientation } from "@/shared/utils";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const FullscreenControl = () => {
  const navigation = useNavigation()

  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen)
  const changeFullscreen = useVideoPlayerStore(state => state.changeFullscreen)
  
  const onEnterFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    navigation.setOptions({ headerShown: false })
    changeFullscreen(true);
  };

  const onExitFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    navigation.setOptions({ headerShown: true })
    changeFullscreen(false);
  };

  return (
    <TouchableOpacity onPress={() => (isFullscreen ? onExitFullscreen() : onEnterFullscreen())}>
      {isFullscreen ? <CollapseIcon name="arrow-collapse" size={isFullscreen ? 20 : 20} color="white" /> : <ExpandIcon name="expand" size={isFullscreen ? 20 : 20} color="white" />}
    </TouchableOpacity>
  );
};

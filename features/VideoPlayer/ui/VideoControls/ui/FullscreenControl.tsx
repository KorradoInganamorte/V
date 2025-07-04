import { StatusBar, TouchableOpacity } from "react-native";

import * as NavigationBar from 'expo-navigation-bar';
import * as ScreenOrientation from "expo-screen-orientation";

import ExpandIcon from "@expo/vector-icons/FontAwesome6";
import CollapseIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";
import { changeScreenOrientation } from "@/shared/utils";

export const FullscreenControl = () => {
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen)
  const changeFullscreen = useVideoPlayerStore(state => state.changeFullscreen)
  
  const onEnterFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
    await NavigationBar.setVisibilityAsync('hidden');

    setTimeout(() => {
      StatusBar.setHidden(true, 'fade');
    }, 100)

    changeFullscreen(true);
  };

  const onExitFullscreen = async () => {
    await changeScreenOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    await NavigationBar.setVisibilityAsync('visible');

    setTimeout(() => {
      StatusBar.setHidden(false, 'fade');
    }, 100)

    changeFullscreen(false);
  };

  return (
    <TouchableOpacity className="flex h-8 w-8 items-center justify-center" onPress={() => (isFullscreen ? onExitFullscreen() : onEnterFullscreen())}>
      {isFullscreen ? <CollapseIcon name="arrow-collapse" size={24} color="white" /> : <ExpandIcon name="expand" size={14} color="white" />}
    </TouchableOpacity>
  );
};

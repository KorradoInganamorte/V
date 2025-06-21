import React from "react";
import { TouchableOpacity, View } from "react-native";

import SettingsIcon from "@expo/vector-icons/Ionicons";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

type SettingsControlProps = {
  openSettings: () => void
}

export const SettingsControl = ({ openSettings }: SettingsControlProps) => {
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  return (
    <>
      <View className={`${isFullscreen ? "h-16 w-16" : "h-12 w-12"}`}>
        <TouchableOpacity onPress={openSettings} className="h-full w-full items-center justify-center">
          <SettingsIcon name="settings-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

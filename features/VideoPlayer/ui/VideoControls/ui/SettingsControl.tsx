import React from "react";
import { TouchableOpacity, View } from "react-native";

import SettingsIcon from "@expo/vector-icons/Ionicons";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

type SettingsControlProps = {
  openSettings: () => void;
};

export const SettingsControl = ({ openSettings }: SettingsControlProps) => {
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  return (
      <View className="h-8 w-8">
        <TouchableOpacity onPress={openSettings} className="h-full w-full items-center justify-center">
          <SettingsIcon name="settings-outline" size={isFullscreen ? 26 : 22} color="white" />
        </TouchableOpacity>
      </View>
  );
};

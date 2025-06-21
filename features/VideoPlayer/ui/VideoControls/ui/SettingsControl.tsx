import React from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const SettingsControl = () => {
  const isFullscreen = useVideoPlayerStore(state => state.isFullscreen);

  return (
    <>
      <View className={`${isFullscreen ? "h-16 w-16" : "h-12 w-12"}`}>
        <TouchableOpacity className="h-full w-full items-center justify-center">
          <Ionicons name="settings-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

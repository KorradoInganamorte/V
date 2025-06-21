import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { VideoPlayer } from "@/features/VideoPlayer";

import "./global.css";

export default function App() {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-zinc-900">
        <VideoPlayer />
      </View>
    </GestureHandlerRootView>
  );
}
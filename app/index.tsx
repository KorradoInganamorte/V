import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as SystemUI from 'expo-system-ui';

import { VideoPlayer } from "@/features/VideoPlayer";

import "./global.css";

SystemUI.setBackgroundColorAsync('black');

export default function App() {
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-zinc-900">
        <StatusBar />

        <VideoPlayer />
      </View>
    </GestureHandlerRootView>
  );
}
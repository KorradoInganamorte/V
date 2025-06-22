import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { Ionicons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Fontisto, FontAwesome5 } from '@expo/vector-icons';

import { VideoPlayer } from "@/features/VideoPlayer";

import "./global.css";

SystemUI.setBackgroundColorAsync('black');

export default function App() {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        ...FontAwesome6,
        ...FontAwesome5,
        ...MaterialIcons.font,
        ...Fontisto.font
      });
      await SplashScreen.hideAsync();
    }
    prepare();
  }, []);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-zinc-900">
        <StatusBar />

        <VideoPlayer />
      </View>
    </GestureHandlerRootView>
  );
}
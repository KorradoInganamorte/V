import { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { Ionicons, MaterialCommunityIcons, FontAwesome6, MaterialIcons, Fontisto, FontAwesome5 } from '@expo/vector-icons';

import { VideoPlayer } from "@/features/VideoPlayer";

import "./global.css";

SystemUI.setBackgroundColorAsync('black');
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    ...Ionicons.font,
    ...MaterialCommunityIcons.font,
    ...FontAwesome5.font,
    ...FontAwesome6.font,
    ...MaterialIcons.font,
    ...Fontisto.font,

    'Montserrat-Bold': require('@/assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Medium': require('@/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-Regular': require('@/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('@/assets/fonts/Montserrat-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-zinc-900">
        <StatusBar />

        <VideoPlayer />
      </View>
    </GestureHandlerRootView>
  );
}
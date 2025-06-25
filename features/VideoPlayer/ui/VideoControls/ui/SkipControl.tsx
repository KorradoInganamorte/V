import { useRef, useState } from "react";
import { Animated, View, Text, Easing } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import Icons from "@expo/vector-icons/AntDesign";

import { useVideoPlayerStore } from "@/features/VideoPlayer/models/store";

export const SkipControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const setCurrentTime = useVideoPlayerStore(state => state.setCurrentTime);

  const [showLeftAnimated, setShowLeftAnimated] = useState(false);
  const [showRightAnimated, setShowRightAnimated] = useState(false);

  const leftOpacity = useRef(new Animated.Value(0)).current;
  const rightOpacity = useRef(new Animated.Value(0)).current;

  const onLeftAnimated = () => {
    setShowLeftAnimated(true);
    Animated.sequence([
      Animated.timing(leftOpacity, { toValue: 1, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
      Animated.timing(leftOpacity, { toValue: 0, duration: 600, useNativeDriver: true, easing: Easing.in(Easing.ease) }),
    ]).start(() => setShowLeftAnimated(false));
  };

  const onRightAnimated = () => {
    setShowRightAnimated(true);
    Animated.sequence([
      Animated.timing(rightOpacity, { toValue: 1, duration: 200, useNativeDriver: true, easing: Easing.out(Easing.ease) }),
      Animated.timing(rightOpacity, { toValue: 0, duration: 600, useNativeDriver: true, easing: Easing.in(Easing.ease) }),
    ]).start(() => setShowRightAnimated(false));
  };

  const handleSeekLeft = () => {
    if(player) setCurrentTime(player.currentTime += -10)
    onLeftAnimated();
  };
  const handleSeekRight = () => {
    if(player) setCurrentTime(player.currentTime += 10)
    onRightAnimated();
  };

  const doubleTapLeft = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => runOnJS(handleSeekLeft)());

  const doubleTapRight = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => runOnJS(handleSeekRight)());

  return (
    <View className="flex h-full w-full flex-row justify-between">
      <View className="h-full w-1/3 items-center justify-center">
        {showLeftAnimated && (
          <Animated.View
            className="h-full w-full items-center justify-center bg-black/50"
            style={{
              opacity: leftOpacity,
              borderTopRightRadius: 200,
              borderBottomRightRadius: 200,
            }}
          >
            <Icons name="banckward" size={24} color="white" />
            <Text className="mt-2 text-lg font-bold text-white">-10 сек</Text>
          </Animated.View>
        )}
      </View>
      <GestureDetector gesture={doubleTapLeft}>
        <View className="absolute left-0 h-full w-2/12"></View>
      </GestureDetector>

      <View className="h-full w-1/3 items-center justify-center">
        {showRightAnimated && (
          <Animated.View
            className="h-full w-full items-center justify-center bg-black/50"
            style={{
              opacity: rightOpacity,
              borderTopLeftRadius: 200,
              borderBottomLeftRadius: 200,
            }}
          >
            <Icons name="forward" size={24} color="white" />
            <Text className="mt-2 text-lg font-bold text-white">+10 сек</Text>
          </Animated.View>
        )}
      </View>
      <GestureDetector gesture={doubleTapRight}>
        <View className="absolute right-0 h-full w-2/12"></View>
      </GestureDetector>
    </View>
  );
};

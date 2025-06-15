import React, { useState, useRef } from "react";
import { View, ActivityIndicator } from "react-native";

import { useVideoPlayer, VideoView } from "expo-video";

import { FullscreenControl, PlaybackControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  const [videoUrl] = useState<string>("https://openings.moe/video/HigurashiNoNakuKoroNi-OP01-NCBD.mp4");
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
    player.timeUpdateEventInterval = 1;
  });

  const videoRef = useRef<VideoView>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <>
      {videoUrl ? (
        <View className="relative w-full aspect-video">
          <VideoView
            ref={videoRef}
            style={{ width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.1)", borderRadius: 10 }}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
            nativeControls={false}
          />

          {/* Пауза/Воспроизведение */}
          <View className="absolute w-full h-full justify-center items-center px-3">
            <PlaybackControl player={player} />
          </View>

          {/* Нижние элементы управления */}
          <View className="absolute bottom-0 w-full">
            {/* Верхний ряд: время и fullscreen */}
            <View className="flex-row justify-between items-end px-4 mb-1">
              <TimeLapsControl player={player} />
              <FullscreenControl videoRef={videoRef} isFullscreen={isFullscreen} setIsFullscreen={setIsFullscreen} />
            </View>
            {/* Нижний ряд: таймлайн */}
            <View className="w-full pb-1">
              <TimeLineControl player={player} />
            </View>
          </View>
        </View>
      ) : (
        <View className="absolute w-full h-full justify-center items-center px-3">
          <View className="flex justify-center items-center w-12 h-12 bg-black/40 rounded-full">
            <ActivityIndicator size={32} color="white" />
          </View>
        </View>
      )}
    </>
  );
};

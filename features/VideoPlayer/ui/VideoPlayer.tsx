import { View, Text } from "react-native";
import { useState, useRef } from "react";
import { useVideoPlayer, VideoView } from "expo-video";

import { FullscreenControl, PlaybackControl, TimeLapsControl, TimeLineControl } from "./VideoControls";

export const VideoPlayer = () => {
  const [videoUrl] = useState<string>("https://openings.moe/video/HigurashiNoNakuKoroNi-OP01-NCBD.mp4");
  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
    player.timeUpdateEventInterval = 1
  });

  const videoRef = useRef<VideoView>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-gray-100 p-2">
      <View className="relative w-full aspect-video bg-black/10 mb-4 rounded-lg overflow-hidden">
        {videoUrl ? (
          <View className="w-full h-full">
            <VideoView
              onFullscreenEnter={() => setIsFullscreen(true)}
              onFullscreenExit={() => setIsFullscreen(false)}
              ref={videoRef}
              className="w-full h-full"
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
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-base">Вставьте ссылку на видео</Text>
          </View>
        )}
      </View>
    </View>
  );
};

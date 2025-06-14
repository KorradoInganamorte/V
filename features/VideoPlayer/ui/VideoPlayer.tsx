import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useState, useRef } from "react";

export const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://edge-msk-1.kinescopecdn.net/77217fe6-cdff-44c4-ae0c-45ad299df39d/videos/17459766-6735-461b-82b4-91d7356ac3c2/mp4/01975e6b-cd2d-724d-8ae3-0d1a00df0001/01975e6b-c025-767c-aeb5-2ce42df5ad82.mp4"
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<VideoView>(null);

  const player = useVideoPlayer(videoUrl, player => {
    player.loop = false;
  });

  const { status } = useEvent(player, "statusChange", { status: player.status });

  const handlePlay = () => {
    if (videoUrl) {
      setIsPlaying(true);
      player.play();
    }
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="w-full aspect-video bg-black mb-4 rounded-lg overflow-hidden">
        {isPlaying && videoUrl ? (
          <VideoView 
            ref={videoRef}
            className="w-full h-full" 
            player={player} 
            allowsFullscreen 
            allowsPictureInPicture 
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-white text-base">Введите ссылку на видео</Text>
          </View>
        )}
      </View>

      <View className="space-y-3">
        <TextInput
          className="bg-white p-3 rounded-lg border border-gray-200"
          placeholder="Вставьте ссылку на видео"
          value={videoUrl}
          onChangeText={setVideoUrl}
          autoCapitalize="none"
        />
        <View className="flex-row space-x-3">
          <TouchableOpacity 
            className="flex-1 bg-blue-500 p-3 rounded-lg items-center"
            onPress={handlePlay}
          >
            <Text className="text-white text-base font-semibold">
              {status === "readyToPlay" ? "Воспроизвести" : "Загрузка..."}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

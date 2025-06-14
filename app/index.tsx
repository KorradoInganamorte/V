import { View } from "react-native";
import { VideoPlayer } from "@/features/VideoPlayer";

import "./global.css"

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <VideoPlayer />
    </View>
  );
}

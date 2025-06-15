import { VideoPlayer, VideoPlayerStatus } from "expo-video";
import { create } from "zustand"

type VideoPlayerState = {
  player: VideoPlayer | null
  setPlayer: (player: VideoPlayer) => void

  status: VideoPlayerStatus
  setStatus: (status: VideoPlayerStatus) => void

  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void

  currentTime: number
  setCurrentTime: (currentTime: number) => void

  duration: number
  setDuration: (duration: number) => void

  videoUrl: string

  isFullscreen: boolean;
  changeFullscreen: (isFullscreen: boolean) => void;
};

export const useVideoPlayerStore = create<VideoPlayerState>((set) => ({
  player: null,
  setPlayer: (player) => set({ player: player }),

  status: "loading",
  setStatus: (status) => set({ status: status }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),

  currentTime: 0,
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),

  duration: 0,
  setDuration: (duration: number) => set({ duration: duration }),

  videoUrl: "https://openings.moe/video/HigurashiNoNakuKoroNi-OP01-NCBD.mp4",

  isFullscreen: false,
  changeFullscreen: (isFullscreen) => set({ isFullscreen: isFullscreen })
}))
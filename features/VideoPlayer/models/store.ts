import { VideoPlayer, VideoPlayerStatus } from "expo-video";
import { create } from "zustand"
type VideoPlayerState = {
  player: VideoPlayer | null
  setPlayer: (player: VideoPlayer) => void

  status: VideoPlayerStatus
  setStatus: (status: VideoPlayerStatus) => void

  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void

  isEnded: boolean
  setIsEnded: (isEnded: boolean) => void

  currentTime: number
  setCurrentTime: (currentTime: number) => void
  previewTime: number;
  setPreviewTime: (previewTime: number) => void;

  isSliding: boolean
  setIsSliding: (isSliding: boolean) => void

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

  isEnded: false,
  setIsEnded: (isEnded) => set({ isEnded: isEnded }),

  currentTime: 0,
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),
  previewTime: 0,
  setPreviewTime: (previewTime) => set({ previewTime: previewTime }),

  isSliding: false,
  setIsSliding: (isSliding) => set({ isSliding: isSliding }),

  duration: 0,
  setDuration: (duration: number) => set({ duration: duration }),

  videoUrl: "https://openings.moe/video/HigurashiNoNakuKoroNi-OP01-NCBD.mp4",

  isFullscreen: false,
  changeFullscreen: (isFullscreen) => set({ isFullscreen: isFullscreen })
}))
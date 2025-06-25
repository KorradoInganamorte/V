import { VideoPlayer, VideoPlayerStatus } from "expo-video";
import { create } from "zustand"

type VideoPlayerState = {
  player: VideoPlayer | null
  setPlayer: (player: VideoPlayer) => void

  status: VideoPlayerStatus
  setStatus: (status: VideoPlayerStatus) => void

  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void
  onPlayback: () => void
  onReplay: () => void

  isEnded: boolean
  setIsEnded: (isEnded: boolean) => void

  currentTime: number
  setCurrentTime: (currentTime: number) => void

  bufferedPosition: number
  setBufferedPosition: (bufferedPosition: number) => void

  isSliding: boolean
  setIsSliding: (isSliding: boolean) => void

  duration: number
  setDuration: (duration: number) => void

  videoUrl: string
  videoFile: any

  isFullscreen: boolean;
  changeFullscreen: (isFullscreen: boolean) => void;

  isVisibleControls: boolean
  setIsVisibleControls: (isVisibleControls: boolean) => void

  isOpenSettings: boolean
  setIsOpenSettings: (isOpenSettings: boolean) => void
};

export const useVideoPlayerStore = create<VideoPlayerState>((set, get) => ({
  player: null,
  setPlayer: (player) => set({ player: player }),

  status: "loading",
  setStatus: (status) => set({ status: status }),

  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying: isPlaying }),
  onPlayback: () => {
    const player = get().player;
    const isPlaying = get().isPlaying;

    if (isPlaying) player?.pause();
    else player?.play();
  },
  onReplay: () => {
    const player = get().player;

    player?.replay();
    set({ isEnded: false })
  },

  isEnded: false,
  setIsEnded: (isEnded) => set({ isEnded: isEnded }),

  currentTime: 0,
  setCurrentTime: (currentTime) => set({ currentTime: currentTime }),

  isSliding: false,
  setIsSliding: (isSliding) => set({ isSliding: isSliding }),

  bufferedPosition: 0,
  setBufferedPosition: (bufferedPosition) => set({ bufferedPosition: bufferedPosition }),

  duration: 0,
  setDuration: (duration: number) => set({ duration: duration }),

  videoUrl: "https://openings.moe/video/HigurashiNoNakuKoroNi-OP01-NCBD.mp4",
  videoFile: require('@/assets/videos/ToriNoUta.mp4'),

  isFullscreen: false,
  changeFullscreen: (isFullscreen: boolean) => set({ isFullscreen: isFullscreen }),

  isVisibleControls: false,
  setIsVisibleControls: (isVisibleControls: boolean) => set({ isVisibleControls: isVisibleControls }),

  isOpenSettings: false,
  setIsOpenSettings: (isOpenSettings: boolean) => set({ isOpenSettings: isOpenSettings })
}))
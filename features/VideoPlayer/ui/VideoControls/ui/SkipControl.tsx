import { useVideoPlayerStore } from '@/features/VideoPlayer/models/store';
import { View } from 'react-native'
import { runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export const SkipControl = () => {
  const player = useVideoPlayerStore(state => state.player);

  const handleSeekLeft = () => player?.seekBy(-10);
  const handleSeekRight = () => player?.seekBy(10);

  const doubleTapLeft = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => runOnJS(handleSeekLeft)());

  const doubleTapRigth = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => runOnJS(handleSeekRight)());

  return (
    <View className='flex h-full w-full flex-row justify-between'>
      <GestureDetector gesture={doubleTapLeft}><View className='h-full w-1/3 bg-slate-800'></View></GestureDetector>
      <GestureDetector gesture={doubleTapRigth}><View className='h-full w-1/3 bg-slate-800'></View></GestureDetector>
    </View>
  )
}
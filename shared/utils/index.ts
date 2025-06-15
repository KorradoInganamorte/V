import * as ScreenOrientation from "expo-screen-orientation";

export const changeScreenOrientation = async (orientation: ScreenOrientation.OrientationLock) => {
  await ScreenOrientation.lockAsync(orientation);
};

export const unlockScreenOrientation = async () => {
  await ScreenOrientation.unlockAsync();
};
import { useEffect } from "react";
import { OrientationLock } from "expo-screen-orientation";
import * as ScreenOrientation from "expo-screen-orientation";
import { useWindowDimensions } from "react-native";

/**
 * Hook that holds the screen orientation logic. After the umounting this hook will unlock the orientation, unless you pass the second param of this functon.
 * 
* @param orientation optional enum which sets the screen orientation, it can be from the following types: ```DEFAULT = 0,
    ALL = 1,
    PORTRAIT = 2,
    PORTRAIT_UP = 3,
    PORTRAIT_DOWN = 4,
    LANDSCAPE = 5,
    LANDSCAPE_LEFT = 6,
    LANDSCAPE_RIGHT = 7,
    OTHER = 8,
    UNKNOWN = 9```.
* If you don't need to change orientation lock, and just need the information about the current orientation of the device, don't pass any param to this hook or 
* just pass the first param with ```UNKNOWN``` value, that way the locking/unlocking proccess is ignored.
* @param orientationAfterUnmouting optional enum which sets the screen orientation after the component is unmounted. It has the same options has ```orientation``` have.
* @returns an object with useful information about the current device orientation, since this hook uses the current device dimensions, the information about
* orientation is provided instantly, not requiring an async call with [@expo-orientation](https://docs.expo.dev/versions/latest/sdk/screen-orientation/#screenorientationgetorientationasync) lib.
* The downside is that it can't determinate precisely if the current orientation is landscape-right/landscape-left or
* portrait-up/portrait-down, that way this hook will only return one of these two orientation types from
* [@expo-orientation ```Orientation```](https://docs.expo.dev/versions/latest/sdk/screen-orientation/#screenorientationorientation) prop: ```PORTRAIT_UP``` or ```LANDSCAPE_LEFT```.  
* @see [@expo-orientation](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)
* @author andr30z
**/
export function useScreenOrientation(
  orientation?: OrientationLock,
  orientationAfterUnmouting?: OrientationLock
) {
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (!orientation || orientation === ScreenOrientation.OrientationLock.UNKNOWN) return;
    ScreenOrientation.lockAsync(orientation);
    return () => {
      if (orientationAfterUnmouting)
        ScreenOrientation.lockAsync(orientationAfterUnmouting);
      else ScreenOrientation.unlockAsync();
    };
  }, [orientation]);

  return {
    currentOrientation:
      height >= width
        ? ScreenOrientation.Orientation.PORTRAIT_UP
        : ScreenOrientation.Orientation.LANDSCAPE_LEFT,
  };
}

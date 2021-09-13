import { OrientationLock } from "expo-screen-orientation";
import { useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

/**
 * Hook that holds the screen orientation logic. After the umounting this hook will unlock the orientation, unless you pass the second param of this functon.
 * 
* @param orientation enum which sets the screen orientation, it can be from the following types: ```DEFAULT = 0,
    ALL = 1,
    PORTRAIT = 2,
    PORTRAIT_UP = 3,
    PORTRAIT_DOWN = 4,
    LANDSCAPE = 5,
    LANDSCAPE_LEFT = 6,
    LANDSCAPE_RIGHT = 7,
    OTHER = 8,
    UNKNOWN = 9```.
* @param orientationAfterUnmouting optional enum which sets the screen orientation after the component is unmounted. It has the same options has ```orientation``` have.
* @see [@expo-orientation](https://docs.expo.dev/versions/latest/sdk/screen-orientation/)
* @author andr3z0
**/
export function useScreenOrientation(
  orientation: OrientationLock,
  orientationAfterUnmouting?: OrientationLock
) {
  useEffect(() => {
    ScreenOrientation.lockAsync(orientation);
    return () => {
      if (orientationAfterUnmouting)
        ScreenOrientation.lockAsync(orientationAfterUnmouting);
      else ScreenOrientation.unlockAsync();
    };
  }, [orientation]);
}

import { useCallback, useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * React Hook that handle the device's back button
 * @param allow boolean value to indicate wheater back button is allowed
 * @param callback optional callback function, just in case you need to make some stuff before deciding if the user should be able to use the back button
 * @author andr30z
 **/
export function useBackHandler(allow?: boolean, callback?: () => boolean | null | undefined) {
  const backPress = () => {
    return callback ? callback() : allow;
  };
  const releaseBackHandler = useCallback(() => {
    BackHandler.removeEventListener("hardwareBackPress", backPress);
  }, [allow, callback]);

  const holdBackHandler = useCallback(() => {
    BackHandler.addEventListener("hardwareBackPress", backPress);
  }, [allow, callback]);

  useEffect(() => {
    holdBackHandler();
    return () => releaseBackHandler();
  }, [allow]);
  

  return { releaseBackHandler, holdBackHandler };
}

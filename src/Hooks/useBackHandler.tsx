import { useEffect } from "react";
import { BackHandler } from "react-native";

/**
 * React Hook that handle the device's back button
 * @param allow boolean value to indicate wheater back button is allowed
 * @param callback optional callback function, just in case you need to make some verifications before deciding if the user should be able to use the back button
 * @author andr3z0
 **/
export function useBackHandler(allow: boolean, callback?: () => boolean) {
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => {
      return callback ? callback() : allow;
    });
  }, []);
}

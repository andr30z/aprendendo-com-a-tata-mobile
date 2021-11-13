import { useNavigation } from "@react-navigation/core";
import { useCallback, useEffect } from "react";
import { Keyboard } from "react-native";
interface KeyboardHideOrShowProps {
  onShow?: () => void;
  onHide?: () => void;
}
/**
 *
 * @author andr3z0
 **/
export function useKeyboardHideOrShowEvent({
  onHide,
  onShow,
}: KeyboardHideOrShowProps = {}) {
  // const navigation = useNavigation();
  // const _keyboardDidShow = useCallback(() => {
  //   navigation.setOptions({
  //     tabBarVisible: false,
  //   });
  // }, [navigation]);

  // const _keyboardDidHide = useCallback(() => {
  //   navigation.setOptions({
  //     tabBarVisible: true,
  //   });
  // }, [navigation]);

  useEffect(() => {
    if (onShow) Keyboard.addListener("keyboardDidShow", onShow);
    if (onHide) Keyboard.addListener("keyboardDidHide", onHide);

    // cleanup function
    return () => {
      if (onShow) Keyboard.removeListener("keyboardDidShow", onShow);
      if (onHide) Keyboard.removeListener("keyboardDidHide", onHide);
    };
  }, [onShow, onHide]);
}

import { useEffect } from "react";
import { Keyboard } from "react-native";
interface KeyboardHideOrShowProps {
  onShow?: () => void;
  onHide?: () => void;
}
/**
 *
 * @author andr30z
 **/
export function useKeyboardHideOrShowEvent({
  onHide,
  onShow,
}: KeyboardHideOrShowProps = {}) {
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

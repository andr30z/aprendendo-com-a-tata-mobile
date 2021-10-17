import { useNavigation } from "@react-navigation/core";
import { useCallback, useEffect } from "react";
import { Keyboard } from "react-native";

/**
 *
 * @author andr3z0
 **/
export function useKeyboardHideEvent() {
  const navigation = useNavigation();
  const _keyboardDidShow = useCallback(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
  }, [navigation]);

  const _keyboardDidHide = useCallback(() => {
    navigation.setOptions({
      tabBarVisible: true,
    });
  }, [navigation]);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, [_keyboardDidHide, _keyboardDidShow]);
}

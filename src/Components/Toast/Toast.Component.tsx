import { MotiView, useAnimationState } from "moti";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { ToastProps } from "./Interfaces";
import { PressableChildrenContainer, toastStyles } from "./Styles";
import { AntDesign } from "@expo/vector-icons";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
/**
 * Component that wraps his children into an animated Toast.
 * @author andr3z0
 **/
const Toast: React.FC<ToastProps> = ({
  children,
  show,
  setShow,
  backgroundColor,
  customStyles,
  closeProgressBarBackgroundColor,
  showCloseAction,
}) => {
  const { width, height } = useWindowDimensions();
  const [closeBarProgress, setCloseBarProgress] = useState(1);
  const [pauseCloseBar, setPauseCloseBar] = useState(true);
  const toastAnimationState = useAnimationState({
    close: {
      top: -1000,
    },
    open: {
      top: 50,
    },
  });

  const barProgress = useAnimationState({
    1: {
      width: 0,
    },
    2: {
      width: "25%",
    },
    3: {
      width: "50%",
    },
    4: {
      width: "75%",
    },
    5: {
      width: "100%",
    },
  });

  const interval = useRef<number | undefined>(0);

  const close = () => {
    setPauseCloseBar(true);
    barProgress.transitionTo(1);
    toastAnimationState.transitionTo("close");
    setCloseBarProgress(1);
  };

  const hideToast = () => {
    console.log("hideToast");
    setShow(false);
  };

  useEffect(() => {
    console.log(closeBarProgress, "close");
    if (show)
      barProgress.transitionTo(
        closeBarProgress > 5 ? 1 : (closeBarProgress as any)
      );
    if (closeBarProgress >= 6) hideToast();
  }, [closeBarProgress]);

  useEffect(() => {
    console.log(pauseCloseBar, "pause");
    if (!pauseCloseBar && show) {
      interval.current = setInterval(() => {
        setCloseBarProgress((past) => past + 1);
      }, 1000);
    } else {
      clearInterval(interval.current);
    }
  }, [pauseCloseBar]);

  useEffect(() => {
    console.log("show", show);
    if (show) {
      setPauseCloseBar(false);
      return toastAnimationState.transitionTo("open");
    }
    close();
  }, [show]);

  return (
    <MotiView
      state={toastAnimationState}
      style={[
        toastStyles.toastContainer,
        {
          width: width * 0.95,
          height: height * 0.1,
          backgroundColor: backgroundColor || "red",
        },
        customStyles,
      ]}
      transition={{ type: "timing", duration: 500 }}
    >
      <BaseContainer
        flex={1}
        flexDirection="column"
        width={showCloseAction ? "90%" : "100%"}
      >
        <PressableChildrenContainer
          onLongPress={() => setPauseCloseBar(true)}
          onPressOut={(e) => {
            console.log("aaaaa");
            setPauseCloseBar(false);
          }}
        >
          {children}
        </PressableChildrenContainer>
        <MotiView
          style={{
            backgroundColor: closeProgressBarBackgroundColor || "white",
            height: "8%",
            opacity: 0.75,
          }}
          state={barProgress}
          transition={{ type: "timing" }}
        />
      </BaseContainer>
      {showCloseAction && (
        <Pressable
          style={{
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
            borderLeftWidth: 1,
            height: "100%",
            paddingLeft: 5,
            borderLeftColor: backgroundColor === "white" ? "black" : "white",
          }}
          onPress={hideToast}
        >
          <AntDesign
            name="close"
            size={20}
            color={backgroundColor === "white" ? "black" : "white"}
          />
        </Pressable>
      )}
    </MotiView>
  );
};

export default Toast;

import { Portal } from "@gorhom/portal";
import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import { PORTAL_HOSTS } from "../../Constants";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

interface BackdropLoadingProps {
  visible: boolean;
  onPressBackdrop?: () => void;
  spinnerColor?: string;
}
/**
 * Backdrop component to avoid user pressing things on screen before the loading is complete.
 * @author andr3z0
 **/
const BackdropLoading: React.FC<BackdropLoadingProps> = ({
  visible,
  onPressBackdrop,
  spinnerColor = "white",
}) => {
  return (
    <Modal visible={visible} transparent={true}>
      <BaseContainer
        onTouchStart={onPressBackdrop}
        flex={1}
        justify="center"
        align="center"
        height="100%"
        backgroundColor="black"
        style={{ zIndex: 200000, opacity: 0.6 }}
      >
        <ActivityIndicator
          style={{ zIndex: 9999999999 }}
          size={35}
          color={spinnerColor}
        />
      </BaseContainer>
    </Modal>
  );
};
export default BackdropLoading;

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React from "react";
import { ActivityIndicator } from "react-native";
import { PORTAL_HOSTS } from "../../Constants";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import Button from "../Button/Button.Component";

interface ConfirmationModalProps {
  onConfirm: () => Promise<void>;
  modalRef: React.MutableRefObject<BottomSheetModal | null>;
  snapPoints?: Array<string | number>;
  confirmationQuestion: string;
  buttonConfirmationColor?: string;
  confirmationButtonTitle?: string;
  cancelButtonTitle?: string;
  cancelButtonColor?: string;
}
/**
 * Generic confirmation modal component.
 *
 * @author andr3z0
 **/
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  modalRef,
  snapPoints = ["30%"],
  confirmationQuestion,
  buttonConfirmationColor,
  confirmationButtonTitle,
  cancelButtonTitle,
  cancelButtonColor,
}) => {
  const { value: isConfirmationBeingExecuted, setFalse } = useBoolean();
  return (
    <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={modalRef}
          enablePanDownToClose={!isConfirmationBeingExecuted}
          snapPoints={snapPoints}
          index={0}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              pressBehavior={isConfirmationBeingExecuted ? "none" : "close"}
            />
          )}
          // add bottom inset to elevate the sheet
          bottomInset={46}
          style={{ marginHorizontal: 10 }}
          detached
          // set `detached` to true
        >
          <BaseContainer align="center" flexDirection="column">
            <BaseContainer
              flex={1}
              justify="center"
              width="100%"
              paddingHorizontal="3%"
            >
              <BaseText align="left" fontSize="20px" color="black">
                {confirmationQuestion}
              </BaseText>
            </BaseContainer>
            <BaseContainer
              flex={0.5}
              width="100%"
              justify="flex-end"
              flexDirection="row"
            >
              <Button
                buttonHeight="39px"
                onPress={() =>
                  isConfirmationBeingExecuted ? null : modalRef.current?.close()
                }
                buttonTitle={cancelButtonTitle || "Cancelar"}
                buttonWidth="100px"
                backgroundColor={cancelButtonColor || "grey"}
                containerStyles={{ marginRight: 10 }}
                textStyles={{ fontSize: "15px" }}
              />
              <Button
                buttonHeight="39px"
                onPress={async () => {
                  await onConfirm();
                  setFalse();
                }}
                buttonWidth="100px"
                textStyles={{ fontSize: "15px" }}
                containerStyles={{ marginRight: 10 }}
                buttonTitle={
                  isConfirmationBeingExecuted
                    ? undefined
                    : confirmationButtonTitle || "Confirmar"
                }
                backgroundColor={buttonConfirmationColor || "#ff1919"}
              >
                {isConfirmationBeingExecuted && (
                  <ActivityIndicator size={26} color="#fff" />
                )}
              </Button>
            </BaseContainer>
          </BaseContainer>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
};

export default ConfirmationModal;

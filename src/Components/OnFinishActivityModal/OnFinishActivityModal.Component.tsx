import { Entypo } from "@expo/vector-icons";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useEffect, useMemo } from "react";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { SetStateInterface } from "../../Interfaces/index";
import Button from "../Button/Button.Component";
import WithModal from "../WithModal/WithModal.Component";
interface OnFinishActivityModalProps {
  onSubmit: () => void;
  setFinished: SetStateInterface<boolean>;
  modalRef: React.RefObject<BottomSheetModalMethods>;
  finished: boolean;
}

const Modal = WithModal<Omit<OnFinishActivityModalProps, "modalRef">>(
  ({ onSubmit, modalSheetRef }) => {
    return (
      <BaseContainer
        flex={1}
        justify="center"
        align="center"
        position="relative"
      >
        <Entypo
          name="cross"
          size={40}
          color="red"
          onPress={() => modalSheetRef.current?.close()}
          style={{ position: "absolute", top: 10, left: 10 }}
        />
        <Button
          onPress={onSubmit}
          buttonWidth="90%"
          buttonHeight="55px"
          buttonTitle="Enviar atividade"
        />
      </BaseContainer>
    );
  }
);

/**
 *
 * @author andr3z0
 **/
const OnFinishActivityModal: React.FC<OnFinishActivityModalProps> = (props) => {
  const { finished, setFinished, modalRef } = props;

  const withModalProps = useMemo(
    () => ({
      modalSheetRef: modalRef,
      snapPoints: ["80%"],
      handleComponent: () => null,
      children: null,
      enablePanDownToClose: false,
      detached: true,
      onDismiss: () => setFinished(false),
      bottomInset: 50,
      style: { zIndex: 99999, marginHorizontal: 20 },
      backdropComponent: (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior="none"
        />
      ),
    }),
    []
  );
  useEffect(() => {
    if (finished) modalRef.current?.present();
  }, [finished]);
  return <Modal withModalProps={withModalProps} {...props} />;
};

export default OnFinishActivityModal;

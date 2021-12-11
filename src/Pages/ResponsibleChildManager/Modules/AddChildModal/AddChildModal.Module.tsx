import React, { useState } from "react";
import { Keyboard } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import Button from "../../../../Components/Button/Button.Component";
import Input from "../../../../Components/Input/Input.Component";
import { useUserContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useBoolean, useKeyboardHideOrShowEvent } from "../../../../Hooks";
import { SetStateInterface } from "../../../../Interfaces";
import { baseApi, baseApiRoutes } from "../../../../Services";
interface AddChildModalProps {
  isVisible: boolean;
  onFinishSendingInvite: () => void;
  setIsVisible: SetStateInterface<boolean>;
}
/**
 *
 * @author andr3z0
 **/
const AddChildModal: React.FC<AddChildModalProps> = ({
  isVisible,
  setIsVisible,
  onFinishSendingInvite,
}) => {
  const { value, setTrue, setFalse } = useBoolean();
  const setVisibleFalse = () => setIsVisible(false);
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUserContext();
  const onSendUserResponsibleRequest = () => {
    if (code.trim().length < 5)
      return setErrorMessage("Digite um código válido");
    Keyboard.dismiss();
    baseApi
      .post(
        baseApiRoutes.USER_RESPONSIBLE_REQUEST + "/" + user?._id + "/" + code
      )
      .then(() => {
        Toast.show({ text1: "Pedido enviado com sucesso " });
        setVisibleFalse();
        onFinishSendingInvite();
      })
      .catch((error) => {
        setErrorMessage(
          error?.response?.data?.message ||
            "Erro ao realizar a ação, tente novamente mais tarde."
        );
      });
  };

  useKeyboardHideOrShowEvent({ onHide: setFalse, onShow: setTrue });
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutUp"
      swipeDirection={["up", "down", "right", "left"]}
      avoidKeyboard
      onModalHide={() => setCode("")}
      useNativeDriver={false}
      onSwipeComplete={setVisibleFalse}
      onBackButtonPress={setVisibleFalse}
      onBackdropPress={setVisibleFalse}
      isVisible={isVisible}
    >
      <BaseContainer
        flexDirection="column"
        justify="space-between"
        align="center"
        paddingHorizontal="10%"
        borderRadius="15px"
        backgroundColor="white"
        flex={value ? 1 : 0.6}
      >
        <BaseContainer
          flex={0.6}
          flexDirection="column"
          justify="center"
          align="center"
        >
          <BaseText align="center" fontSize="15px" color="#8078cc">
            Informe o código de usuário da criança.
          </BaseText>
          <BaseText align="center" color="#8078cc">
            O codigo de usuário fica na aba de opções do app.
          </BaseText>
        </BaseContainer>
        <Input
          placeholder="Código de usuário"
          elevation={8}
          withWrapper
          inputWidth="100%"
          value={code}
          onFocus={() => setErrorMessage("")}
          wrapperStyles={errorMessage ? { marginBottom: 20 } : undefined}
          onChangeText={(text) => {
            setCode(text);
            setErrorMessage("");
          }}
          inputHeight="40px"
          error={errorMessage}
        />
        <BaseContainer justify="center" align="center" width="100%" flex={0.4}>
          <Button
            onPress={onSendUserResponsibleRequest}
            buttonWidth="70%"
            buttonHeight="40px"
            buttonTitle="Enviar pedido"
          />
        </BaseContainer>
      </BaseContainer>
    </Modal>
  );
};

export default AddChildModal;

import React from "react";
import { Pressable } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { AntDesign } from "@expo/vector-icons";
import { useBoolean, useFormatRelativeDate } from "../../Hooks";
import {
  Notification,
  UserRequestPayloadStatus,
} from "../../Interfaces/Notification";
import Modal from "react-native-modal";
import { Drawer } from "react-native-ui-lib";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Button from "../Button/Button.Component";
import Badge from "../Badge/Badge.Component";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
import Toast from "react-native-toast-message";
import BackdropLoading from "../BackdropLoading/BackdropLoading.Component";
interface NotificationItemProps {
  notification: Notification;
  onSwipeLeftDeleteActionCallbackSuccess: () => void;
  onActionResolverCallbackSuccess: () => void;
}

/**
 *
 * @author andr3z0
 **/
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onSwipeLeftDeleteActionCallbackSuccess,
  onActionResolverCallbackSuccess,
}) => {
  const { value, setTrue, setFalse } = useBoolean();
  const {
    value: isLoading,
    setFalse: setFalseIsLoading,
    setTrue: setTrueIsLoading,
  } = useBoolean();
  const onDelete = () => {
    setTrueIsLoading();
    baseApi
      .delete(baseApiRoutes.NOTIFICATION + "/" + notification._id)
      .then(() => {
        Toast.show({ text1: "Notificação deletada com sucesso!" });
        setFalseIsLoading();
        onSwipeLeftDeleteActionCallbackSuccess();
      })
      .catch((e) => {
        setFalseIsLoading();
        showError(e);
      });
  };

  const onBondActionResolve =
    (acceptBond = true) =>
    () => {
      const promise = acceptBond
        ? baseApi.post(
            baseApiRoutes.USER_RESPONSIBLE +
              "/" +
              notification.payload?.responsibleId +
              "/" +
              notification.payload?.childId
          )
        : baseApi.delete(
            baseApiRoutes.USER_RESPONSIBLE_REQUEST + "/" + notification._id
          );
      setTrueIsLoading();
      promise
        .then((res) => {
          console.log(res.data);
          Toast.show({
            text1: acceptBond
              ? "Vinculação feita com sucesso."
              : "Vinculação recusada com sucesso.",
          });
          onActionResolverCallbackSuccess();
        })
        .catch((e) => {
          setFalseIsLoading();
          showError(e);
        });
    };
  const notificationDate = useFormatRelativeDate(notification.createdAt);
  const hasAcceptedRequest =
    notification.payload?.status === UserRequestPayloadStatus.ACCEPTED;
  return (
    <Drawer
      disableHaptic
      fullSwipeLeft
      onFullSwipeLeft={onDelete}
      leftItem={{
        keepOpen: false,
        background: "red",
        customElement: (
          <BaseContainer flex={1} justify="center" align="center">
            <AntDesign
              onPress={onDelete}
              name="delete"
              size={30}
              color="white"
            />
          </BaseContainer>
        ),
      }}
    >
      {!value && <BackdropLoading visible={isLoading} />}
      {notification.payload?.status === UserRequestPayloadStatus.SENDED && (
        <Modal
          isVisible={value}
          animationIn="slideInUp"
          animationOut="slideOutUp"
          swipeDirection={["up", "down", "right", "left"]}
          avoidKeyboard
          useNativeDriver={false}
          onBackdropPress={setFalse}
          onSwipeComplete={setFalse}
        >
          <BackdropLoading visible={isLoading} />
          <BaseContainer
            flex={0.5}
            borderRadius="18px"
            backgroundColor="white"
            align="center"
            justify="space-evenly"
          >
            <BaseContainer
              paddingHorizontal="10%"
              flex={1}
              align="center"
              justify="flex-end"
            >
              <BaseText align="center" fontSize="18px" color="black">
                {notification.message}
              </BaseText>
            </BaseContainer>
            <BaseContainer
              width="100%"
              flex={1}
              flexDirection="row"
              align="center"
              marginTop="20px"
              justify="space-evenly"
            >
              <Button
                onPress={onBondActionResolve(false)}
                hasElevation
                buttonHeight="50px"
                buttonWidth="43%"
                backgroundColor="red"
                buttonTitle="Recusar"
              />
              <Button
                buttonWidth="43%"
                onPress={onBondActionResolve()}
                hasElevation
                buttonHeight="50px"
                buttonTitle="Aceitar"
              />
            </BaseContainer>
          </BaseContainer>
        </Modal>
      )}
      <TouchableWithoutFeedback
        onPress={() => {
          console.log("BPASDJKAKLSJDKLAS");
          setTrue();
        }}
      >
        <BaseContainer
          backgroundColor="white"
          style={{ minHeight: 80 }}
          flexDirection="row"
          position="relative"
          paddingHorizontal="1%"
        >
          <BaseContainer justify="center" align="center" width="15%">
            <BaseContainer
              backgroundColor="red"
              height="7px"
              width="7px"
              borderRadius="3.5px"
            />
          </BaseContainer>
          <BaseContainer flex={5} flexDirection="column" justify="center">
            <BaseText color="black" fontSize="14px">
              {notification.message}
            </BaseText>
          </BaseContainer>
          <BaseContainer
            flexDirection="row"
            align="center"
            justify="center"
            style={{ position: "absolute", bottom: 5, right: 10 }}
          >
            {notification.payload?.status &&
              notification.payload?.status !==
                UserRequestPayloadStatus.SENDED && (
                <Badge
                  extraTextStyles={{ padding: 2, fontSize: 11 }}
                  extraContainerStyles={{
                    marginTop: 2,
                    marginRight: 4,
                    padding: 5,
                  }}
                  pill
                  backgroundColor={hasAcceptedRequest ? "green" : "red"}
                  text={hasAcceptedRequest ? "Aceito" : "Recusado"}
                />
              )}
            <BaseText fontSize="12px" color="black">
              {notificationDate}
            </BaseText>
          </BaseContainer>
        </BaseContainer>
      </TouchableWithoutFeedback>
    </Drawer>
  );
};

export default NotificationItem;

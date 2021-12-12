import React from "react";
import { Pressable } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { AntDesign } from "@expo/vector-icons";
import { useBoolean, useFormatRelativeDate } from "../../Hooks";
import { Notification } from "../../Interfaces/Notification";
import Modal from "react-native-modal";
import { Drawer } from "react-native-ui-lib";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Button from "../Button/Button.Component";
interface NotificationItemProps {
  notification: Notification;
  onSwipeLeftDeleteAction: (notificationId: string) => void;
}

/**
 *
 * @author andr3z0
 **/
const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onSwipeLeftDeleteAction,
}) => {
  const { value, setTrue, setFalse } = useBoolean();
  const notificationDate = useFormatRelativeDate(notification.createdAt);
  const onSwipeLeftDelete = () => onSwipeLeftDeleteAction(notification._id);
  return (
    <Drawer
      disableHaptic
      fullSwipeLeft
      onFullSwipeLeft={onSwipeLeftDelete}
      leftItem={{
        keepOpen: false,
        background: "red",
        customElement: (
          <BaseContainer flex={1} justify="center" align="center">
            <AntDesign
              onPress={onSwipeLeftDelete}
              name="delete"
              size={30}
              color="white"
            />
          </BaseContainer>
        ),
      }}
    >
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
        <BaseContainer
          flex={0.5}
          borderRadius="18px"
          backgroundColor="white"
          align="center"
          justify="space-evenly"
        >
          <BaseContainer paddingHorizontal="10%" flex={1} align="center" justify="flex-end">
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
              onPress={() => null}
              hasElevation
              buttonHeight="50px"
              buttonWidth="43%"
              backgroundColor="red"
              buttonTitle="Recusar"
            />
            <Button
              buttonWidth="43%"
              onPress={() => null}
              hasElevation
              buttonHeight="50px"
              buttonTitle="Aceitar"
            />
          </BaseContainer>
        </BaseContainer>
      </Modal>
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
          <BaseText
            style={{ position: "absolute", bottom: 5, right: 10 }}
            fontSize="12px"
            color="black"
          >
            {notificationDate}
          </BaseText>
        </BaseContainer>
      </TouchableWithoutFeedback>
    </Drawer>
  );
};

export default NotificationItem;

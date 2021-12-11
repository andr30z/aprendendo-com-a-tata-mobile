import React from "react";
import { Pressable } from "react-native";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { AntDesign } from "@expo/vector-icons";
import { useBoolean, useFormatRelativeDate } from "../../Hooks";
import { Notification } from "../../Interfaces/Notification";
import Modal from "react-native-modal";
import { Drawer } from "react-native-ui-lib";
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
  const { value, setTrue } = useBoolean();
  const notificationDate = useFormatRelativeDate(notification.createdAt);
  return (
    <Drawer
      disableHaptic
      leftItem={{
        keepOpen: false,
        background: "red",
        customElement: (
          <BaseContainer flex={1} justify="center" align="center">
            <AntDesign
              onPress={() => onSwipeLeftDeleteAction(notification._id)}
              name="delete"
              size={30}
              color="white"
            />
          </BaseContainer>
        ),
      }}
    >
      <Modal isVisible={value}>
        <BaseText>KLAJSKLAJSKLDJASKLDJKLASJDKLA</BaseText>
      </Modal>
      <BaseContainer
        backgroundColor="white"
        style={{ minHeight: 80 }}
        flexDirection="row"
        position="relative"
        paddingHorizontal="1%"
      >
        <BaseContainer flexDirection="column">
          <BaseText color="black">{notification.message}</BaseText>
        </BaseContainer>
        <BaseText
          style={{ position: "absolute", bottom: 5, right: 10 }}
          color="black"
        >
          {notificationDate}
        </BaseText>
      </BaseContainer>
    </Drawer>
  );
};

export default NotificationItem;

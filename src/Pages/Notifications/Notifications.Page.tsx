import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NotificationItem } from "../../Components";
import { useUserContext } from "../../Contexts";
import { ScrollContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean } from "../../Hooks";
import { Notification } from "../../Interfaces/Notification";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
interface GetNotificationsReturnType {
  notifications: Array<Notification>;
}
/**
 *
 * @author andr3z0
 **/
const Notifications: React.FC = () => {
  const { user } = useUserContext();
  const { value, setTrue, setFalse } = useBoolean();
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const getNotifications = (callback?: () => void) => {
    baseApi
      .get<GetNotificationsReturnType>(
        baseApiRoutes.USER_NOTIFICATIONS + "/" + user?._id
      )
      .then((res) => {
        setNotifications(res.data.notifications);
      })
      .catch(showError)
      .finally(callback ? callback : () => null);
  };
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          colors={["#8078cc"]}
          refreshing={value}
          onRefresh={() => {
            setTrue();
            getNotifications(setFalse);
          }}
        />
      }
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <NotificationItem
          onActionResolverCallbackSuccess={getNotifications}
          onSwipeLeftDeleteActionCallbackSuccess={getNotifications}
          notification={item}
        />
      )}
      data={notifications}
      contentContainerStyle={{ paddingBottom: 80, marginTop: 10 }}
    />
  );
};
export default Notifications;

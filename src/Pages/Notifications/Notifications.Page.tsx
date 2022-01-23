import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { NotificationItem } from "../../Components";
import { useUserContext } from "../../Contexts";
import { ScrollContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useCancellablePromise } from "../../Hooks";
import { Notification } from "../../Interfaces/Notification";
import { baseApi, baseApiRoutes } from "../../Services";
import { showError } from "../../Utils";
import EmptyNotifications from "../../Illustrations/Empty-amico.svg";
interface GetNotificationsReturnType {
  notifications: Array<Notification>;
}
/**
 *
 * @author andr30z
 **/
const Notifications: React.FC = () => {
  const { user } = useUserContext();
  const { value, setTrue, setFalse } = useBoolean();
  const [notifications, setNotifications] = useState<Array<Notification>>([]);
  const {
    value: isLoading,
    setTrue: setTrueIsLoading,
    setFalse: setFalseIsLoading,
  } = useBoolean();
  const { cancellablePromise } = useCancellablePromise();
  const { width, height } = useWindowDimensions();
  const getNotifications = (callback?: () => void) => {
    setTrueIsLoading();
    cancellablePromise(
      baseApi.get<GetNotificationsReturnType>(
        baseApiRoutes.USER_NOTIFICATIONS + "/" + user?._id
      ),
      true
    )
      .then((res) => {
        console.log(res.data)
        setNotifications(res.data.notifications.reverse());
      })
      .catch(showError)
      .finally(() => {
        if (callback) callback();
        setFalseIsLoading();
      });
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
      ListEmptyComponent={() => {
        return isLoading ? (
          <ActivityIndicator size={30} color={"#8078cc"} />
        ) : (
          <EmptyNotifications width={width} height={height} />
        );
      }}
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

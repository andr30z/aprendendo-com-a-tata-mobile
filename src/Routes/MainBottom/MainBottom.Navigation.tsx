import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useWindowDimensions } from "react-native";
import { WithIconContainer, WithStatusBar } from "../../Components";
import { useBackHandler } from "../../Hooks/useBackHandler";
import { ActivitySelection, Settings, User } from "../../Pages";
import { Home, Settings as SettingsIcon, User as UserIcon } from "./Icons";
import { TextBar } from "./Label";
import { ROUTES_NAME } from "./RoutesName";

const BottomTab = createBottomTabNavigator();

const UserPageWithStatusBar = WithStatusBar(User, true);
const ActivitySelectionPageWithStatusBar = WithStatusBar(
  ActivitySelection,
  true
);
const SettingsPageWithStatusBar = WithStatusBar(Settings, true);

const HomeIconWithIconContainer = WithIconContainer(Home);
const SettingsIconWithIconContainer = WithIconContainer(SettingsIcon);
const UserIconWithIconContainer = WithIconContainer(UserIcon);

/**
 * This is the main navigation container of the application.
 * @author andr3z0
 **/
const MainBottomNavigation: React.FC = () => {
  useBackHandler(false);
  const { width } = useWindowDimensions();
  return (
    <BottomTab.Navigator
      // defaultScreenOptions
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 21,
          borderTopRightRadius: 21,
          position: "absolute",
          width: width + 2,
          left: -1,
          bottom: 0,
          height: "10%",
          borderTopWidth: 0.1,
          borderLeftWidth: 0.1,
          borderRightWidth: 0.1,
          borderColor: "#a1a1a1",
          borderBottomWidth: 0,
        },
      }}
      // tabBarOptions={{
      //   style: {

      //   },
      // }}
      initialRouteName={ROUTES_NAME.HOME}
    >
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: (props) => <TextBar {...props} textLabel="Usuário" />,
          tabBarIcon: UserIconWithIconContainer,
        }}
        name={ROUTES_NAME.USER}
        component={UserPageWithStatusBar}
      />
      <BottomTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: (props) => <TextBar {...props} textLabel="Descobrir" />,
          tabBarIcon: HomeIconWithIconContainer,
        }}
        name={ROUTES_NAME.HOME}
        component={ActivitySelectionPageWithStatusBar}
      />
      <BottomTab.Screen
        name={ROUTES_NAME.SETTINGS}
        component={SettingsPageWithStatusBar}
        options={{
          headerShown: false,
          tabBarIcon: SettingsIconWithIconContainer,
          tabBarLabel: (props) => <TextBar {...props} textLabel="Opções" />,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default MainBottomNavigation;

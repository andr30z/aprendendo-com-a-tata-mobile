import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ActivitySelection, Settings, User } from "../../Pages";
import { Home, User as UserIcon, Settings as SettingsIcon } from "./Icons";
import { TextBar } from "./Label";
import { WithIconContainer, WithStatusBar } from "../../Components";
import { CONSTANTS } from "../../Constants";

const BottomTab = createBottomTabNavigator();

export const ROUTES_NAME = {
  HOME: "ActivitySelection",
  SETTINGS: "Settings",
  USER: "User",
};

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
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        tabBarOptions={{
          style: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 21,
            borderTopRightRadius: 21,
            position: "absolute",
            width: CONSTANTS.DEVICE_WIDTH + 2,
            left: -1,
            bottom: 0,
            height: "7%",
            borderTopWidth: 0.1,
            borderLeftWidth: 0.1,
            borderRightWidth: 0.1,
            borderColor: "#a1a1a1",
            borderBottomWidth: 0,
          },
        }}
        initialRouteName={ROUTES_NAME.HOME}
      >
        <BottomTab.Screen
          options={{
            tabBarLabel: (props) => <TextBar {...props} textLabel="Usuário" />,
            tabBarIcon: UserIconWithIconContainer,
          }}
          name={ROUTES_NAME.USER}
          component={UserPageWithStatusBar}
        />
        <BottomTab.Screen
          options={{
            tabBarLabel: (props) => (
              <TextBar {...props} textLabel="Descobrir" />
            ),
            tabBarIcon: HomeIconWithIconContainer,
          }}
          name={ROUTES_NAME.HOME}
          component={ActivitySelectionPageWithStatusBar}
        />
        <BottomTab.Screen
          name={ROUTES_NAME.SETTINGS}
          component={SettingsPageWithStatusBar}
          options={{
            tabBarIcon: SettingsIconWithIconContainer,
            tabBarLabel: (props) => <TextBar {...props} textLabel="Opções" />,
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainBottomNavigation;

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { WithStatusBar } from "../../Components";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { CreditsInfo, Notifications, ResponsibleChildManager, User } from "../../Pages";
import { PasswordChange } from "../../Pages/PasswordChange/PasswordChange.Page";
import { SettingsDrawerParamList } from "./Interfaces";
import { ROUTES_NAME } from "./RoutesName";

const UserPageWithStatusBar = WithStatusBar(User);

const Drawer = createDrawerNavigator<SettingsDrawerParamList>();
const SettingsDrawer: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      initialRouteName={ROUTES_NAME.RESPONSABLE_MANAGER}
      backBehavior="none"
      screenOptions={{ swipeEnabled: false, headerShown: false }}
    >
      <Drawer.Screen
        component={UserPageWithStatusBar}
        name={ROUTES_NAME.USER_INFO}
      />
      <Drawer.Screen
        options={{
          headerLeft: ({ tintColor }) => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop: 5 }}
              color={tintColor}
            />
          ),
          headerTitle: () => (
            <BaseText fontSize="19px" color="black">
              Atualizar Senha
            </BaseText>
          ),
          headerShown: true,
        }}
        component={PasswordChange}
        name={ROUTES_NAME.PASSWORD_CHANGE}
      />
      <Drawer.Screen
        options={{
          headerLeft: ({ tintColor }) => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop: 5 }}
              color={tintColor}
            />
          ),
          headerTitle: () => (
            <BaseText fontSize="19px" color="black">
              Crianças Vinculadas
            </BaseText>
          ),
          headerShown: true,
        }}
        name={ROUTES_NAME.RESPONSABLE_MANAGER}
        component={ResponsibleChildManager}
      />
      <Drawer.Screen
        options={{
          headerLeft: ({ tintColor }) => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop: 5 }}
              color={tintColor}
            />
          ),
          headerTitle: () => (
            <BaseText fontSize="19px" color="black">
              Notificações
            </BaseText>
          ),
          headerShown: true,
        }}
        component={Notifications}
        name={ROUTES_NAME.NOTIFICATIONS}
      />
        <Drawer.Screen
        options={{
          headerLeft: ({ tintColor }) => (
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={24}
              style={{ marginLeft: 15, marginTop: 5 }}
              color={tintColor}
            />
          ),
          headerTitle: () => (
            <BaseText fontSize="19px" color="black">
              Créditos
            </BaseText>
          ),
          headerShown: true,
        }}
        name={ROUTES_NAME.CREDITS_INFO}
        component={CreditsInfo}
      />
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;

import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { ResponsibleChildManager } from "../../Pages";
import { SettingsDrawerParamList } from "./Interfaces";
import { ROUTES_NAME } from "./RoutesName";

const Drawer = createDrawerNavigator<SettingsDrawerParamList>();
const SettingsDrawer: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      screenOptions={{ swipeEnabled: false, headerShown: false }}
    >
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
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;

import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { SettingsOptionsItem } from "../../../../Components";
import { useUserContext } from "../../../../Contexts";
import { useBoolean, useModalSheetRef } from "../../../../Hooks";
import { MainStackParamList } from "../../../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../../../Routes/MainStackNavigation/RoutesName";
import { ROUTES_NAME as DRAWER_ROUTES_NAME } from "../../../../Routes/SettingsDrawer/RoutesName";
import { ChildResponsibleIcon } from "./Modules";

/**
 *
 * @author andr30z
 **/
const SettingsOptionsListing: React.FC = () => {
  const { logoutUser, userIsChild } = useUserContext();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { value: isResponsibleVisible, setTrue, setValue } = useBoolean();
  return (
    <>
      <SettingsOptionsItem
        onPress={() => null}
        icon={(props) => <AntDesign name="idcard" {...props} />}
        title="Código"
        subTitle="Ver meu codigo de usuário"
      />
      <SettingsOptionsItem
        onPress={() => null}
        icon={(props) => <AntDesign name="user" {...props} />}
        title="Minhas Informações"
        subTitle="Editar suas informações"
      />
      <SettingsOptionsItem
        onPress={() =>
          navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
            screen: DRAWER_ROUTES_NAME.NOTIFICATIONS,
          })
        }
        icon={(props) => <MaterialIcons name="notifications-none" {...props} />}
        title="Notificações"
        subTitle="Minhas notificações"
      />
      <SettingsOptionsItem
        onPress={() => null}
        icon={(props) => (
          <MaterialCommunityIcons name="form-textbox-password" {...props} />
        )}
        title="Senha"
        subTitle="Alterar minha senha"
      />

      {!userIsChild ? (
        <SettingsOptionsItem
          onPress={() =>
            navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
              screen: DRAWER_ROUTES_NAME.RESPONSABLE_MANAGER,
            })
          }
          icon={(props) => <FontAwesome name="child" {...props} />}
          title="Crianças"
          subTitle="Ver crianças vinculadas ao seu perfil"
        />
      ) : (
        <SettingsOptionsItem
          onPress={setTrue}
          icon={(props) => (
            <ChildResponsibleIcon setIsResponsibleVisible={setValue} isResponsibleVisible={isResponsibleVisible} {...props} />
          )}
          title="Responsável"
          subTitle="Ver meu responsável"
        />
      )}
      <SettingsOptionsItem
        icon={(props) => <Feather name="log-out" {...props} />}
        onPress={logoutUser}
        title="Sair"
        color="#ff3232"
      />
    </>
  );
};

export default SettingsOptionsListing;

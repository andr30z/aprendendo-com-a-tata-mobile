import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import { SettingsOptionsItem } from "../../../../Components";
import { useUserContext } from "../../../../Contexts";

/**
 *
 * @author andr30z
 **/
const SettingsOptionsListing: React.FC = () => {
  const { logoutUser } = useUserContext();
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
        onPress={() => null}
        icon={(props) => (
          <MaterialCommunityIcons name="form-textbox-password" {...props} />
        )}
        title="Senha"
        subTitle="Alterar minha senha"
      />
      <SettingsOptionsItem
        onPress={() => null}
        icon={(props) => <FontAwesome name="child" {...props} />}
        title="Crianças"
        subTitle="Ver crianças vinculadas a seu perfil"
      />
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
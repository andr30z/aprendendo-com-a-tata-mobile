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
import { ScrollView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import { Badge } from "react-native-ui-lib";
import { SettingsOptionsItem } from "../../../../Components";
import { useUserContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
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
  const { logoutUser, userIsChild, user } = useUserContext();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const { value: isResponsibleVisible, setTrue, setValue } = useBoolean();
  const {
    value: isVisibleUserCode,
    setTrue: setTrueUserCodeModal,
    setFalse,
  } = useBoolean();
  return (
    <BaseContainer flex={5}>
      <ScrollView
        style={{ flex: 1, }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <SettingsOptionsItem
          onPress={setTrueUserCodeModal}
          icon={(props) => (
            <>
              <ReactNativeModal
                animationIn="slideInUp"
                animationOut="slideOutUp"
                onSwipeComplete={setFalse}
                swipeDirection={["up", "down", "right", "left"]}
                useNativeDriver={false}
                onBackdropPress={setFalse}
                isVisible={isVisibleUserCode}
              >
                <BaseContainer
                  align="center"
                  justify="center"
                  flexDirection="column"
                  borderRadius="10px"
                  backgroundColor="#fff"
                  flex={0.5}
                >
                  <AntDesign name="user" size={30} color="#8078cc" />
                  <BaseText fontSize="18px" color="black" marginBottom="10px">
                    Seu código de usuário é:{" "}
                  </BaseText>
                  <Badge
                    backgroundColor="#8078cc"
                    size={50}
                    label={user?.code}
                    labelStyle={{
                      fontSize: 16,
                      width: "100%",
                      textAlign: "center",
                    }}
                    containerStyle={{
                      width: "80%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                </BaseContainer>
              </ReactNativeModal>
              <AntDesign name="idcard" {...props} />
            </>
          )}
          title="Código"
          subTitle="Ver meu codigo de usuário"
        />
        <SettingsOptionsItem
          onPress={() =>
            navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
              screen: DRAWER_ROUTES_NAME.NOTIFICATIONS,
            })
          }
          icon={(props) => (
            <MaterialIcons name="notifications-none" {...props} />
          )}
          title="Notificações"
          subTitle="Minhas notificações"
        />
        <SettingsOptionsItem
          onPress={() =>
            navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
              screen: DRAWER_ROUTES_NAME.USER_INFO,
            })
          }
          icon={(props) => <AntDesign name="user" {...props} />}
          title="Minhas Informações"
          subTitle="Editar suas informações"
        />

        <SettingsOptionsItem
          onPress={() =>
            navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
              screen: DRAWER_ROUTES_NAME.PASSWORD_CHANGE,
            })
          }
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
              <ChildResponsibleIcon
                setIsResponsibleVisible={setValue}
                isResponsibleVisible={isResponsibleVisible}
                {...props}
              />
            )}
            title="Responsável"
            subTitle="Ver meu responsável"
          />
        )}
        <SettingsOptionsItem
          onPress={() =>
            navigation.navigate(ROUTES_NAME.SETTINGS_DRAWER, {
              screen: DRAWER_ROUTES_NAME.CREDITS_INFO,
            })
          }
          icon={(props) => <AntDesign name="infocirlce" {...props} />}
          title="Informações"
          subTitle="Informações do app"
        />
        <SettingsOptionsItem
          icon={(props) => <Feather name="log-out" {...props} />}
          onPress={logoutUser}
          title="Sair"
          color="#ff3232"
        />
      </ScrollView>
    </BaseContainer>
  );
};

export default SettingsOptionsListing;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { Ionicons } from "@expo/vector-icons";
import { baseApi, baseApiRoutes } from "../../Services";
import { useUserContext } from "../../Contexts";
import { showError } from "../../Utils";
import { UserResponsible } from "../../Interfaces";
import { useBoolean } from "../../Hooks";
import { ActivityIndicator } from "react-native";
import ResponsibleChildrenSVG from "../../Illustrations/Fall is coming-cuate.svg";
import {
  ActivityResultVisualization,
  BackdropLoading,
  Button,
} from "../../Components";
import { AddChildModal } from "./Modules";

interface GetChildrenReturnType {
  children: Array<UserResponsible>;
}

const ResponsibleChildManager: React.FC = () => {
  const { user } = useUserContext();
  const [userResponsibleChildren, setUserResponsibleChildren] = useState<
    Array<UserResponsible>
  >([]);

  const { value: isLoading, setTrue, setFalse } = useBoolean();
  const {
    value: isModalVisible,
    setValue,
    setTrue: setIsModalVisibleTrue,
    setFalse: setIsModalVisibleFalse,
  } = useBoolean();
  const getChildren = useCallback(() => {
    setTrue();
    baseApi
      .get<GetChildrenReturnType>(
        baseApiRoutes.USER_RESPONSIBLE + "/" + user?._id
      )
      .then((res) => {
        console.log(res.data);
        setUserResponsibleChildren(res.data.children);
      })
      .catch(showError)
      .finally(setFalse);
  }, [user]);
  useEffect(() => {
    getChildren();
  }, []);
  const children = useMemo(
    () => userResponsibleChildren.map((user) => user.child),
    [userResponsibleChildren]
  );
  return (
    <>
      <AddChildModal
        isVisible={isModalVisible}
        setIsVisible={setValue}
        onFinishSendingInvite={getChildren}
      />
      <BackdropLoading visible={isLoading} />
      {!isLoading && userResponsibleChildren.length === 0 && (
        <BaseContainer
          flexDirection="column"
          flex={1}
          justify="center"
          align="center"
          paddingHorizontal="5%"
        >
          <ResponsibleChildrenSVG width="100%" height={280} />
          <BaseText
            fontSize="18px"
            marginVertical="25px"
            align="center"
            color="#8078cc"
          >
            Você não possui nenhuma criança vinculada ao seu perfil
          </BaseText>
          <Button
            onPress={setIsModalVisibleTrue}
            buttonTitle="Vincular criança"
            buttonHeight="40px"
            buttonWidth={"80%"}
            backgroundColor="#8078cc"
            hasElevation
          />
        </BaseContainer>
        // <ActivityResultVisualization membersArray={children} primaryTheme="#8078cc" />
      )}
      <BaseContainer>
        <BaseText>TEXT</BaseText>
      </BaseContainer>
    </>
  );
};

export default ResponsibleChildManager;

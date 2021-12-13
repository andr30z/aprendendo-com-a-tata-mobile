import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { ProfilePhoto, WithModal } from "../../../../../../Components";
import {
  useBoolean,
  useDeleteResponsibleRelation,
  useModalSheetRef,
} from "../../../../../../Hooks";
import { BaseContainer } from "../../../../../../GlobalStyles/Containers.Style";
import {
  SetStateInterface,
  UserResponsible,
} from "../../../../../../Interfaces";
import { baseApi, baseApiRoutes } from "../../../../../../Services";
import { useUserContext } from "../../../../../../Contexts";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import ReactNativeModal from "react-native-modal";
import { BaseText } from "../../../../../../GlobalStyles/BaseStyles";
import { ActivityIndicator } from "react-native";
import { formatFilePathUrl } from "../../../../../../Utils";
import { Button } from "react-native-ui-lib";
interface IconProps {
  color: string;
  size: number;
  setIsResponsibleVisible: SetStateInterface<boolean>;
  isResponsibleVisible: boolean;
}

const ResponsibleModal: React.FC<
  Pick<IconProps, "setIsResponsibleVisible" | "isResponsibleVisible">
> = ({ isResponsibleVisible, setIsResponsibleVisible }) => {
  const hideModal = () => setIsResponsibleVisible(false);
  const [responsibleDocument, setResponsibleDocument] =
    useState<UserResponsible>();
  const { value: isLoading, setTrue, setFalse } = useBoolean();
  const { onDelete } = useDeleteResponsibleRelation(() => {
    hideModal();
    setResponsibleDocument(undefined);
  }, responsibleDocument?._id);
  const { user } = useUserContext();
  useEffect(() => {
    if (!isResponsibleVisible) return;
    setTrue();
    baseApi
      .get<UserResponsible>(
        baseApiRoutes.USER_RESPONSIBLE_CHILD + "/" + user?._id
      )
      .then((res) => {
        console.log(res.data);
        setResponsibleDocument(res.data);
      })
      .finally(setFalse);
  }, [isResponsibleVisible]);
  return (
    <ReactNativeModal
      onBackButtonPress={hideModal}
      onBackdropPress={hideModal}
      isVisible={isResponsibleVisible}
    >
      <BaseContainer
        borderRadius="15px"
        align="center"
        justify="center"
        flex={0.5}
        backgroundColor="white"
      >
        {isLoading ? (
          <ActivityIndicator size={30} color="blue" />
        ) : (
          <BaseContainer
            marginTop="10px"
            flex={1}
            align="center"
            justify="space-evenly"
          >
            {!responsibleDocument ? (
              <BaseContainer align="center" justify="center" flex={1}>
                <BaseText marginBottom="19px" color="black" fontSize="20px" align="center">
                  Você não possui um responsável
                </BaseText>
                <Button
                  size={"medium" as any}
                  backgroundColor="red"
                  label="Fechar"
                  onPress={hideModal}
                />
              </BaseContainer>
            ) : (
              <>
                <BaseContainer flex={0.6}>
                  <BaseText fontWeight="bold" fontSize="17px" color="black">
                    Responsável
                  </BaseText>
                </BaseContainer>
                <BaseContainer flex={2} align="center" justify="center">
                  <ProfilePhoto
                    size={100}
                    source={{
                      uri: formatFilePathUrl(
                        responsibleDocument?.responsibleUser.profilePhoto?.path
                      ),
                    }}
                  />
                  <BaseText marginTop="8px" color="black">
                    {responsibleDocument?.responsibleUser.name}
                  </BaseText>
                </BaseContainer>
                <BaseContainer flex={1} align="center" justify="center">
                  <Button
                    size={"medium" as any}
                    backgroundColor="red"
                    label="Desvincular"
                    onPress={onDelete}
                  />
                </BaseContainer>
              </>
            )}
          </BaseContainer>
        )}
      </BaseContainer>
    </ReactNativeModal>
  );
};

/**
 *
 * @author andr3z0
 **/
export const ChildResponsibleIcon: React.FC<IconProps> = ({
  children,
  isResponsibleVisible,
  setIsResponsibleVisible,
  ...props
}) => {
  return (
    <>
      <ResponsibleModal
        isResponsibleVisible={isResponsibleVisible}
        setIsResponsibleVisible={setIsResponsibleVisible}
      />
      <FontAwesome name="child" {...props} />
    </>
  );
};

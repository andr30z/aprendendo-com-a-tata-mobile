import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ClassRoomInterface } from "../../Interfaces/index";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { formatFilePathUrl } from "../../Utils";
import Badge from "../Badge/Badge.Component";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import { TouchableClassContainer } from "./Styles";
import { useModalSheetRef } from "../../Hooks";
import { baseApi, baseApiRoutes } from "../../Services";
import Toast from "react-native-toast-message";

interface ClassRoomItemProps {
  classRoom: ClassRoomInterface;
  askToJoinOnPress?: boolean;
}

const backgroundColor = [
  "#83CAF6",
  "#F48C7F",
  "#FF4C4C",
  "#9188E5",
  "#355389",
  "#3C8F7C",
];

/**
 * Card item that represents an classroom, this card will lead to another screen when pressed
 *
 * @author andr3z0
 **/
const ClassRoomItem = React.memo<ClassRoomItemProps>(
  ({ classRoom, askToJoinOnPress = false }) => {
    const { textColor, teacher } = classRoom;
    const { userIsTeacher } = useUserContext();
    const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
    const textStyleColor = textColor || "white";
    const { sheetRef, open, close } = useModalSheetRef();
    const onConfirmCallback = useCallback(async () => {
      baseApi
        .post(baseApiRoutes.CLASSROOM_JOIN_REQUEST(classRoom._id))
        .then((res) => {
          Toast.show({
            text1: "Pedido enviado com sucesso.",
            text2: "Agora é so esperar o convite ser aceito.",
          });
          close();
          return res;
        })
        .catch((e) => {
          console.log(e.response);
          Toast.show({
            type: "error",
            text1: "Erro",
            text2:
              e?.response?.data?.message ||
              "Ocorreu um erro ao entrar enviar pedido.",
          });
        });
    }, [classRoom]);
    return (
      <TouchableClassContainer
        onPress={() => {
          if (askToJoinOnPress) return open();
          navigation.navigate(ROUTES_NAME.CLASSROOM_DETAILS, {
            classId: classRoom._id,
          });
        }}
        activeOpacity={0.83}
      >
        <BaseContainer
          flex={1}
          borderRadius={"20px"}
          backgroundColor={classRoom.color}
          flexDirection="column"
          paddingHorizontal="3%"
          paddingVertical="3%"
          position={"relative"}
        >
          <ConfirmationModal
            modalRef={sheetRef}
            onConfirm={onConfirmCallback}
            confirmationQuestion="Enviar pedido para entrar na sala?"
            buttonConfirmationColor="#8078cc"
            confirmationButtonTitle="Sim"
            cancelButtonTitle="Não"
          />
          <BaseContainer flexDirection="column" width="100%" justify="center">
            <BaseContainer
              flexDirection="row"
              align="center"
              justify="space-between"
              flex={1}
            >
              <BaseContainer flexDirection="row" align="center">
                <ProfilePhoto
                  size={50}
                  source={{
                    uri: formatFilePathUrl(classRoom.classPhoto?.path),
                  }}
                />
                <BaseContainer>
                  <BaseText
                    marginLeft="15px"
                    fontSize={"20px"}
                    color={textStyleColor}
                  >
                    {classRoom.name}
                  </BaseText>
                  {!userIsTeacher && (
                    <BaseText
                      marginLeft="15px"
                      fontSize={"20px"}
                      color={textStyleColor}
                    >
                      Prof: {teacher.name}
                    </BaseText>
                  )}
                </BaseContainer>
              </BaseContainer>
              <BaseContainer flexDirection="row">
                <FontAwesome name="child" size={20} color={textStyleColor} />
                <BaseText marginLeft="7px" color={textStyleColor}>
                  {classRoom.members.length}
                </BaseText>
              </BaseContainer>
            </BaseContainer>
            <BaseContainer flexDirection={"row"} width="100%">
              {classRoom.tags.map((tag, index) => (
                <Badge
                  pill
                  extraContainerStyles={{ marginLeft: index === 0 ? 0 : 5 }}
                  textColor="white"
                  shouldLimitSize={false}
                  backgroundColor={backgroundColor[index] || "white"}
                  text={tag}
                  key={index}
                />
              ))}
            </BaseContainer>
          </BaseContainer>
          <BaseContainer
            flex={1}
            flexDirection="row"
            align="baseline"
            marginTop="10px"
            marginBottom="10px"
          >
            <BaseText
              numberOfLines={2.5}
              ellipsizeMode="tail"
              color={textStyleColor}
            >
              {classRoom.description}
            </BaseText>
          </BaseContainer>
          <BaseContainer bottom={10} right="10px" position="absolute">
            <BaseText color={textStyleColor} fontSize={"11.4px"}>
              Código: {classRoom.code}
            </BaseText>
          </BaseContainer>
        </BaseContainer>
      </TouchableClassContainer>
    );
  }
);

export default ClassRoomItem;

import React from "react";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ClassRoomInterface, UserType } from "../../Interfaces/index";
import { TouchableClassContainer } from "./Styles";
import { FontAwesome } from "@expo/vector-icons";
import Badge from "../Badge/Badge.Component";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";

interface ClassRoomItemProps {
  classRoom: ClassRoomInterface;
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
const ClassRoomItem: React.FC<ClassRoomItemProps> = ({ classRoom }) => {
  const { textColor, teacher } = classRoom;
  const { userIsTeacher } = useUserContext();
  const navigation = useNavigation<StackNavigationProp<MainStackParamList>>();
  const textStyleColor = textColor || "white";
  return (
    <TouchableClassContainer
      onPress={() => navigation.navigate(ROUTES_NAME.CLASSROOM_DETAILS)}
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
        <BaseContainer flexDirection="column" width="100%" justify="center">
          <BaseContainer
            flexDirection="row"
            align="center"
            justify="space-between"
            flex={1}
          >
            <BaseText fontSize={"20px"} color={textStyleColor}>
              {classRoom.name} {!userIsTeacher && `Prof: ${teacher.name}`}
            </BaseText>
            <BaseContainer flexDirection="row">
              <FontAwesome name="child" size={20} color={textStyleColor} />
              <BaseText marginLeft="7px" color={textStyleColor}>
                {classRoom.members.length}
              </BaseText>
              <FontAwesome
                style={{ marginLeft: 10 }}
                name="wpforms"
                size={22}
                color={textStyleColor}
              />
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
          <BaseText color={textStyleColor}>{classRoom.description}</BaseText>
        </BaseContainer>
        <BaseContainer bottom={10} right="10px" position="absolute">
          <BaseText color={textStyleColor} fontSize={"11.4px"}>
            Código: {classRoom.code}
          </BaseText>
        </BaseContainer>
      </BaseContainer>
    </TouchableClassContainer>
  );
};

export default ClassRoomItem;

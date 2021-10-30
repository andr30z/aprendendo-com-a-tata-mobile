import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import { ROUTES_NAME } from "../../Routes/MainStackNavigation/RoutesName";
import { ButtonBeginActivty } from "./Styles";
type Props = NativeStackScreenProps<MainStackParamList, "DETAILS">;

const ActivityDetails: React.FC<Props> = ({ route, navigation }) => {
  const { activity } = route.params;
  return (
    <BaseContainer
      flex={1}
      align="center"
      justify="center"
      flexDirection="column"
    >
      <BaseText
        marginBottom="25px"
        color="black"
        fontSize="25px"
        align="center"
      >
        {activity.name}
      </BaseText>
      <ButtonBeginActivty
        onPress={() =>
          navigation.navigate(ROUTES_NAME.ACTIVITY_PLAY, {
            activity,
          })
        }
      >
        <BaseText marginRight="10px" align="center" fontSize="25px">
          COMEÇAR
        </BaseText>
        <AntDesign name="playcircleo" size={30} color="#fff" />
      </ButtonBeginActivty>
    </BaseContainer>
  );
};

export default ActivityDetails;

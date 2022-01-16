import React from "react";
import Button from "../Button/Button.Component";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { ActivityResult } from "../../Interfaces/index";
import WithModal from "../WithModal/WithModal.Component";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
import ActivityResultStars from "../ActivityResultStars/ActivityResultStars.Component";
import { useScreenOrientation } from "../../Hooks";
import * as ScreenOrientation from "expo-screen-orientation";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
interface ShowActivityResultModalProps {
  completedActivityResult: ActivityResult | null;
  routeIndexToReturnOnFinish?: number;
  navigation: StackNavigationProp<MainStackParamList, keyof MainStackParamList>;
}
/**
 *
 * @author andr3z0
 **/
export const ShowActivityResultModal = WithModal<ShowActivityResultModalProps>(
  ({ completedActivityResult, routeIndexToReturnOnFinish, navigation }) => {
    const { currentOrientation } = useScreenOrientation();
    console.log(currentOrientation);
    const currentOrientationIsLeft =
      currentOrientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT;
      console.log(currentOrientationIsLeft)
    return (
      <BottomSheetScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flex: currentOrientationIsLeft ? 0 : 1,
          paddingBottom: currentOrientationIsLeft ? 30 : undefined,
        }}
      >
        {completedActivityResult && (
          <BaseContainer
            flex={1}
            align="center"
            justify="center"
            flexDirection="column"
          >
            <BaseText fontSize="15px" color="#000">
              Atividade concluída com sucesso!
            </BaseText>
            <BaseText marginVertical="9px" fontSize="15px" color="#000">
              {completedActivityResult.activity.name}
            </BaseText>
            <BaseText marginBottom="9px" fontSize="20px" color="#000">
              Resultado:
            </BaseText>
            <ActivityResultStars
              starSize={30}
              result={completedActivityResult.result}
            />
            <Button
              buttonTitle="Voltar"
              buttonHeight="55px"
              buttonWidth="130px"
              containerStyles={{
                marginTop: 30,
              }}
              onPress={() => {
                navigation.pop(routeIndexToReturnOnFinish || 1);
              }}
            />
          </BaseContainer>
        )}
      </BottomSheetScrollView>
    );
  }
);
export default ShowActivityResultModal;

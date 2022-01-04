import React from "react"
import Button from "../Button/Button.Component";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ActivityResult } from "../../Interfaces/index";
import WithModal from "../WithModal/WithModal.Component";
import { StackNavigationProp } from "@react-navigation/stack";
import { MainStackParamList } from "../../Routes/MainStackNavigation/Interfaces";
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
    return (
      <>
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
              Resultado: {completedActivityResult.result}/5
            </BaseText>
            <Button
              buttonTitle="Voltar"
              buttonHeight="55px"
              buttonWidth="130px"
              onPress={() => {
                navigation.pop(routeIndexToReturnOnFinish || 1);
              }}
            />
          </BaseContainer>
        )}
      </>
    );
  }
);
export default ShowActivityResultModal;

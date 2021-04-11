import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Button, StatusBar } from "react-native";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { ROUTES_NAME } from "../../Routes/InitialStack/RoutesName";

const Initial: React.FC = ({ children }) => {
  const navigation = useNavigation();
  return (
    <BaseContainer style={{ backgroundColor: "#8F86E3", flex: 1 }}>
      <StatusBar backgroundColor="#8F86E3" translucent />
      <Button
        title="MAIN BOTTOM"
        onPress={() => navigation.navigate(ROUTES_NAME.APP_CONTENT)}
      />
    </BaseContainer>
  );
};

export default Initial;

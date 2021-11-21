import React from "react";
import { View, Text } from "react-native";
import { UserForm } from "../../Components";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";

/**
 * User page
 * @author andr30z
 **/
const User: React.FC = () => {
  return (
    <BaseContainer flex={1}>
      <UserForm />
    </BaseContainer>
  );
};

export default User;

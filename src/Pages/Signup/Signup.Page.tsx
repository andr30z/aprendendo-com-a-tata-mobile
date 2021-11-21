import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import Toast from "react-native-toast-message";
import { UserForm } from "../../Components";
import { InitialStackParamsList } from "../../Routes/InitialStack/Interfaces";

/**
 * Signup page
 * @author andr3z0
 **/
const Signup: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<InitialStackParamsList>>();
  const onSuccessSave = useCallback(() => {
    Toast.show({ text1: "Cadrastro realizado com sucesso" });
    navigation.goBack();
  }, [navigation]);
  return (
    <>
      <StatusBar backgroundColor="#9188E5" />
      <UserForm onSuccessSave={onSuccessSave} />
    </>
  );
};

export default Signup;

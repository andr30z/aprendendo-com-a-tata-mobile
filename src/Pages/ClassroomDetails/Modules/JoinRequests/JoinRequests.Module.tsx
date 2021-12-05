import React, { useCallback } from "react";
import Toast from "react-native-toast-message";
import { Button, ProfilePhoto, WithSpinner } from "../../../../Components";
import { useClassroomContext } from "../../../../Contexts";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { useBoolean, useCancellablePromise } from "../../../../Hooks";
import { UserInterface } from "../../../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../../../Services";
import { formatFilePathUrl, showError } from "../../../../Utils";
import { Ionicons } from "@expo/vector-icons";
interface JoinRequestsProps {
  pendingJoinRequests: Array<UserInterface>;
}
const btnTextStyles = {
  fontSize: "13px",
};
const ButtonsContainerWithSpinner = WithSpinner<{
  request: UserInterface;
  onApprove: (user: UserInterface) => void;
  onRefuse: (user: UserInterface) => void;
}>(({ request, onApprove, onRefuse }) => {
  const { primaryTheme } = useClassroomContext();
  return (
    <BaseContainer flexDirection="column">
      <Button
        buttonHeight="29px"
        buttonTitle="Aprovar"
        buttonWidth="120px"
        backgroundColor={primaryTheme}
        textStyles={btnTextStyles}
        onPress={() => onApprove(request)}
      />
      <Button
        backgroundColor={primaryTheme}
        buttonHeight="29px"
        textStyles={btnTextStyles}
        buttonTitle="Recusar"
        containerStyles={{ marginTop: 5 }}
        buttonWidth="120px"
        onPress={() => onRefuse(request)}
      />
    </BaseContainer>
  );
});

/**
 * @param members class members array.
 * @author andr3z0
 **/
const JoinRequests: React.FC<JoinRequestsProps> = ({ pendingJoinRequests }) => {
  const { value: isApprovingOrRefusing, setTrue, setFalse } = useBoolean();
  const { classroom, getClassroom, primaryTheme, textTheme } =
    useClassroomContext();
  const { cancellablePromise } = useCancellablePromise();
  const promiseResolve = (
    promiseToResolve: Promise<any>,
    isRefuse: boolean = false
  ) => {
    promiseToResolve
      .then(() => {
        Toast.show({
          text1: `Pedido ${isRefuse ? "recusado" : "aprovado"} com sucesso!`,
        });
        getClassroom();
      })
      .catch(showError)
      .finally(setFalse);
  };
  const onApprove = useCallback(
    (user: UserInterface) => {
      setTrue();
      promiseResolve(
        cancellablePromise(
          baseApi.post(
            baseApiRoutes.CLASSROOM_JOIN_REQUEST_RESOLVE(
              classroom?._id as string,
              user?._id as string
            )
          ),
          false
        )
      );
    },
    [classroom]
  );
  const onRefuse = useCallback(
    (user: UserInterface) => {
      setTrue();
      promiseResolve(
        cancellablePromise(
          baseApi.delete(
            baseApiRoutes.CLASSROOM_JOIN_REQUEST_RESOLVE(
              classroom?._id as string,
              user?._id as string
            )
          ),
          false
        ),
        true
      );
    },
    [classroom]
  );

  if (pendingJoinRequests.length == 0)
    return (
      <BaseContainer
        backgroundColor={primaryTheme}
        marginHorizontal="10px"
        borderRadius="10px"
        paddingHorizontal="10px"
        align="center"
        justify="center"
        height="250px"
        flex={1}
        flexDirection="column"
      >
        <BaseText align="center" color={textTheme} fontSize="20px">
          Não há pedidos pendentes nessa sala
        </BaseText>
        <Ionicons name="notifications-off-outline" size={50} color={textTheme} />
      </BaseContainer>
    );
  return (
    <>
      <BaseContainer align="center" justify="center">
        <BaseText
          fontWeight="bold"
          fontSize="20px"
          align="center"
          color={textTheme}
          style={{
            backgroundColor: primaryTheme,
            borderRadius: 10,
            padding: 5,
          }}
          marginBottom="18px"
        >
          Pedidos pendentes
        </BaseText>
      </BaseContainer>
      {pendingJoinRequests.map((request) => (
        <BaseContainer
          key={request._id}
          width="100%"
          height="100px"
          paddingHorizontal="2%"
          marginVertical="13px"
          justify="space-evenly"
          flexDirection="row"
          backgroundColor="#fff"
          align="center"
        >
          <ProfilePhoto
            size={50}
            source={{
              uri:
                formatFilePathUrl(request.profilePhoto?.path) ||
                "https://imgur.com/H5PWtBp.png",
            }}
          />
          <BaseContainer
            flexDirection="column"
            flex={1}
            align="baseline"
            marginHorizontal="9px"
          >
            <BaseText
              ellipsizeMode="tail"
              numberOfLines={1}
              align="left"
              color={textTheme}
              fontSize="17px"
            >
              {request.name}
            </BaseText>
            <BaseText
              ellipsizeMode="tail"
              numberOfLines={1}
              align="left"
              color={textTheme}
              fontSize="17px"
            >
              {request.email}
              {request.email}
              {request.email}
            </BaseText>
          </BaseContainer>
          <ButtonsContainerWithSpinner
            onApprove={onApprove}
            onRefuse={onRefuse}
            request={request}
            spinnerColor={primaryTheme}
            spinnerSize={30}
            isLoading={isApprovingOrRefusing}
          />
        </BaseContainer>
      ))}
    </>
  );
};

export default JoinRequests;

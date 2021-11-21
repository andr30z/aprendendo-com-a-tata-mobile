import {
  AntDesign, FontAwesome5,Feather,
  MaterialCommunityIcons
} from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, ScrollView } from "react-native";
import { Fade, Placeholder, PlaceholderMedia } from "rn-placeholder";
import * as yup from "yup";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useFileUpload } from "../../Hooks";
import { UserInterface, UserType } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { formatFilePathUrl } from "../../Utils";
import Button from "../Button/Button.Component";
import CardSelect from "../CardSelect/CardSelect.Component";
import ErrorComponent from "../ErrorComponent/ErrorComponent.Component";
import Input from "../Input/Input.Component";
import ProfilePhotoWithOverlay from "../ProfilePhotoWithOverlay/ProfilePhotoWithOverlay.Component";
import WithSpinner from "../WithSpinner/WithSpinner.Component";
import { styles } from "./Styles";

export interface UserFormProps {
  onSuccessSave?: () => void;
}

interface UserFormFields extends Omit<UserInterface, "profilePhoto"> {
  devicePhotoURI?: string;
  profilePhoto: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("O campo deve ser um email!")
    .required("O campo email é obrigatório!"),
  name: yup.string().required("O nome da classe é obrigatório!"),
  password: yup
    .string()
    .required("A senha é requerida!")
    .min(8, "O campo de senha deve conter no minimo 8 caracteres!"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais!"),
});

const ProfilePhotoWithSpinner = WithSpinner(ProfilePhotoWithOverlay, () => (
  <Placeholder
    style={{
      width: 100,
      height: 100,
    }}
    Animation={Fade}
  >
    <PlaceholderMedia
      style={{ width: "100%", height: "100%", borderRadius: 50 }}
    />
  </Placeholder>
));
const UserForm: React.FC<UserFormProps> = ({ onSuccessSave }) => {
  const color = "#9188E5";
  const {
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UserFormFields>({
    defaultValues: {
      profilePhoto: "",
      devicePhotoURI: "",
      email: "",
      name: "",
      type: UserType.C,
      passwordConfirmation: "",
      password: "",
    },
    mode: "all",
    resolver: yupResolver(schema),
  });
  const { onSubmitUpload, isLoadingFile } = useFileUpload((res, file) => {
    setValue("devicePhotoURI", file.uri, { shouldValidate: true });
    setValue("profilePhoto", res.data.path);
  });
  const onSubmit = (fields: UserFormFields) => {
    const promise = fields._id
      ? baseApi.put(baseApiRoutes.USERS + "/" + fields._id, fields)
      : baseApi.post(baseApiRoutes.USERS, fields);

    promise
      .then((res) => {
        if (onSuccessSave) onSuccessSave();

        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.response.data, "ON SUB");
      });
  };

  const { profilePhoto, devicePhotoURI, type, _id } = getValues();
  const uri =
    profilePhoto && !devicePhotoURI
      ? formatFilePathUrl(profilePhoto)
      : devicePhotoURI;
  const navigation = useNavigation();
  return (
    <BaseContainer flex={1}>
      <Feather
        onPress={() => navigation.goBack()}
        style={styles.closeIcon}
        name="arrow-left"
        size={35}
        color="#fff"
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <BaseContainer
          height="260px"
          style={styles.baseContainer}
          align="center"
          justify="center"
          flexDirection="column"
          backgroundColor={color}
        >
          <BaseContainer
            height="110px"
            flex={0.5}
            flexDirection="column"
            justify="center"
            align="center"
          >
            <ProfilePhotoWithSpinner
              isLoading={isLoadingFile}
              onPress={onSubmitUpload}
              spinnerSize={100}
              spinnerColor="#fff"
              size={100}
              source={{ uri: uri }}
            />
            <ErrorComponent error={errors.profilePhoto?.message} />
          </BaseContainer>
          <Controller
            control={control}
            name="name"
            render={({ field: { ref, onChange, ...rest } }) => (
              <Input
                elevation={4}
                error={errors.name?.message}
                inputHeight={"33px"}
                withWrapper
                inputWidth={"65%"}
                onChangeText={(text) => onChange(text)}
                {...rest}
                style={styles.classNameInput}
                inputRef={ref}
                placeholder="Seu nome"
              />
            )}
          />
        </BaseContainer>
        <BaseContainer marginTop="50px" align="center" paddingHorizontal="5%">
          <Controller
            control={control}
            name="email"
            render={({ field: { ref, onChange, ...rest } }) => (
              <Input
                elevation={4}
                withWrapper
                keyboardType="email-address"
                error={errors.email?.message}
                wrapperStyles={{ flexDirection: "column", marginBottom: 20 }}
                inputHeight={"40px"}
                onChangeText={(text) => onChange(text)}
                inputWidth={"100%"}
                {...rest}
                inputRef={ref}
                placeholder="Email"
              />
            )}
          />
          <CardSelect
            selectedItemValue={type}
            primaryColor={color}
            activeColor={"green"}
            selectLabel="Você é:"
            cardItems={[
              {
                icon: (props: any) => <FontAwesome5 name="child" {...props} />,
                value: UserType.C,
                title: "Criança",
              },
              {
                icon: (props: any) => (
                  <FontAwesome5 name="chalkboard-teacher" {...props} />
                ),
                value: UserType.T,
                title: "Professor",
              },
              {
                icon: (props: any) => (
                  <MaterialCommunityIcons name="human-male-boy" {...props} />
                ),
                value: UserType.R,
                title: "Responsável",
              },
            ]}
            onPress={(x) => setValue("type", x.value, { shouldValidate: true })}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { ref, onChange, ...rest } }) => (
              <Input
                elevation={4}
                withWrapper
                keyboardType="email-address"
                error={errors.password?.message}
                secureTextEntry
                wrapperStyles={{
                  flexDirection: "column",
                  marginBottom: 20,
                  marginTop: 20,
                }}
                inputHeight={"40px"}
                onChangeText={(text) => onChange(text)}
                inputWidth={"100%"}
                {...rest}
                inputRef={ref}
                placeholder="Senha"
              />
            )}
          />
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { ref, onChange, ...rest } }) => (
              <Input
                elevation={4}
                withWrapper
                secureTextEntry
                error={errors.passwordConfirmation?.message}
                wrapperStyles={{ flexDirection: "column", marginBottom: 20 }}
                inputHeight={"40px"}
                onChangeText={(text) => onChange(text)}
                inputWidth={"100%"}
                {...rest}
                inputRef={ref}
                placeholder="Confirmação de Senha"
              />
            )}
          />
        </BaseContainer>

        <BaseContainer
          align="center"
          justify="center"
          width="100%"
          style={styles.btnSubmitContainer}
        >
          <Button
            disabled={isSubmitting}
            containerStyles={styles.btnSubmit}
            onPress={handleSubmit(onSubmit)}
            buttonHeight="40px"
            backgroundColor={color}
            buttonTitle={isSubmitting ? undefined : "Salvar"}
          >
            {isSubmitting && (
              <ActivityIndicator color={color || "white"} size={20} />
            )}
          </Button>
        </BaseContainer>
      </ScrollView>
    </BaseContainer>
  );
};

export default UserForm;

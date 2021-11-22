import { EvilIcons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { Fade, Placeholder, PlaceholderMedia } from "rn-placeholder";
import * as yup from "yup";
import { useUserContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useFileUpload, useModalSheetRef } from "../../Hooks";
import { baseApi, baseApiRoutes } from "../../Services";
import { formatFilePathUrl } from "../../Utils";
import Button from "../Button/Button.Component";
import ColorSelect, {
  defaultColorSelectItems,
} from "../ColorSelect/ColorSelect.Component";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import ErrorComponent from "../ErrorComponent/ErrorComponent.Component";
import Input from "../Input/Input.Component";
import ProfilePhotoWithOverlay from "../ProfilePhotoWithOverlay/ProfilePhotoWithOverlay.Component";
import WithModal from "../WithModal/WithModal.Component";
import WithSpinner from "../WithSpinner/WithSpinner.Component";
import { styles } from "./Styles";
import { Portal, PortalHost } from "@gorhom/portal";
const schema = yup.object().shape({
  classPhoto: yup.string().required("A foto da classe é obrigatória!"),
  description: yup.string().required("A descrição é obrigatória!"),
  name: yup.string().required("O nome da classe é obrigatório!"),
});
export interface FormFields {
  teacherId: string;
  name: string;
  classPhoto: string;
  _id?: string;
  description: string;
  color: string;
  textColor: string;
  devicePhotoURI: string;
}
export interface ClassroomFormFieldsProps {
  classroom?: FormFields;
  onSuccessSave?: () => void;
  onSuccessDelete?: () => void;
}

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
const ClassroomFormFields = WithModal<ClassroomFormFieldsProps>(
  ({ modalSheetRef, classroom, onSuccessSave, onSuccessDelete }) => {
    const { user } = useUserContext();
    const {
      setValue,
      control,
      getValues,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm<FormFields>({
      defaultValues: classroom || {
        color: "#9188E5",
        textColor: "#fff",
        name: "",
        description: "",
        classPhoto: "",
        devicePhotoURI: "",
        teacherId: user?._id,
      },
      mode: "all",
      resolver: yupResolver(schema),
    });
    const { sheetRef, open, close } = useModalSheetRef();
    const { onSubmitUpload, isLoadingFile } = useFileUpload((res, file) => {
      setValue("devicePhotoURI", file.uri, { shouldValidate: true });
      setValue("classPhoto", res.data.path);
    });
    const onDelete = async () => {
      return baseApi
        .delete(baseApiRoutes.CLASSROOMS + "/" + _id)
        .then((_) => {
          Toast.show({ text1: "Classe deletada com sucesso!" });
          if (onSuccessDelete) onSuccessDelete();
        })
        .catch((e) =>
          Toast.show({
            type: "error",
            text1: "Ocorreu um erro ao deletar a classe",
          })
        )
        .finally(close);
    };
    const onSubmit = (fields: FormFields) => {
      const route = fields._id
        ? baseApiRoutes.CLASSROOMS + "/" + fields._id
        : baseApiRoutes.CLASSROOMS;
      const promise = fields._id
        ? baseApi.put(route, fields)
        : baseApi.post(route, fields);

      promise
        .then((res) => {
          if (onSuccessSave) onSuccessSave();

          console.log(res.data);
        })
        .catch((e) => {
          console.log(e.response.data, "ON SUB");
        });
    };

    const onPressColor = (key: string) => (color: string) => {
      setValue(key as any, color, { shouldValidate: true });
    };

    const { classPhoto, devicePhotoURI, color, textColor, _id } = getValues();
    const uri =
      classPhoto && !devicePhotoURI
        ? formatFilePathUrl(classPhoto)
        : devicePhotoURI;
    const portalKey = "INNER_MODAL_CLASSROOM";
    return (
      <BaseContainer flex={1}>
        <ConfirmationModal
          modalRef={sheetRef}
          confirmationQuestion="Deseja realmente deletar a classe?"
          onConfirm={onDelete}
          portalLocation={portalKey}
          sheetStyle={{ zIndex: 100 }}
        />
        <PortalHost name={portalKey} />
        <EvilIcons
          onPress={() => modalSheetRef.current?.close()}
          style={styles.closeIcon}
          name="close"
          size={50}
          color={textColor}
        />
        {_id && (
          <EvilIcons
            style={styles.iconDelete}
            name="trash"
            size={50}
            onPress={open}
            color={textColor}
          />
        )}
        <BottomSheetScrollView style={[{ paddingBottom: 100 }]}>
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
              <ErrorComponent error={errors.classPhoto?.message} />
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
                  placeholder="Nome da classe"
                />
              )}
            />
          </BaseContainer>
          <BaseContainer marginTop="50px" align="center" paddingHorizontal="5%">
            <Controller
              control={control}
              name="description"
              render={({ field: { ref, onChange, ...rest } }) => (
                <Input
                  elevation={4}
                  withWrapper
                  error={errors.description?.message}
                  wrapperStyles={{ flexDirection: "column" }}
                  inputHeight={"40px"}
                  onChangeText={(text) => onChange(text)}
                  inputWidth={"100%"}
                  {...rest}
                  inputRef={ref}
                  placeholder="Descrição"
                />
              )}
            />
            <ColorSelect
              onPress={onPressColor("color")}
              label="Cor primária"
              color={color}
              colorsToSelect={defaultColorSelectItems.filter(
                (x) => x !== "#fff"
              )}
              containerStyles={{ marginTop: 30 }}
            />
            <ColorSelect
              onPress={onPressColor("textColor")}
              label="Cor secundária"
              color={textColor}
              containerStyles={{ marginTop: 30 }}
            />
          </BaseContainer>
          <BaseContainer height="50px" />
        </BottomSheetScrollView>
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
      </BaseContainer>
    );
  }
);

export default ClassroomFormFields;

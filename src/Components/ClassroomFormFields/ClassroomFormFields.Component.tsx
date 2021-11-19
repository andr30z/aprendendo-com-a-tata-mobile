import { EvilIcons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { Fade, Placeholder, PlaceholderMedia } from "rn-placeholder";
import Button from "../Button/Button.Component";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useCancellablePromise } from "../../Hooks";
import { baseApi, baseApiRoutes } from "../../Services";
import { formatFilePathUrl } from "../../Utils";
import ColorSelect, {
  defaultColorSelectItems,
} from "../ColorSelect/ColorSelect.Component";
import Input from "../Input/Input.Component";
import ProfilePhotoWithOverlay from "../ProfilePhotoWithOverlay/ProfilePhotoWithOverlay.Component";
import WithModal from "../WithModal/WithModal.Component";
import WithSpinner from "../WithSpinner/WithSpinner.Component";
import { styles } from "./Styles";

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
  ({ modalSheetRef, classroom, onSuccessSave }) => {
    const {
      setValue,
      control,
      getValues,
      handleSubmit,
      formState: { errors },
    } = useForm<FormFields>({
      defaultValues: classroom || {
        color: "#9188E5",
        textColor: "#fff",
        name: "",
        description: "",
        classPhoto: "",
        devicePhotoURI: "",
      },
    });
    const { cancellablePromise } = useCancellablePromise();
    const { setTrue, setFalse, value } = useBoolean(false);
    const onPressProfilePhoto = useCallback(async () => {
      const file = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (file.cancelled) return;
      const formData = new FormData();
      const name = file.uri.split("/").pop();
      if (!name) return;
      formData.append("file", {
        uri: file.uri,
        name,
        type: "multipart/form-data",
      } as any);
      setTrue();
      cancellablePromise(
        baseApi.post<{ path: string }>(baseApiRoutes.FILE_UPLOAD, formData)
      )
        .then((res) => {
          setValue("devicePhotoURI", file.uri, { shouldValidate: true });
          setValue("classPhoto", res.data.path);
          console.log(res.data);
          setFalse();
        })
        .catch((e) => {
          setFalse();
        });
    }, []);

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
          console.log(e.response);
        });
    };

    const onPressColor = (key: string) => (color: string) => {
      setValue(key as any, color, { shouldValidate: true });
    };

    const { classPhoto, devicePhotoURI, color, textColor } = getValues();
    const uri =
      classPhoto && !devicePhotoURI
        ? formatFilePathUrl(classPhoto)
        : devicePhotoURI;
    return (
      <BaseContainer flex={1}>
        <EvilIcons
          onPress={() => modalSheetRef.current?.close()}
          style={styles.closeIcon}
          name="close"
          size={50}
          color="#fff"
        />
        <BottomSheetScrollView style={[{ paddingBottom: 100 }]}>
          <BaseContainer
            height="200px"
            style={styles.baseContainer}
            align="center"
            justify="center"
            flexDirection="column"
            backgroundColor={color}
          >
            <ProfilePhotoWithSpinner
              isLoading={value}
              spinnerSize={100}
              spinnerColor="#fff"
              onPress={onPressProfilePhoto}
              size={100}
              source={{ uri: uri }}
            />
            <Controller
              control={control}
              name="name"
              render={({ field: { ref, ...rest } }) => (
                <Input
                  elevation={4}
                  inputHeight={"33px"}
                  inputWidth={"65%"}
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
              render={({ field: { ref, ...rest } }) => (
                <Input
                  elevation={4}
                  inputHeight={"40px"}
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
            containerStyles={styles.btnSubmit}
            onPress={handleSubmit(onSubmit)}
            buttonHeight="40px"
            buttonTitle="Salvar"
            backgroundColor={color}
          />
        </BaseContainer>
      </BaseContainer>
    );
  }
);

export default ClassroomFormFields;

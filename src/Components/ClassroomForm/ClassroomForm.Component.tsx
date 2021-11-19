import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { SharedWithModalProps } from "../../Interfaces/WithModal";
import { formatFilePathUrl } from "../../Utils";
import Input from "../Input/Input.Component";
import ProfilePhotoWithOverlay from "../ProfilePhotoWithOverlay/ProfilePhotoWithOverlay.Component";
import WithModal from "../WithModal/WithModal.Component";
import { styles } from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { baseApi, baseApiRoutes } from "../../Services";
interface ClassroomProps extends SharedWithModalProps {}
interface FormFields {
  teacherId: string;
  name: string;
  classPhoto: string;
  description: string;
  color: string;
  textColor: string;
  devicePhotoURI: string;
  //   tags: Array<string>;
}
const ClassroomFormWithModal = WithModal(({ modalSheetRef }) => {
  const {
    setValue,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      color: "#9188E5",
      textColor: "#fff",
      name: "",
      description: "",
      classPhoto: "",
      devicePhotoURI: "",
    },
  });
  const onPressProfilePhoto = useCallback(async () => {
    const file = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (file.cancelled) return;
    console.log(file);
    const formData = new FormData();
    const name = file.uri.split("/").pop();
    if (!name) return;
    formData.append("file", {
      uri: file.uri,
      name,
      type: "multipart/form-data",
    } as any);
    baseApi
      .post<{ path: string }>(baseApiRoutes.FILE_UPLOAD, formData)
      .then((res) => {
        setValue("devicePhotoURI", file.uri, { shouldValidate: true });
        setValue("classPhoto", res.data.path);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e + "EEEEEE");
      });
  }, []);

  const classColor = getValues("color");
  const classPhoto = getValues("classPhoto");
  const deviceUri = getValues("devicePhotoURI");
  console.log(deviceUri);
  return (
    <ScrollContainer style={{ paddingBottom: 30 }}>
      <BaseContainer
        height="200px"
        align="center"
        justify="center"
        flexDirection="column"
        backgroundColor={classColor}
        style={{
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <ProfilePhotoWithOverlay
          onPress={onPressProfilePhoto}
          size={100}
          source={{ uri: deviceUri }}
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

      <BaseContainer
        marginTop="15px"
        align="center"
        style={{ minHeight: 100 }}
        paddingHorizontal="5%"
      >
        <Controller
          control={control}
          name="description"
          render={({ field: { ref, ...rest } }) => (
            <Input
              elevation={4}
              inputHeight={"40px"}
              inputWidth={"95%"}
              {...rest}
              inputRef={ref}
              placeholder="Descrição"
            />
          )}
        />
      </BaseContainer>
    </ScrollContainer>
  );
});

/**
 * @param members class members array.
 * @author andr3z0
 **/
const ClassroomForm: React.FC<ClassroomProps> = ({
  modalSheetRef,
  children,
}) => {
  const props = useMemo(
    () => ({
      snapPoints: ["90%"],
      modalSheetRef,
      children,
      style: {
        marginHorizontal: 10,
        backgroundColor: "transparent",
        elevation: 10,
      },
      backdropComponent: (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          pressBehavior={"close"}
        />
      ),
      handleComponent: () => null,
    }),
    [children]
  );
  return <ClassroomFormWithModal withModalProps={props} />;
};

export default ClassroomForm;

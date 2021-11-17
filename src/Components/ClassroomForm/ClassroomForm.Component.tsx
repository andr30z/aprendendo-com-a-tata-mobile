import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  BaseContainer,
  ScrollContainer,
} from "../../GlobalStyles/Containers.Style";
import { SharedWithModalProps } from "../../Interfaces/WithModal";
import Input from "../Input/Input.Component";
import WithModal from "../WithModal/WithModal.Component";
interface ClassroomProps extends SharedWithModalProps {}
interface FormFields {
  teacherId: string;
  name: string;
  classPhoto: string;
  description: string;
  color: string;
  textColor: string;
  //   tags: Array<string>;
}
const ClassroomFormWithModal = WithModal(({ modalSheetRef }) => {
  const {
    register,
    setValue,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      color: "#9188E5",
      textColor: "#fff",
      name: "",
      description: "",
    },
  });

  const classColor = getValues("color");

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
        <Controller
          control={control}
          name="name"
          render={({ field: { ref, ...rest } }) => (
            <Input
              elevation={4}
              inputHeight={"40px"}
              inputWidth={"65%"}
              {...rest}
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

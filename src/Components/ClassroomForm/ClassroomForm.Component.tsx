import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { SharedWithModalProps } from "../../Interfaces/WithModal";
import ClassroomFormFields, {
  ClassroomFormFieldsProps,
} from "../ClassroomFormFields/ClassroomFormFields.Component";
interface ClassroomProps extends SharedWithModalProps {}

/**
 * @param members class members array.
 * @author andr30z
 **/
const ClassroomForm: React.FC<ClassroomProps & ClassroomFormFieldsProps> = ({
  modalSheetRef,
  children,
  classroom,
  onSuccessSave,
  onSuccessDelete
}) => {
  const props = useMemo(
    () => ({
      snapPoints: ["90%"],
      modalSheetRef,
      children,
      style: {
        backgroundColor: "transparent",
        // elevation: 10,
        position: "absolute",
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
  return (
    <ClassroomFormFields
      classroom={classroom}
      onSuccessSave={onSuccessSave}
      withModalProps={props}
      onSuccessDelete={onSuccessDelete}
    />
  );
};

export default ClassroomForm;

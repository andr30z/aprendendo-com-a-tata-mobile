import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { SharedWithModalProps } from "../../Interfaces/WithModal";
import ClassroomFormFields, {
  ClassroomFormFieldsProps,
} from "../ClassroomFormFields/ClassroomFormFields.Component";
interface ClassroomProps extends SharedWithModalProps {}

/**
 * @param members class members array.
 * @author andr3z0
 **/
const ClassroomForm: React.FC<ClassroomProps & ClassroomFormFieldsProps> = ({
  modalSheetRef,
  children,
  classroom,
  onSuccessSave,
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
        position: "relative",
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
    />
  );
};

export default ClassroomForm;

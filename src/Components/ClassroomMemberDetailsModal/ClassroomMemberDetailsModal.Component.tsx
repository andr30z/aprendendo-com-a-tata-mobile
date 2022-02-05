import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { UserInterface, ClassRoomInterface } from "../../Interfaces/index";
import WithModal from "../WithModal/WithModal.Component";
import { formatFilePathUrl, showError } from "../../Utils";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { AntDesign } from "@expo/vector-icons";
import { useCancellablePromise, useModalSheetRef } from "../../Hooks";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import { baseApi, baseApiRoutes } from "../../Services";
import Toast from "react-native-toast-message";
import { PortalHost } from "@gorhom/portal";
import { useUserContext } from "../../Contexts";

interface ClassroomMemberDetailsModalProps {
  child: UserInterface;
  classroom: ClassRoomInterface;
  onRemove: () => void;
}
function getAge(dateString: string) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
/**
 * Classroom members details
 * @author andr30z
 **/
const ClassroomMemberDetailsModal = WithModal<ClassroomMemberDetailsModalProps>(
  ({ child, classroom, onRemove }) => {
    const { sheetRef, open } = useModalSheetRef();
    const { userIsTeacher } = useUserContext();
    const { cancellablePromise } = useCancellablePromise();
    const onConfirmDelete = useCallback(async () => {
      return cancellablePromise(
        baseApi.delete(baseApiRoutes.CLASSROOMS_USERS(classroom._id, child._id))
      )
        .then(() => {
          Toast.show({ text1: "A criança foi removida da sala com sucesso." });
          onRemove();
        })
        .catch(showError);
    }, [child, classroom]);
    const portalLocation = "INNER_PORTAL_DETAILS";
    return (
      <BaseContainer
        backgroundColor={classroom.textColor}
        // borderRadius="10px"
        flexDirection="column"
        justify="center"
        align="center"
      >
        <PortalHost name={portalLocation} />
        <ConfirmationModal
          confirmationQuestion="Deseja realmente remover a criança desta sala?"
          modalRef={sheetRef}
          onConfirm={onConfirmDelete}
          sheetStyle={{ zIndex: 20 }}
          bottomInset={50}
          snapPoints={["50%"]}
          portalLocation={portalLocation}
        />
        <BaseContainer justify="center" flex={1}>
          <ProfilePhoto
            size={140}
            source={{
              uri:
                formatFilePathUrl(child.profilePhoto?.path) ||
                "https://imgur.com/H5PWtBp.png",
            }}
          />
        </BaseContainer>
        <BaseContainer
          flex={1}
          align="center"
          justify="space-evenly"
          flexDirection="column"
        >
          <BaseText fontSize="20px" numberOfLines={2} color={classroom.color}>
            {child.name}
          </BaseText>
          <BaseText fontSize="20px" numberOfLines={2} color={classroom.color}>
            {child.email}
          </BaseText>
          <BaseText fontSize="20px" color={classroom.color}>
            Idade: {getAge(child.birthday)} anos
          </BaseText>
        </BaseContainer>
        {userIsTeacher && (
          <BaseContainer flex={0.5} marginTop="10px">
            <AntDesign
              onPress={open}
              name="deleteuser"
              size={60}
              color={classroom.color}
            />
          </BaseContainer>
        )}
      </BaseContainer>
    );
  }
);

export default ClassroomMemberDetailsModal;

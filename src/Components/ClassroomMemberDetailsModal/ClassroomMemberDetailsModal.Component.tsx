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
import { useModalSheetRef } from "../../Hooks";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal.Component";
import { baseApi, baseApiRoutes } from "../../Services";
import Toast from "react-native-toast-message";
import { PortalHost } from "@gorhom/portal";

interface ClassroomMemberDetailsModalProps {
  child: UserInterface;
  classroom: ClassRoomInterface;
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
  ({ child, classroom }) => {
    const { sheetRef, open } = useModalSheetRef();
    const onConfirmDelete = useCallback(async () => {
      baseApi
        .delete(baseApiRoutes.CLASSROOMS_USERS(classroom._id, child._id))
        .then(() => {
          Toast.show({ text1: "A criança foi removida da sala com sucesso." });
        })
        .catch(showError);
    }, [child, classroom]);
    const portalLocation = "INNER_PORTAL_DETAILS";
    return (
      <BaseContainer flexDirection="column" justify="center" align="center">
        <PortalHost name={portalLocation} />
        <ConfirmationModal
          confirmationQuestion="Deseja realmente remover a criança desta sala?"
          modalRef={sheetRef}
          onConfirm={onConfirmDelete}
          portalLocation={portalLocation}
        />
        <ProfilePhoto
          size={30}
          source={{
            uri:
              formatFilePathUrl(child.profilePhoto?.path) ||
              "https://imgur.com/H5PWtBp.png",
          }}
        />
        <BaseContainer flexDirection="column">
          <BaseText numberOfLines={2} color={classroom.textColor}>
            {child.name}
          </BaseText>
          <BaseText numberOfLines={2} color={classroom.textColor}>
            {child.email}
          </BaseText>
          <BaseText color={classroom.textColor}>
            Idade: {getAge(child.birthday)}
          </BaseText>
        </BaseContainer>
        <BaseContainer>
          <AntDesign
            onPress={open}
            name="deleteuser"
            size={30}
            color={classroom.color}
          />
        </BaseContainer>
      </BaseContainer>
    );
  }
);

export default ClassroomMemberDetailsModal;

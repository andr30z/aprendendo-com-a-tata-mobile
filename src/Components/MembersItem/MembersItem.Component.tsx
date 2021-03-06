import React, { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useClassroomContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useModalSheetRef } from "../../Hooks";
import { ClassRoomInterface, UserInterface } from "../../Interfaces/index";
import { formatFilePathUrl } from "../../Utils";
import Badge from "../Badge/Badge.Component";
import ClassroomMemberDetailsModal from "../ClassroomMemberDetailsModal/ClassroomMemberDetailsModal.Component";
import ProfilePhoto from "../ProfilePhoto/ProfilePhoto.Component";
import { styles } from "./Styles";

interface MembersItemProps {
  member: UserInterface;
}
const MembersItem: React.FC<MembersItemProps> = ({ member }) => {
  const { width } = useWindowDimensions();
  const { classroom, primaryTheme, textTheme, getClassroom } =
    useClassroomContext();
  const { sheetRef, open, close } = useModalSheetRef();
  const onRemove = useCallback(() => {
    getClassroom();
    close();
  }, [getClassroom, close]);
  return (
    <TouchableOpacity onPress={open}>
      <ClassroomMemberDetailsModal
        child={member}
        onRemove={onRemove}
        withModalProps={{
          modalSheetRef: sheetRef,
          snapPoints: ["80%"],
          children: null,
          style: { marginHorizontal: "5%" },
          bottomInset: 40,
          handleStyle: {
            backgroundColor: textTheme,
          },
          handleIndicatorStyle: {
            backgroundColor: primaryTheme,
          },
        }}
        classroom={classroom as ClassRoomInterface}
      />
      <BaseContainer
        width={`${width * 0.25}px`}
        height="150px"
        marginHorizontal="8px"
        marginVertical="8px"
      >
        <BaseContainer
          flex={1}
          align="center"
          flexDirection="column"
          justify="space-evenly"
        >
          <ProfilePhoto
            size={80}
            style={[styles.alignSelf, styles.profileStyles]}
            source={{
              uri:
                formatFilePathUrl(member.profilePhoto?.path) ||
                "https://imgur.com/H5PWtBp.png",
            }}
          />
          <Badge
            extraTextStyles={styles.badgeMemberFontStyle}
            pill
            textColor={textTheme}
            backgroundColor={primaryTheme}
            textAlign="center"
          >
            {member.name}
          </Badge>
        </BaseContainer>
      </BaseContainer>
    </TouchableOpacity>
  );
};
export default MembersItem;

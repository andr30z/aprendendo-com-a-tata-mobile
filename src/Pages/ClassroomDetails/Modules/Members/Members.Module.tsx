import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import {
  Badge,
  Button,
  MembersItem,
  ProfilePhoto,
} from "../../../../Components";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { Member } from "../../../../Interfaces/index";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Styles";
import { useClassroomContext } from "../../../../Contexts";
import { formatFilePathUrl } from "../../../../Utils";
interface MembersProps {
  members: Array<Member>;
}
/**
 * @param members class members array.
 * @author andr3z0
 **/
const Members: React.FC<MembersProps> = ({ members }) => {
  const { width } = useWindowDimensions();
  const { primaryTheme, textTheme } = useClassroomContext();

  if (members.length === 0)
    return (
      <BaseContainer
        height="300px"
        width="90%"
        flexDirection="column"
        justify="center"
        align="center"
        style={styles.emptyContainerStyle}
        backgroundColor={primaryTheme}
      >
        <BaseText
          fontWeight="bold"
          color={textTheme}
          align="center"
          fontSize="20px"
          marginBottom="10px"
        >
          Esta sala não possui nenhum membro
        </BaseText>
        <MaterialIcons name="child-care" size={80} color={textTheme} />
      </BaseContainer>
    );
  return (
    <>
      <BaseText
        style={[styles.titleStyles, styles.alignSelf]}
        fontWeight="bold"
        fontSize="20px"
        align="center"
        color={primaryTheme}
        marginBottom="18px"
      >
        {members.length} alunos
      </BaseText>
      <BaseContainer
        align="center"
        flexDirection="row"
        justify="center"
        flexWrap="wrap"
        style={styles.alignSelf}
        paddingHorizontal="1%"
        marginTop="15px"
      >
        {members.map((member) => (
          <MembersItem member={member} key={member._id} />
        ))}
      </BaseContainer>
    </>
  );
};

export default Members;

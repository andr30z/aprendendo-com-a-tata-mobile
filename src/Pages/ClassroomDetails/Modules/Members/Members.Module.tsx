import React from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { Badge, Button, ProfilePhoto } from "../../../../Components";
import { BaseText } from "../../../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../../../GlobalStyles/Containers.Style";
import { Member } from "../../../../Interfaces/index";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./Styles";
interface MembersProps {
  members: Array<Member>;
}
/**
 * @param members class members array.
 * @author andr3z0
 **/
const Members: React.FC<MembersProps> = ({ members }) => {
  const { width } = useWindowDimensions();

  if (members.length === 0)
    return (
      <BaseContainer
        height="300px"
        width="90%"
        flexDirection="column"
        justify="center"
        align="center"
        style={styles.emptyContainerStyle}
        backgroundColor="white"
      >
        <BaseText
          fontWeight="bold"
          color="#f7cc7f"
          align="center"
          fontSize="20px"
          marginBottom="10px"
        >
          Esta sala não possui nenhum membro
        </BaseText>
        <MaterialIcons name="child-care" size={80} color="#f7cc7f" />
        <Button
          containerStyles={styles.buttonStyles}
          buttonWidth="70%"
          buttonHeight="50px"
          backgroundColor="#f7cc7f"
          onPress={() => null}
          buttonTitle="Adicionar crianças"
        />
      </BaseContainer>
    );
  return (
    <>
      <BaseText
        style={[styles.titleStyles, styles.alignSelf]}
        fontWeight="bold"
        fontSize="20px"
        align="center"
        color="#f7cc7f"
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
      >
        {members.map((member, index) => (
          <Pressable onPress={() => null} key={index}>
            <BaseContainer
              width={`${width * 0.25}px`}
              height="100px"
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
                    uri: member.profilePhoto?.filePreview || "https://imgur.com/H5PWtBp.png",
                  }}
                />
                <Badge extraTextStyles={styles.badgeMemberFontStyle} pill textColor="#f7cc7f" textAlign="center">
                  {member.name}
                </Badge>
              </BaseContainer>
            </BaseContainer>
          </Pressable>
        ))}
      </BaseContainer>
    </>
  );
};

export default Members;

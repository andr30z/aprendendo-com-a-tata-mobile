import React from "react";
import { ScrollView } from "react-native";
import { ProfilePhoto } from "../../Components";
import { useUserContext } from "../../Contexts";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { formatFilePathUrl } from "../../Utils";
import { SettingsOptionsListing } from "./Modules";

/**
 * Settings page, thats where the user is going to select the options of the app, e.g.: themes, about section etc...
 * @author andr30z
 **/
const Settings: React.FC = () => {
  const { user } = useUserContext();
  return (
    <BaseContainer flex={1}>
      <BaseContainer
        width="100%"
        flexDirection="row"
        justify="flex-start"
        align="center"
        paddingHorizontal="10px"
        flex={1}
        marginTop="10px"
      >
        <ProfilePhoto
          size={80}
          source={{ uri: formatFilePathUrl(user?.profilePhoto?.path) }}
        />
        <BaseText color="black" fontSize="25px" marginLeft="13px">
          {user?.name}
        </BaseText>
      </BaseContainer>
      <SettingsOptionsListing />
    </BaseContainer>
  );
};

export default Settings;

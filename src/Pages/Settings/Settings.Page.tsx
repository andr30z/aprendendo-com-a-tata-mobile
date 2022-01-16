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
    <BaseContainer backgroundColor="white" position="relative" flex={1}>
      <BaseContainer
        position="absolute"
        width="100%"
        height="70px"
        flexDirection="row"
        paddingHorizontal="10px"
        align="center"
        style={{ top: 15 }}
      >
        <BaseContainer align="center" flexDirection="row">
          <ProfilePhoto
            size={60}
            source={{ uri: formatFilePathUrl(user?.profilePhoto?.path) }}
          />
          <BaseText color="black" fontSize="25px" marginLeft="13px">
            {user?.name}
          </BaseText>
        </BaseContainer>
      </BaseContainer>
      <ScrollView style={{ paddingVertical: 75 }}>
        <SettingsOptionsListing />
      </ScrollView>
    </BaseContainer>
  );
};

export default Settings;

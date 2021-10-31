import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useRef, useState } from "react";
import { PORTAL_HOSTS } from "../../Constants";
import { useUserContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBackHandler } from "../../Hooks";
import { ActivityCommonProps } from "../../Interfaces/index";
import ActivityPostListing from "../ActivityPostListing/ActivityPostListing.Component";
import Button from "../Button/Button.Component";
import Input from "../Input/Input.Component";
import {
  BaseTextWithCenterAlign,
  ProfilePhotoWithCenterAlign,
  styles,
} from "./Styles";

const snapPoints = ["93%"];

interface CreatePostProps {
  children: (
    sheetRef: React.RefObject<BottomSheetModalMethods>
  ) => React.ReactNode;
}

/**
 * Component resposable for handling class post creation.
 * It uses @gorhom/portal and react-native-bottom-sheet.
 * @param children render children using a function that receives a Ref, this ref is the actual bottom sheet presentation.
 * @author andr3z0
 **/
const CreatePost: React.FC<CreatePostProps> = ({ children }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [postText, setPostText] = useState("");
  const [inputHeight, setInputHeight] = useState(35);
  const [selectedActivities, setSelectedActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >([]);
  useBackHandler(false, () => {
    bottomSheetModalRef.current?.close();
    return true;
  });
  const onDismiss = useCallback(() => setSelectedActivities([]), []);
  const { user } = useUserContext();
  return (
    <>
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            onDismiss={onDismiss}
            style={{ paddingHorizontal: 10, flex: 1 }}
            snapPoints={snapPoints}

            // onChange={handleSheetChanges}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.scrollViewContentContainerStyle}
            >
              <BaseContainer height="55px" width="100%" flexDirection="row">
                <BaseContainer flexDirection="row" width="50%">
                  <ProfilePhotoWithCenterAlign
                    size={50}
                    source={{ uri: "https://imgur.com/H5PWtBp.png" }}
                  />
                  <BaseTextWithCenterAlign
                    align="center"
                    marginLeft="10px"
                    color="black"
                    fontSize="20px"
                  >
                    {user?.name}
                  </BaseTextWithCenterAlign>
                </BaseContainer>
                <BaseContainer flex={1} justify="center" align="flex-end">
                  <Button
                    buttonWidth="80%"
                    buttonHeight="35px"
                    onPress={() => null}
                    buttonTitle="Publicar"
                  />
                </BaseContainer>
              </BaseContainer>
              <Input
                onChangeText={(text) => setPostText(text)}
                placeholder="No que está pensando?"
                value={postText}
                maxLength={500}
                onContentSizeChange={(event) => {
                  setInputHeight(event.nativeEvent.contentSize.height);
                }}
                style={[styles.textInputStyles, { height: inputHeight }]}
                multiline={true}
              />
              <ActivityPostListing
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
              />
              {/* this container is here to make parent scrollview not clip content */}
              <BaseContainer height="80px" marginTop="30px" />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>

      {children(bottomSheetModalRef)}
    </>
  );
};
export default CreatePost;

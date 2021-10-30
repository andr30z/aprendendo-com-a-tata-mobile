import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Portal } from "@gorhom/portal";
import React, { useRef, useState } from "react";
import { PORTAL_HOSTS } from "../../Constants";
import { useUserContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBackHandler } from "../../Hooks";
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
  useBackHandler(false, () => {
    bottomSheetModalRef.current?.close();
    return true;
  });
  const { user } = useUserContext();
  return (
    <>
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            style={{ paddingHorizontal: 10 }}
            snapPoints={snapPoints}

            // onChange={handleSheetChanges}
          >
            <BaseContainer height="55px" width="100%" flexDirection="row">
              <BaseContainer flexDirection="row" width="50%">
                <ProfilePhotoWithCenterAlign
                  size={50}
                  source={{ uri: "https://imgur.com/H5PWtBp.png" }}
                />
                <BaseTextWithCenterAlign
                  style={{ alignSelf: "center" }}
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
              placeholder="No que está pensando?"
              onChangeText={(text) => setPostText(text)}
              value={postText}
              maxLength={500}
              onContentSizeChange={(event) => {
                setInputHeight(event.nativeEvent.contentSize.height);
              }}
              style={[styles.textInputStyles, { height: inputHeight }]}
              multiline={true}
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>

      {children(bottomSheetModalRef)}
    </>
  );
};
export default CreatePost;

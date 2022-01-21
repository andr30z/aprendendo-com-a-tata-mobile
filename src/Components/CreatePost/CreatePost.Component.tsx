import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import React from "react";
import { ActivityIndicator } from "react-native";
import { PORTAL_HOSTS } from "../../Constants";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { formatFilePathUrl } from "../../Utils";
import ActivityPostListing from "../ActivityPostListing/ActivityPostListing.Component";
import Button from "../Button/Button.Component";
import Input from "../Input/Input.Component";
import { CreatePostProps } from "./Interfaces";
import {
  BaseTextWithCenterAlign,
  ProfilePhotoWithCenterAlign,
  styles,
} from "./Styles";
import { useCreatePostLogic } from "./useCreatePostLogic";
const snapPoints = ["93%"];

/**
 * Component resposable for handling class post creation.
 * It uses @gorhom/portal and react-native-bottom-sheet.
 * @param children render children using a function that receives a Ref, this ref is the actual bottom sheet presentation.
 * @param classroom the actual classroom that this post component is being rendered.
 * @author andr30z
 **/
const CreatePost: React.FC<CreatePostProps> = (props) => {
  const { children, classroom, initialValues } = props;
  const {
    onDismiss,
    inputHeight,
    isFocusedOnInput,
    isTextEmpty,
    onChange,
    onContentChange,
    onFocus,
    onSubmit,
    postText,
    selectedActivities,
    setSelectedActivities,
    sheetRef,
    isSubmitting,
    user,
  } = useCreatePostLogic(props);
  return (
    <>
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={sheetRef}
            index={0}
            enablePanDownToClose={!isSubmitting}
            onDismiss={onDismiss}
            style={{ paddingHorizontal: 10, flex: 1 }}
            snapPoints={snapPoints}
          >
            <BottomSheetScrollView
              contentContainerStyle={styles.scrollViewContentContainerStyle}
            >
              <BaseContainer height="55px" width="100%" flexDirection="row">
                <BaseContainer flexDirection="row" width="50%">
                  <ProfilePhotoWithCenterAlign
                    size={50}
                    source={{
                      uri:
                        formatFilePathUrl(user?.profilePhoto?.path) ||
                        "https://imgur.com/H5PWtBp.png",
                    }}
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
                    buttonHeight="50px"
                    backgroundColor={classroom.color}
                    onPress={onSubmit}
                    buttonTitle={
                      isSubmitting
                        ? undefined
                        : initialValues?._id
                        ? "Atualizar"
                        : "Publicar"
                    }
                  >
                    {isSubmitting && (
                      <ActivityIndicator
                        color={classroom.textColor || "white"}
                        size={20}
                      />
                    )}
                  </Button>
                </BaseContainer>
              </BaseContainer>
              <Input
                onChangeText={onChange}
                onFocus={onFocus}
                // I don't know why, but when I use the prop value that shit starts flickering
                defaultValue={postText}
                placeholder="Digite sua mensagem"
                maxLength={430}
                autoCorrect={!isTextEmpty}
                onContentSizeChange={onContentChange}
                style={[
                  styles.textInputStyles,
                  styles.inputStyles,
                  {
                    height: inputHeight,
                    color: isTextEmpty ? "red" : "black",
                  },
                ]}
                multiline={true}
              />
              <ActivityPostListing
                isInputFocused={isFocusedOnInput || isTextEmpty}
                selectedActivities={selectedActivities}
                setSelectedActivities={setSelectedActivities}
              />
              {/* this container is here to make parent scrollview not clip content */}
              <BaseContainer height="80px" marginTop="30px" />
            </BottomSheetScrollView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>

      {children(sheetRef)}
    </>
  );
};
export default CreatePost;

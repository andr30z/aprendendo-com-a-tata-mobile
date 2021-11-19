import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Portal } from "@gorhom/portal";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import Toast from "react-native-toast-message";
import { PORTAL_HOSTS } from "../../Constants";
import { useUserContext } from "../../Contexts";
import { BaseContainer } from "../../GlobalStyles/Containers.Style";
import { useBoolean, useKeyboardHideOrShowEvent } from "../../Hooks";
import {
  ActivityCommonProps,
  ClassRoomInterface,
  PostTypes,
} from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { formatFilePathUrl } from "../../Utils";
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
  classroom: ClassRoomInterface;
  onPostCreation: () => void;
}

/**
 * Component resposable for handling class post creation.
 * It uses @gorhom/portal and react-native-bottom-sheet.
 * @param children render children using a function that receives a Ref, this ref is the actual bottom sheet presentation.
 * @param classroom the actual classroom that this post component is being rendered.
 * @author andr3z0
 **/
const CreatePost: React.FC<CreatePostProps> = ({
  children,
  classroom,
  onPostCreation,
}) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [postText, setPostText] = useState("");
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const [inputHeight, setInputHeight] = useState(35);
  const { value: isFocusedOnInput, setFalse, setTrue } = useBoolean();
  const [selectedActivities, setSelectedActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >([]);
  const { value: isSubmitting, toggle } = useBoolean();
  const onDismiss = useCallback(() => {
    if (isSubmitting) return null;
    setSelectedActivities([]);
    setFalse();
    setIsTextEmpty(false);
    setPostText("");
  }, [isSubmitting]);
  useKeyboardHideOrShowEvent({ onHide: setFalse, onShow: setTrue });
  const { user } = useUserContext();
  const onSubmit = () => {
    if (isTextEmpty || postText.trim().length === 0)
      return setIsTextEmpty(true);
    toggle();
    baseApi
      .post(baseApiRoutes.POSTS, {
        authorId: user?._id,
        classroomId: classroom._id,
        text: postText,
        allowComments: false,
        type: selectedActivities.length > 0 ? PostTypes.A : PostTypes.N,
        activities:
          selectedActivities.length > 0
            ? selectedActivities.map((x) => x._id)
            : null,
      })
      .then(() => {
        Toast.show({
          text1: "Post criado com sucesso!",
        });
        toggle();
        onPostCreation();
        setFalse();
        if (bottomSheetModalRef.current) bottomSheetModalRef.current.close();
      })
      .catch((e) => {
        toggle();
      });
  };

  const onChange = useCallback((e: string) => {
    setPostText(e);
  }, []);
  useEffect(() => {
    if (isTextEmpty) setPostText("Digite uma mensagem!");
  }, [isTextEmpty]);

  const onFocus = useCallback(() => {
    if (isTextEmpty) {
      setIsTextEmpty(false);
      setPostText("");
    }
  }, [isTextEmpty]);

  const onContentChange = useCallback(
    (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      setInputHeight(event.nativeEvent.contentSize.height);
    },
    []
  );
  return (
    <>
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            enablePanDownToClose={!isSubmitting}
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
                    buttonHeight="35px"
                    backgroundColor={classroom.color}
                    onPress={onSubmit}
                    buttonTitle={isSubmitting ? undefined : "Publicar"}
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

      {children(bottomSheetModalRef)}
    </>
  );
};
export default CreatePost;

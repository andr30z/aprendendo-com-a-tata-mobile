import { useCallback, useEffect, useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import Toast from "react-native-toast-message";
import { useUserContext } from "../../Contexts";
import {
  useBoolean,
  useCancellablePromise,
  useKeyboardHideOrShowEvent,
  useModalSheetRef,
} from "../../Hooks";
import { ActivityCommonProps, PostTypes } from "../../Interfaces/index";
import { baseApi, baseApiRoutes } from "../../Services";
import { CreatePostProps } from "./Interfaces";

export function useCreatePostLogic({
  classroom,
  onPostCreation,
  initialValues,
}: Omit<CreatePostProps, "children">) {
  const { sheetRef, close, open } = useModalSheetRef();

  const [postText, setPostText] = useState(initialValues?.text || "");
  const [isTextEmpty, setIsTextEmpty] = useState(false);
  const [inputHeight, setInputHeight] = useState(35);
  const { cancellablePromise } = useCancellablePromise();
  const { value: isFocusedOnInput, setFalse, setTrue } = useBoolean();
  const [selectedActivities, setSelectedActivities] = useState<
    Array<ActivityCommonProps<unknown>>
  >(initialValues?.activities || []);
  const { value: isSubmitting, toggle } = useBoolean();
  const onDismiss = useCallback(() => {
    if (isSubmitting || initialValues) return null;
    setSelectedActivities([]);
    setFalse();
    setIsTextEmpty(false);
    setPostText("");
  }, [isSubmitting, initialValues]);
  // useEffect(() => {
  //   if (selectedActivities.length > 0 && initialValues) {
  //     setTrue();
  //     console.log("AAAAA");
  //     const timeout = setTimeout(setFalse, 1000);
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [selectedActivities, initialValues]);
  useKeyboardHideOrShowEvent({ onHide: setFalse, onShow: setTrue });
  const { user } = useUserContext();
  const onSubmit = () => {
    if (isTextEmpty || postText.trim().length === 0)
      return setIsTextEmpty(true);
    toggle();
    const documentBody = {
      authorId: user?._id,
      classroomId: classroom._id,
      text: postText,
      allowComments: false,
      type: selectedActivities.length > 0 ? PostTypes.A : PostTypes.N,
      activities:
        selectedActivities.length > 0
          ? selectedActivities.map((x) => x._id)
          : null,
    };
    const promise = initialValues?._id
      ? baseApi.put(baseApiRoutes.POSTS + "/" + initialValues._id, documentBody)
      : baseApi.post(baseApiRoutes.POSTS, documentBody);
    cancellablePromise(promise)
      .then(() => {
        Toast.show({
          text1: initialValues?._id
            ? "Post atualizado com sucesso!"
            : "Post criado com sucesso!",
        });
        toggle();
        setFalse();
        onPostCreation();
        if (sheetRef.current) close();
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

  return {
    onContentChange,
    onFocus,
    onChange,
    onSubmit,
    inputHeight,
    setInputHeight,
    isFocusedOnInput,
    setFalse,
    setTrue,
    selectedActivities,
    setSelectedActivities,
    onDismiss,
    close,
    open,
    postText,
    setPostText,
    isTextEmpty,
    setIsTextEmpty,
    sheetRef,
    isSubmitting,
    user,
  };
}

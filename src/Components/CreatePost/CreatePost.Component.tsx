import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { BaseText } from "../../GlobalStyles/BaseStyles";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { PORTAL_HOSTS } from "../../Constants";
interface CreatePostProps {
  children: (
    sheetRef: React.RefObject<BottomSheetModalMethods>
  ) => React.ReactNode;
}

/**
 * Component resposable for class post creation.
 * It uses react-native-portal and react-native-bottom-sheet.
 * @param children render children using a function that receives a Ref, this ref is the actual bottom sheet presentation.
 * @author andr3z0
 **/
const CreatePost: React.FC<CreatePostProps> = ({ children }) => {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "90%"], []);

  // callbacks

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <>
      <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
          >
            <BaseText color="black">AAAAA</BaseText>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Portal>
      {children(bottomSheetModalRef)}
    </>
  );
};
export default CreatePost;

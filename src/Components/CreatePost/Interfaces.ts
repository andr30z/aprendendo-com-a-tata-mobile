import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { ClassRoomInterface, Post } from "../../Interfaces/index";

export interface CreatePostProps {
    children: (
        sheetRef: React.RefObject<BottomSheetModalMethods>
    ) => React.ReactNode;
    classroom: ClassRoomInterface;
    onPostCreation: () => void;
    initialValues?: Post;
}
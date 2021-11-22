import { useCallback, useRef } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
/**
 *
 * @author andr30z
 */
export function useModalSheetRef() {
  const sheetRef = useRef<BottomSheetModal>(null);
  const open = useCallback(() => {
    sheetRef.current?.present();
  }, []);
  const close = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return { open, close, sheetRef };
}

import { useCallback, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
/**
* 
* @author andr30z
**/
export function usePageViewerLogic() {
  const [currentPageControllerPosition, setCurrentPageControllerPosition] =
    useState<number>(0);
  const pageViewRef = useRef<PagerView | null>(null);
  const onPageChange = useCallback((e) => {
    setCurrentPageControllerPosition(e.nativeEvent.position);
  }, []);
  const setCurrentPosition = useCallback(
    //ohhh boy, i love 'any'
    (callback: any) => {
      if (pageViewRef.current)
        pageViewRef.current?.setPage(callback(currentPageControllerPosition));
    },
    [currentPageControllerPosition]
  );

  return {
    pageViewRef,
    currentPageControllerPosition,
    setCurrentPageControllerPosition,
    setCurrentPosition,
    onPageChange,
  };
}

import React from "react";
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { SharedWithModalProps } from "../../Interfaces/WithModal";
import { Portal } from "@gorhom/portal";
import { PORTAL_HOSTS } from "../../Constants";

type BottomSheetNativePropsComposition = BottomSheetModalProps &
  React.RefAttributes<BottomSheetModalMethods> &
  SharedWithModalProps;

interface NativeProps extends Omit<BottomSheetNativePropsComposition, "ref"> {}

interface WithModalProps {
  withModalProps: NativeProps;
}

/**
 * High-order component that involves a Component into a bottom sheet modal structure.
 * @author andr3z0
 **/
function WithModal<P = {}>(
  Component: React.ComponentType<P & SharedWithModalProps>
) {
  return ({
    withModalProps: { modalSheetRef, ...withModalRest },
    ...rest
  }: P & WithModalProps) => (
    <Portal hostName={PORTAL_HOSTS.ROOT_PORTAL}>
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={modalSheetRef}
          bottomInset={withModalRest.bottomInset || 46}
          detached={
            typeof withModalRest.detached === "boolean"
              ? withModalRest.detached
              : true
          }
          {...withModalRest}
        >
          <Component
            modalSheetRef={modalSheetRef}
            {...(rest as unknown as P)}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Portal>
  );
}

export default WithModal;

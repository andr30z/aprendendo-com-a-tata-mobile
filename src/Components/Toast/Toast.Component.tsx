import React from "react";
import { ToastProps } from "./Interfaces";
import { ToastContainer } from "./Styles";

/**
 * Component that wraps his children into an animated Toast.
 * @author andr3z0
 **/
const Toast: React.FC<ToastProps> = ({ children, show, setShow }) => {
  return (
    <ToastContainer
      onTouchEnd={() => setShow(false)}
      transition={{ type: "timing", duration: 500 }}
      from={{ top: 0 }}
      animate={{ top: 20 }}
    >
      {children}
    </ToastContainer>
  );
};

export default Toast;

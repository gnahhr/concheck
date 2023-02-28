import React, { useEffect } from 'react';
import "./Toast.css";

// toastType = success/warning
// showToast = setToastFunction
// toastState = boolean
const Toast = ({message, timer, toastType, showToast, toastState}) => {

  useEffect(() => {
    if (toastState === true) {
      setTimeout(() => showToast(false), timer);
    }
  }, [toastState])

  return (
    <div className={`toast-message ${toastType} ${toastState ? "" : "hidden"}`}>
        {message}
    </div>
  )
}

export default Toast
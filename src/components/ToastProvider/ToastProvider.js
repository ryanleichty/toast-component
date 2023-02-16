import React from "react";
import { v4 as uuid } from "uuid";
import { useEscapeKey } from "../../hooks/useEscapeKey.hook";

export const ToastContext = React.createContext(null);

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(
    (variant, message) => {
      setToasts([...toasts, { id: uuid(), variant, message }]);
    },
    [toasts]
  );

  const dismissToast = React.useCallback(
    (id) => {
      setToasts(toasts.filter((toast) => toast.id !== id));
    },
    [toasts]
  );

  const dismissAllToasts = React.useCallback(() => {
    setToasts([]);
  }, []);

  const value = React.useMemo(() => {
    return { toasts, addToast, dismissToast };
  }, [toasts, addToast, dismissToast]);

  useEscapeKey(dismissAllToasts);

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;

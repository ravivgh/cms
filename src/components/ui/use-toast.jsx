// @/components/ui/use-toast.jsx
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 20000;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

const toastState = {
  toasts: [],
  visibleToasts: [],
};

let memoryState = toastState;

function toastReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      {
        const { toast } = action;

        return {
          ...state,
          toasts: [toast, ...state.toasts].slice(0, TOAST_LIMIT),
        };
      }
    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case actionTypes.DISMISS_TOAST:
      return {
        ...state,
        visibleToasts: state.visibleToasts.filter((t) => t.id !== action.toastId),
      };
    case actionTypes.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
}

const ToastContext = React.createContext({
  ...toastState,
  toast: ({ ...props }) => {},
  dismiss: (toastId) => {},
});

let count = 0;

function Toaster({ children }) {
  const [state, dispatch] = React.useReducer(toastReducer, memoryState);

  React.useEffect(() => {
    memoryState = state;
  }, [state]);

  React.useEffect(() => {
    const timeouts = state.toasts.reduce((acc, toast) => {
      if (toast.duration !== Infinity) {
        acc[toast.id] = setTimeout(() => {
          dispatch({ type: actionTypes.REMOVE_TOAST, toastId: toast.id });
        }, toast.duration || TOAST_REMOVE_DELAY);
      }
      return acc;
    }, {});

    return () => {
      Object.values(timeouts).forEach(clearTimeout);
    };
  }, [state.toasts]);

  React.useEffect(() => {
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: {
        visible: true,
      },
    });
  }, [state.toasts]);

  const toast = React.useCallback(
    ({ ...props }) => {
      const id = uuidv4();
      const toast = {
        id,
        ...props,
        open: true,
      };
      dispatch({ type: actionTypes.ADD_TOAST, toast });
    },
    [dispatch]
  );

  const dismiss = React.useCallback((toastId) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  }, [dispatch]);

  return (
    <ToastContext.Provider value={{ ...state, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

function useToast() {
  return React.useContext(ToastContext);
}

function useToaster() {
  return React.useContext(ToastContext);
}

export { Toaster, useToast, useToaster, actionTypes };
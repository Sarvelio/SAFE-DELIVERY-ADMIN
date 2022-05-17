import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";

export interface UiState {
  isLoading: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isLoading: false,
};

interface IPro {
  children: JSX.Element;
}
export const UiProvider: FC<IPro> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const yesLoading = () => {
    dispatch({ type: "[UI] - Loading", payload: true });
  };

  const noLoading = () => {
    dispatch({ type: "[UI] - Loading", payload: false });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        yesLoading,
        noLoading,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

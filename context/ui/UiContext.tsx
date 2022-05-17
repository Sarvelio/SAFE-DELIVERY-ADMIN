import { createContext } from "react";

interface ContextProps {
  isLoading: boolean;

  // Methods
  yesLoading: () => void;
  noLoading: () => void;
}

export const UiContext = createContext({} as ContextProps);

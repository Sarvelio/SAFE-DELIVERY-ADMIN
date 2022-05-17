import { UiState } from "./";

type UiActionType = { type: "[UI] - Loading"; payload: boolean };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - Loading":
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
};

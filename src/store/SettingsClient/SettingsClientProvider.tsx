import { PropsWithChildren, useReducer } from "react";
import SettingsClientContext from "./SettingsClientContext";
import {
  settingsClientReducer,
  initialState,
} from "./settingsClientPropsReducer";

export const SettingsClientProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(settingsClientReducer, initialState);
  return (
    <SettingsClientContext.Provider
      value={{ ...state, settingsClientDispatch: dispatch }}
    >
      {children}
    </SettingsClientContext.Provider>
  );
};

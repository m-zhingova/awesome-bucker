import { Dispatch, createContext } from "react";
import { ActionProps, SettingsClientProps } from "./settingsClientPropsReducer";

interface SettingsClientContextProps {
  settingsClientDispatch: Dispatch<ActionProps>;
  client?: SettingsClientProps["client"];
  bucket: SettingsClientProps["bucket"];
}

const SettingsClientContext = createContext<SettingsClientContextProps>({
  settingsClientDispatch: () => {},
  bucket: ''
});

export default SettingsClientContext;

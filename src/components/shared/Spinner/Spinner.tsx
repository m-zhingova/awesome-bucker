import "./Spinner.css";
import { ImSpinner3 } from "react-icons/im";

export const Spinner = ({ ...rest }) => {
  return <ImSpinner3 className="app-spinner" {...rest} />;
};

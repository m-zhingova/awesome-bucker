import { PropsWithChildren, useReducer } from "react";
import TreeContext from "./TreeContext";
import { initialState, treeReducer } from "./TreeReducer/treeReducer";

export const TreeProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(treeReducer, initialState);
  return (
    <TreeContext.Provider value={{ ...state, treeDispatch: dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};

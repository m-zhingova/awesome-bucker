import { Dispatch, createContext } from "react";
import { ChildType, TreeNode } from "../../utils/threeBuilder/treeBuilder";
import { ActionProps } from "./TreeReducer/treeReducer";

interface TreeContextProps {
  tree: Map<string, TreeNode>;
  treeDispatch: Dispatch<ActionProps>;
  currentNode?: TreeNode;
}

const TreeContext = createContext<TreeContextProps>({
  tree: new Map().set("root", {
    name: "root",
    path: "",
    type: ChildType.Directory,
    children: new Map(),
  }),
  treeDispatch: () => {},
});

export default TreeContext;

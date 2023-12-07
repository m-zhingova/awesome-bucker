import { useContext } from "react";
import TreeContext from "../../../store/ResourcesTree/TreeContext";
import { Actions } from "../../../store/ResourcesTree/TreeReducer/treeReducer";
import { NavigationTree } from "./components/NavigationTree";
import { TreeNode } from "../../../utils/threeBuilder/treeBuilder";

import "./NavigationPanel.css";

interface NavigationPanelProps {
  className?: string;
}

export const NavigationPanel = ({
  className,
  ...rest
}: NavigationPanelProps) => {
  const { tree, treeDispatch, currentNode } = useContext(TreeContext);

  const handleDoubleClick = (node: TreeNode) => {
    treeDispatch({
      type: Actions.UpdateCurrentNode,
      payload: { currentNode: node },
    });
  };

  const node = tree.get("root");

  return (
    <div
      className={`navigation-panel ${className}`}
      {...rest}
      data-testid="navigation-panel"
    >
      {node && (
        <NavigationTree
          className="navigation-panel__item"
          node={node}
          onDoubleClick={handleDoubleClick}
          selectedPath={currentNode?.path || ""}
        />
      )}
    </div>
  );
};

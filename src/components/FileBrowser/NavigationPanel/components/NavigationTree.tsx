import { useRef, useState, MouseEvent } from "react";
import {
  ChildType,
  TreeNode,
} from "../../../../utils/threeBuilder/treeBuilder";
import { FaChevronRight } from "react-icons/fa";

import "./NavigationTree.css";

interface NavigationTreeProps {
  node: TreeNode;
  onDoubleClick: (node: TreeNode) => void;
  selectedPath: string;
  className?: string;
}

export const NavigationTree = ({
  node,
  onDoubleClick,
  selectedPath,
  className,
  ...rest
}: NavigationTreeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const clickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const children = Array.from(node.children).filter(
    ([_, n]) => n.type === ChildType.Directory
  );
  const hasChildren = Boolean(children.length);
  const showChildren = isExpanded && hasChildren;
  const isSelected = selectedPath === node.path;

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (e.detail === 1) {
      clickTimer.current = setTimeout(() => {
        setIsExpanded(!isExpanded);
      }, 250);
    } else if (e.detail === 2) {
      if (clickTimer.current) {
        clearTimeout(clickTimer.current);
      }
      onDoubleClick(node);
    }
  };

  return (
    <div
      data-alabala={node.path}
      className={`navigation-tree ${className}`}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          onClick={handleClick}
          className={`navigation-tree__label ${
            isSelected && "navigation-tree__label--selected"
          } ${isExpanded && "navigation-tree__label--expanded"} `}
        >
          <span className="navigation-tree__name">{node.name}</span>
          {hasChildren && <FaChevronRight className="navigation-tree__icon" />}
        </div>
        <div className="avigation-tree__children">
          {showChildren &&
            children.map(([, child]) => (
              <NavigationTree
                key={child.path}
                onDoubleClick={onDoubleClick}
                selectedPath={selectedPath}
                node={child}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

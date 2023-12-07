import { FaFile, FaFolder } from "react-icons/fa";
import { ChildType } from "../../../../../utils/threeBuilder/treeBuilder";

import "./ContentPanelItem.css";
import { ContextMenu } from "../../../../shared/ContextMenu/ContextMenu";
import { MenuItem } from "../../../../shared/MenuItem/MenuItem";
import { useContext, useState } from "react";
import { useApi } from "../../../../../Api/useApi";
import { Modal } from "../../../../shared/Modal/Modal";
import TreeContext from "../../../../../store/ResourcesTree/TreeContext";
import { Actions } from "../../../../../store/ResourcesTree/TreeReducer/treeReducer";

interface ContentPanelItemProps {
  className?: string;
  type: string;
  name: string;
  path: string;
}

export const ContentPanelItem = ({
  className,
  type,
  name,
  path,
}: ContentPanelItemProps) => {
  const { deleteResource } = useApi();
  const { treeDispatch } = useContext(TreeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");

  const handleDeleteItem = async () => {
    try {
      await deleteResource(path);
      treeDispatch({
        type: Actions.RemoveNode,
        payload: { nodePath: path },
      });
    } catch {
      setError("There was a problem. Please try again");
    } finally {
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <div className={`content-panel-item ${className}`}>
        <div
          className={`content-panel-item__content ${className}`}
          style={{ display: "flex" }}
        >
          {type === ChildType.Directory ? (
            <FaFolder className="content-panel-item__icon" size={32} />
          ) : (
            <FaFile className="content-panel-item__icon" size={32} />
          )}
          <div className="content-panel-item__name">{name}</div>
        </div>
        <ContextMenu
          isOpen={isMenuOpen}
          onOpen={() => {
            setIsMenuOpen(true);
          }}
          onClose={() => {
            setIsMenuOpen(false);
          }}
          className="content-panel-item__menu"
        >
          <MenuItem onClick={handleDeleteItem}>Delete</MenuItem>
        </ContextMenu>
      </div>
      {error && (
        <Modal
          onClose={() => {
            setError("");
          }}
          content={error}
        />
      )}
    </>
  );
};

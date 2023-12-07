import { useContext, useState } from "react";
import TreeContext from "../../../store/ResourcesTree/TreeContext";
import { ContentPanelHeader } from "./components/ContentPanelHeader/ContentPanelHeader";
import { Button } from "../../shared/Button/Button";
import { AddDirectoryModal } from "./components/AddDirectoryModal/AddDirectoryModal";
import { AddFileModal } from "./components/AddFileModal/AddFileModal";
import { ContentPanelItem } from "./components/ContentPaneItem/ContentPanelItem";

import "./ContentPanel.css";

interface ContentPanelProps {
  className: string;
}

export const ContentPanel = ({ className, ...rest }: ContentPanelProps) => {
  const [isAddDirectoryModalOpened, setIsAddDirectoryModalOpened] =
    useState(false);
  const [isAddFileModalOpened, setIsAddFileModalOpened] = useState(false);

  const { currentNode } = useContext(TreeContext);
  const tree = currentNode?.children ? Array.from(currentNode.children) : [];

  return (
    <>
      <div className={`content-panel ${className}`} {...rest}>
        <ContentPanelHeader
          title={currentNode?.name}
          className="content-panel__header"
        >
          <div className="content-panel__actions">
            <Button
              onClick={() => {
                setIsAddDirectoryModalOpened(true);
              }}
            >
              Add Directory
            </Button>

            <Button
              onClick={() => {
                setIsAddFileModalOpened(true);
              }}
            >
              Add File
            </Button>
          </div>
        </ContentPanelHeader>
        <div className="content-panel__list">
          {tree.map(([_, value]) => (
            <ContentPanelItem
              path={value.path}
              name={value.name}
              type={value.type}
              key={value.path}
            />
          ))}
        </div>
      </div>
      {isAddDirectoryModalOpened && (
        <AddDirectoryModal
          onClose={() => {
            setIsAddDirectoryModalOpened(false);
          }}
        />
      )}

      {isAddFileModalOpened && (
        <AddFileModal
          onClose={() => {
            setIsAddFileModalOpened(false);
          }}
        />
      )}
    </>
  );
};

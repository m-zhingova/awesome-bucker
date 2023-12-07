import { ChangeEvent, useContext, useState } from "react";
import { Input } from "../../../../shared/Input/Input";
import { Modal } from "../../../../shared/Modal/Modal";
import { Button } from "../../../../shared/Button/Button";

import "./AddDirectoryModal.css";
import { useApi } from "../../../../../Api/useApi";
import TreeContext from "../../../../../store/ResourcesTree/TreeContext";
import { Actions } from "../../../../../store/ResourcesTree/TreeReducer/treeReducer";

interface AddDirectoryModalProps {
  onClose: () => void;
  error?: string;
}

export const AddDirectoryModal = ({ onClose }: AddDirectoryModalProps) => {
  const { addResource } = useApi();
  const { currentNode, treeDispatch } = useContext(TreeContext);
  const [error, setError] = useState("");
  const [data, setData] = useState<{ name: string }>({
    name: "",
  });

  const handleSubmit = async () => {
    try {
      const parentPath = currentNode?.path ? `${currentNode.path}/` : "";
      const nodePath = `${parentPath}${data.name}`;

      const response = await addResource(nodePath);

      if (response) {
        treeDispatch({
          type: Actions.AddNode,
          payload: { nodePath },
        });
      }

      onClose();
    } catch {
      setError("There was a problem with this operation. Please try again");
    }
  };

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      onClose={onClose}
      title="Add Directory Path"
      content={
        <div className="add-directory-model__form" >
          <Input
            name="name"
            placeholder="Directory Name"
            pattern="^[^ \/]+$"
            onChange={updateData}
          />
          <Button onClick={handleSubmit}>Create</Button>
          {error && <div>{error}</div>}
        </div>
      }
    />
  );
};

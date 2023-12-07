import { ChangeEvent, useContext, useState } from "react";
import { Input } from "../../../../shared/Input/Input";
import { Modal } from "../../../../shared/Modal/Modal";
import { Button } from "../../../../shared/Button/Button";

import "./AddFileModal.css";
import { useApi } from "../../../../../Api/useApi";
import TreeContext from "../../../../../store/ResourcesTree/TreeContext";
import { Actions } from "../../../../../store/ResourcesTree/TreeReducer/treeReducer";
import { Textarea } from "../../../../shared/Textarea/Textarea";

interface AddFileModalProps {
  onClose: () => void;
  error?: string;
}

export const AddFileModal = ({ onClose }: AddFileModalProps) => {
  const { addResource } = useApi();
  const { currentNode, treeDispatch } = useContext(TreeContext);
  const [error, setError] = useState("");
  const [data, setData] = useState<{ name: string; body: "" }>({
    name: "",
    body: "",
  });

  const handleSubmit = async () => {
    try {
      const parentPath = currentNode?.path ? `${currentNode.path}/` : "";
      const nodePath = `${parentPath}${data.name}.txt`;

      const response = await addResource(nodePath, data.body);

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

  const updateData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Modal
      onClose={onClose}
      title="Add File Path"
      content={
        <div className="add-file-model__form">
          <Input
            name="name"
            placeholder="File Name"
            pattern="^[^ \/]+$"
            onChange={updateData}
          />
          <Textarea
            name="body"
            placeholder="Add your file content"
            onChange={updateData}
          />
          <Button onClick={handleSubmit}>Create</Button>
          {error && <div>{error}</div>}
        </div>
      }
    />
  );
};

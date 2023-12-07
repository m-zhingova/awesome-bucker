import { ReactNode } from "react";
import { MdClose } from "react-icons/md";

import "./Modal.css";
import { useClickOutside } from "../hooks/useClickOutside";

interface ModalProps {
  title?: string;
  content?: ReactNode;
  onClose: () => void;
}

export const Modal = ({ title, content, onClose }: ModalProps) => {
  const { ref } = useClickOutside(onClose);

  return (
    <div className="app-modal">
      <div className="app-modal__main" ref={ref}>
        <div className="app-modal__header">
          <h3 className="app-modal__title">{title}</h3>
          <MdClose onClick={onClose} size={24} />
        </div>

        <div className="app-modal__content">{content}</div>
      </div>
    </div>
  );
};

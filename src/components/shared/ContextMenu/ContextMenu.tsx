import { PropsWithChildren } from "react";
import { HiDotsVertical } from "react-icons/hi";

import "./ContextMenu.css";
import { useClickOutside } from "../hooks/useClickOutside";

interface ContextMenuPros {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  onOpen: () => void;
}

export const ContextMenu = ({
  onOpen,
  onClose,
  isOpen,
  className,
  children,
}: PropsWithChildren<ContextMenuPros>) => {
  const { ref } = useClickOutside(onClose);

  return (
    <div className={`app-context-menu ${className}`}>
      <div className="app-context-menu__content">
        <HiDotsVertical className="app-context-menu__icon" onClick={onOpen} />
        {isOpen && (
          <div ref={ref} className="app-context-menu__children">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

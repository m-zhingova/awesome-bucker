import { PropsWithChildren } from "react";
import './ContentPanelHeader.css'

interface ContentPanelHeaderProps {
  title?: string;
  className?: string;
}

export const ContentPanelHeader = ({
  className,
  title,
  children,
}: PropsWithChildren<ContentPanelHeaderProps>) => {
  return (
    <div className={`content-panel-header ${className}`}>
      <h2 className="content-panel-header__title">{title}</h2>
      <div className="content-panel-header__items">{children}</div>
    </div>
  );
};

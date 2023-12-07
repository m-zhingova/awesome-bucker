import { PropsWithChildren, HTMLAttributes } from "react";
import "./MenuItem.css";

export const MenuItem = ({
  className,
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => {
  return (
    <div className={`app-menu-item ${className}`} {...rest}>
      {children}
    </div>
  );
};

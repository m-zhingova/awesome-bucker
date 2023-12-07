import { ButtonHTMLAttributes } from "react";
import "./Button.css";

export const Button = ({
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={`app-button ${className}`} {...rest}>
      {children}
    </button>
  );
};

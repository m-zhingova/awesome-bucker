import { InputHTMLAttributes } from "react";
import "./Input.css";

export const Input = ({
  className,
  children,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) => {
  return <input className={`app-input ${className}`} {...rest} />;
};

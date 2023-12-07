import { TextareaHTMLAttributes  } from "react";
import './Textarea.css'

export const Textarea = ({
  className,
  children,
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea className={`app-textarea ${className}`} {...rest}/>
};

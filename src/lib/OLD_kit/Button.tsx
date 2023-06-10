import React from "react";
import { IKitProps } from "../Types";

const Button = ({ id, className, storageKey, value: defaultValue, title, showInClearBar, onChange }: IKitProps) => {
  return (
    <div key={id} className={`owl-button-conatiner  ${className}`}>
      <button
        onClick={() => {
          onChange?.({
            clear: () => {},
            id,
            title,
            value: defaultValue,
          });
        }}
        className="owl-button">
        {title}
      </button>
    </div>
  );
};

export default Button;

import React from "react";
import { IKitProps } from "../Types";

const Boolean = ({ className, id, value: defaultValue, title, onChange }: IKitProps<boolean>) => {
  let value = React.useMemo(() => defaultValue, []);

  return (
    <div className={`owl-toggle-button ${className}`} key={id}>
      <p
        onClick={({ currentTarget }) => {
          value = !value;
          currentTarget.classList.toggle("owl-toggled");

          let clear = (effect = false) => {
            value = !value;
            currentTarget.classList.toggle("owl-toggled");
          };
          onChange?.({
            id,
            value,
            title,
            clear,
            setValue: (value: any) => {
              value = value;
              currentTarget.classList.toggle("owl-toggled");
            },
          });
        }}
        className={`owl-toggled-bg ${value ? "owl-toggled" : ""}`}>
        <span />
      </p>
      <p className="font-bold owl-text-s">{title}</p>
    </div>
  );
};
export default React.memo(Boolean);

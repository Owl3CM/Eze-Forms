import React from "react";
import { IKitProps } from "../Types";

const DateInput = ({ id, value: defaultValue, title, className, showInClearBar, onChange }: IKitProps) => {
  console.debug("Date RD");

  const onSelect = ({ target }: { target: HTMLElement | any }) => {
    let value = target.value;
    const setValue = (value: any) => {
      target.value = value;
    };
    onChange?.({
      id,
      value,
      title,
      setValue,
      clear: (effect = false) => {
        setValue("");
      },
    });
  };

  return (
    <div key={id} className="owl-label-container min-w-max">
      <input type="date" className="owl-date" defaultValue={defaultValue} onChange={onSelect} />
      <p className="owl-label">{title} </p>
    </div>
  );
};
export default DateInput;

import React from "react";
import { IOptionBuilder } from "../Types";

const ToggleOptions: React.FC<IOptionBuilder> = ({ prop, selected, onOptionChanged, containerClassName, activeClassName, style }: IOptionBuilder) => {
  return prop.options.length ? (
    <div style={style} className={`toggle-options-parent ${containerClassName || ""}`}>
      <div
        className="toggle-options-container"
        onWheel={onWheel}
        onMouseMove={onDrag}
        onMouseDown={(e) => {
          firstX = e.clientX;
        }}
        onMouseUp={(e) => {
          firstX = 0;
          draged = false;
        }}>
        {prop.options.map((option, i) => {
          const _optionClass = option.className || activeClassName;
          const _notSelected = option.value !== selected.value;
          return (
            <p
              onMouseEnter={({ currentTarget }) => {
                if (_notSelected && _optionClass) currentTarget.classList.add(_optionClass);
              }}
              onMouseLeave={({ currentTarget }) => {
                if (_notSelected && _optionClass) currentTarget.classList.remove(_optionClass);
              }}
              key={option.value}
              onClick={() => {
                _notSelected && onOptionChanged(option, i);
              }}
              className={`toggle-option ${_notSelected ? "" : _optionClass}`}>
              {option.title}
            </p>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default React.memo(ToggleOptions);

let wheeled = false;
const onWheel = (e: any) => {
  if (wheeled) return;
  wheeled = true;
  setTimeout(() => {
    wheeled = false;
  }, 200);
  let left = (e.currentTarget.clientWidth * e.deltaY) / 110;
  e.currentTarget.scrollBy({ top: 0, left, behavior: "smooth" });
};
let firstX = 0;
let draged = false;
const onDrag = (e: any) => {
  if (firstX == 0 || draged) return;
  draged = true;

  let left = (e.currentTarget.clientWidth * 100) / 110;
  if (e.clientX - firstX > 10) {
    e.currentTarget.scrollBy({ top: 0, left: -left, behavior: "smooth" });
  } else if (e.clientX - firstX < -10) {
    e.currentTarget.scrollBy({ top: 0, left, behavior: "smooth" });
  } else
    setTimeout(() => {
      draged = false;
    }, 50);

  // console.debug(e.currentTarget.clientWidth);
  // let left = (e.currentTarget.clientWidth * e.deltaY) / 110;
  // e.currentTarget.scrollBy({
  //     top: 0,
  //     left,
  //     behavior: "smooth",
  // });
};

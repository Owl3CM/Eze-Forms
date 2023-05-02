import React from "react";
import { IOptionBuilder, IOptionsProps } from "../Types";
import OptionsBuilder from "./OptionsBuilder";

const Options = (props: IOptionsProps<string>) => {
  return <OptionsBuilder className="toggled-option" {...props} builder={Children} />;
};

export default React.memo(Options);

const Children: React.FC<IOptionBuilder> = ({ prop, selected, _onOptionChanged, className, style, activClass }: IOptionBuilder) => {
  return prop.options.length ? (
    <div className={className} style={style}>
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
          const _optionClass = option.className || activClass;
          const _notSelected = option.id !== selected.id;
          return (
            <p
              onMouseEnter={({ currentTarget }) => {
                if (_notSelected && _optionClass) currentTarget.classList.add(_optionClass);
              }}
              onMouseLeave={({ currentTarget }) => {
                if (_notSelected && _optionClass) currentTarget.classList.remove(_optionClass);
              }}
              key={option.id}
              onClick={() => {
                _notSelected && _onOptionChanged(option, i);
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

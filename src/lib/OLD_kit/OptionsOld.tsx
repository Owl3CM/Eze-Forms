import React from "react";
import { IOptionsProps } from "../Types";

const Options = ({
  id,
  onChange,
  options,
  title,
  className = "",
  value = "",
  storageKey = "",
  getData,
  onInit,
  style,
  activClass = "toggled-option",
}: IOptionsProps<string>) => {
  const _value = React.useMemo(() => {
    let _stored = localStorage.getItem(storageKey);
    if (_stored) {
      try {
        return JSON.parse(_stored);
      } catch (e) {
        return _stored;
      }
    }
    return value;
  }, []);

  const [prop, setProp] = React.useState(
    options
      ? {
          options,
          selected: options.findIndex((option) => option.id == _value),
        }
      : { options: [], selected: 0 }
  );

  const selected = React.useMemo(() => prop.options[prop.selected] || { title }, [prop]);

  React.useMemo(() => {
    const initData = {
      clear: () => _onOptionChanged(prop.options[0] || { id: 0 }),
      title: selected.title,
      value: selected?.id,
      id,
    };
    if (getData) {
      setTimeout(async () => {
        let _options = await getData();
        let selected = !options && !_value ? 0 : _options.findIndex((option) => option.id == _value);
        if (selected === 0 && _options.length > 0) onChange?.(_options[0].id);
        setProp({ options: _options, selected });
        onInit?.(initData);
      }, 0);
    } else onInit?.(initData);
  }, []);

  const _onOptionChanged = (option = prop.options[0], i = 0) => {
    console.log("option changed", option, i);
    onChange?.({
      value: option.id,
      title: option.title,
      id,
      clear: () => _onOptionChanged(),
    });
    if (storageKey) localStorage.setItem(storageKey, option.id);
    setProp((_prev) => ({ ..._prev, selected: i }));
  };

  return prop.options.length > 0 ? (
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
                if (_notSelected) currentTarget.classList.add(_optionClass);
              }}
              onMouseLeave={({ currentTarget }) => {
                if (_notSelected) currentTarget.classList.remove(_optionClass);
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
  ) : (
    <></>
  );
};

export default React.memo(Options);

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

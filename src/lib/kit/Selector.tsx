import React from "react";
import { IOptionBuilder, IOptionsProps } from "../Types";
import { Popup, PopupMe } from "morabaa-provider";
import ToggleOptions from "./ToggleOptions";
import { Utils } from "../utils";

const Selector = ({
  onChange,
  options: defaultOptions,
  title,
  value: defaultValue = "",
  getOptions: getData,
  onInit,
  builder: Builder = DefaultBuilder,
  id = "selecotr",
  placement = "center",
  activeClassName,
  listClassName,
  optionsVisible = false,
  listBuilder: ListBuilder = optionsVisible ? ToggleOptions : DefaultListBuilder,
  style,
  offset = { x: 0, y: 10 },
  containerClassName = "",
  service: __service = {},
  stateName = "selectorOptions",
}: IOptionsProps<any>) => {
  const service = React.useMemo(() => __service ?? {}, []);
  const setStateName = React.useMemo(() => Utils.convertToCamelCase(`set-${stateName}`), []);
  const [value, setValue] = React.useState(defaultValue);
  [service[stateName], service[setStateName]] = React.useState(
    defaultOptions ? { options: defaultOptions, selected: defaultOptions.findIndex((option) => option.value == value) } : { options: [], selected: 0 }
  );

  const options = service[stateName];
  const setOptions = service[setStateName];

  const selected = React.useMemo(() => {
    const index = options.options.findIndex((option: any) => option.value == value);
    const _selected = options.options[index >= 0 ? index : 0] ?? { value: "", displayTitle: title };
    return { className: activeClassName, ..._selected, title: _selected.displayTitle ?? _selected.title };
  }, [options, value]);

  React.useMemo(() => {
    const initData = { clear: () => onOptionChanged(options.options[0] || { id: 0 }), title: selected.title, value: selected?.value, id };
    if (getData) {
      setTimeout(async () => {
        let optionsResponse = await getData();
        let selected = !defaultOptions && !value ? 0 : optionsResponse.findIndex((option) => option.value == value);
        const option = optionsResponse[selected >= 0 ? selected : 0] ?? { value: "", displayTitle: title };
        if (selected === 0 && optionsResponse.length > 0)
          onChange?.({ value: optionsResponse[0].value, title: optionsResponse[0].title, id, clear: () => onOptionChanged() });
        setOptions(optionsResponse);
        setValue(option.value);
        onInit?.(initData);
      }, 0);
    } else onInit?.(initData);
  }, []);

  const onOptionChanged = (option = options.options[0], i = 0) => {
    if (option.value !== selected.value) {
      onChange?.({ value: option.value, title: option.title, id, clear: () => onOptionChanged() });
      setValue(option.value);
    }
    Popup.remove(id);
  };

  const onClick = React.useCallback(
    ({ currentTarget }: any) => {
      if (options.options?.length < 2) return;
      PopupMe({
        id,
        offset,
        placement,
        removeOnOutClick: true,
        Component: ListBuilder,
        componentProps: { prop: options, selected, onOptionChanged, className: selected.className },
        target: placement !== "center" ? currentTarget : undefined,
        childClass: listClassName,
      });
    },
    [options]
  );

  return !optionsVisible ? (
    <div onClick={onClick} style={style} className={containerClassName}>
      <Builder onOptionChanged={onOptionChanged} prop={options} selected={selected} activeClassName={selected.className} />
    </div>
  ) : (
    <ListBuilder style={style} prop={options} selected={selected} onOptionChanged={onOptionChanged} activeClassName={selected.className} />
  );
};

export default React.memo(Selector);

const DefaultBuilder = ({ selected, onOptionChanged }: IOptionBuilder) => {
  return (
    <div className={`form-selector ${selected.className || ""}`}>
      <p className="selector-title">{selected.title}</p>
    </div>
  );
};

const DefaultListBuilder = ({ prop, selected, onOptionChanged, activeClassName }: IOptionBuilder) => {
  return (
    <div className="gap-l col" style={{ minWidth: 150 }}>
      {prop.options.map((option, i) => {
        const _optionClass = option.className ?? activeClassName;
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
              onOptionChanged(option, i);
            }}
            className={`selector-option ${_notSelected ? "" : _optionClass}`}>
            {option.title}
          </p>
        );
      })}
    </div>
  );
};

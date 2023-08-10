import React from "react";
import { IOption, IOptionBuilder, IOptionsProps } from "../Types";
import { Popup, PopupMe } from "morabaa-provider";
import ToggleOptions from "./ToggleOptions";

const Selector = ({
  onChange,
  options,
  title,
  value = "",
  getOptions,
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
}: IOptionsProps<any>) => {
  const [prop, setProp] = React.useState(options ? { options, selected: options?.findIndex((option) => option.value == value) } : { options: [], selected: 0 });

  const selected = React.useMemo(() => {
    const _selected = prop.options[prop.options?.findIndex((option: IOption) => option.value == value)] ??
      prop.options[0] ?? { value: "", displayTitle: title };
    console.log({ _selected, value, selected: prop.selected });
    return { className: activeClassName, ..._selected, title: _selected.displayTitle ?? _selected.title };
  }, [prop, value]);

  React.useMemo(() => {
    const initData = { clear: () => onOptionChanged(prop.options[0] || { id: 0 }), title: selected.title, value: selected?.value, id };
    if (getOptions) {
      setTimeout(async () => {
        let _options = await getOptions();
        let selected = !options && !value ? 0 : _options?.findIndex((option) => option.value == value);
        if (selected === 0 && _options.length > 0) onChange?.({ value: _options[0].value, title: _options[0].title, id, clear: () => onOptionChanged() });
        setProp({ options: _options, selected });
        onInit?.(initData);
      }, 0);
    } else onInit?.(initData);
  }, []);

  const onOptionChanged = (option = prop.options[0], i = 0) => {
    if (option.value !== selected.value) {
      onChange?.({ value: option.value, title: option.title, id, clear: () => onOptionChanged() });
      setProp((_prev) => ({ ..._prev, selected: i }));
    }
    Popup.remove(id);
  };

  const onClick = React.useCallback(
    async ({ currentTarget }: any) => {
      if (getOptions) prop.options = await getOptions();
      if (prop.options?.length < 2) return;
      PopupMe({
        id,
        offset,
        placement,
        removeOnOutClick: true,
        Component: ListBuilder,
        componentProps: { prop, selected, onOptionChanged, className: selected.className },
        target: placement !== "center" ? currentTarget : undefined,
        childClass: listClassName,
      });
    },
    [prop]
  );

  return !optionsVisible ? (
    <div onClick={onClick} style={style} className={containerClassName}>
      <Builder onOptionChanged={onOptionChanged} prop={prop} selected={selected} activeClassName={selected.className} />
    </div>
  ) : (
    <ListBuilder style={style} prop={prop} selected={selected} onOptionChanged={onOptionChanged} activeClassName={selected.className} />
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

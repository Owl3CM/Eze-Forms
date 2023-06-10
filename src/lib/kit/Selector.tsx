import React from "react";
import { IOption, IOptionBuilder, IOptionsProps } from "../Types";
import { Popup, PopupMe } from "morabaa-provider";
import { Utils } from "../utils";

const Selector = ({
  onChange,
  options,
  title,
  value = "",
  storageKey = "",
  getData,
  onInit,
  builder: Builder = DefaultBuilder,
  id = "selecotr",
  storage = storageKey ? sessionStorage : undefined,
  placement = "list",
  className,
  containerClassName,
  listBuilder: ListBuilder = DefaultListBuilder,
}: IOptionsProps<any>) => {
  const _value = React.useMemo(() => Utils.getStoredValue(storageKey, value), []);

  const [prop, setProp] = React.useState(options ? { options, selected: options.findIndex((option) => option.id == _value) } : { options: [], selected: 0 });

  const selected = React.useMemo(() => prop.options[prop.selected] || { title, className: containerClassName }, [prop]);

  React.useMemo(() => {
    const initData = {
      clear: () => onOptionChanged(prop.options[0] || { id: 0 }),
      title: selected.title,
      value: selected?.id,
      id,
    };
    if (getData) {
      setTimeout(async () => {
        let _options = await getData();
        let selected = !options && !_value ? 0 : _options.findIndex((option) => option.id == _value);
        console.log({ _options, selected, _value });

        if (selected === 0 && _options.length > 0) onChange?.({ value: _options[0].id, title: _options[0].title, id, clear: () => onOptionChanged() });
        setProp({ options: _options, selected });
        onInit?.(initData);
      }, 0);
    } else onInit?.(initData);
  }, []);

  const onOptionChanged = (option = prop.options[0], i = 0) => {
    if (option.id !== selected.id) {
      onChange?.({ value: option.id, title: option.title, id, clear: () => onOptionChanged() });
      if (storageKey && storage) storage.setItem(storageKey, option.id);
      setProp((_prev) => ({ ..._prev, selected: i }));
    }
    Popup.remove(id);
  };

  return (
    <div
      onClick={({ currentTarget }) => {
        if (prop.options?.length < 2) return;
        PopupMe({
          id,
          placement,
          removeOnOutClick: true,
          Component: ListBuilder,
          offset: { x: 0, y: 10 },
          componentProps: { prop, selected, onOptionChanged, className: selected.className },
          target: placement !== "center" ? currentTarget : undefined,
        });
      }}>
      <Builder onOptionChanged={onOptionChanged} prop={prop} selected={selected} className={selected.className} />
    </div>
  );
};

export default React.memo(Selector);

const DefaultListBuilder = ({ prop, selected, onOptionChanged, className }: IOptionBuilder) => {
  return (
    <div className="gap-l col" style={{ minWidth: 150 }}>
      {prop.options.map((option, i) => {
        const _optionClass = option.className || className;
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

const DefaultBuilder = ({ selected, onOptionChanged }: IOptionBuilder) => {
  return (
    <div className={`form-selector ${selected.className || ""}`}>
      <p className="selector-title">{selected.title}</p>
      <i className="icon-arrow-down"></i>
    </div>
  );
};

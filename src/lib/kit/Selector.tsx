import React from "react";
import { IOption, IOptionBuilder, IOptionsProps } from "../Types";
import { Popup, PopupMe } from "morabaa-provider"; // Todo: return to this;
// import { Popup, PopupMe } from "../../../../Provider/src/lib/index";
import ToggleOptions from "./ToggleOptions";

const Selector = ({
  onChange,
  options,
  title,
  value = "",
  getOptions,
  onInit,
  builder: Builder = DefaultBuilder,
  id = "selector",
  placement = "list",
  activeClassName,
  listClassName,
  optionsVisible = false,
  listBuilder: ListBuilder = optionsVisible ? ToggleOptions : DefaultListBuilder,
  style,
  offset = { x: 0, y: 5 },
  containerClass = "",
  animation = "height",
}: IOptionsProps<any>) => {
  const [prop, setProp] = React.useState(options ? { options, selected: options?.findIndex((option) => option.value == value) } : { options: [], selected: 0 });

  const selected = React.useMemo(() => {
    const _selected = prop.options[prop.selected ?? prop.options?.findIndex((option: IOption) => option.value == value)] ??
      prop.options[0] ?? { value: "", displayTitle: title };
    return { className: activeClassName, ..._selected, title: _selected.displayTitle ?? _selected.title };
  }, [prop, value]);

  React.useEffect(() => {
    setProp((_prev) => ({ ..._prev, selected: _prev.options?.findIndex((option: IOption) => option.value == value) }));
  }, [value]);

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
    Popup.remove(id);
    if (option.value !== selected.value) {
      setProp((_prev) => ({ ..._prev, selected: i }));
      setTimeout(() => {
        onChange?.({ value: option.value, title: option.title, id, clear: () => onOptionChanged() });
      }, 300);
    }
  };

  const showList = React.useCallback(
    async (container: HTMLElement, value?: boolean) => {
      if (getOptions) prop.options = await getOptions();
      if (prop.options?.length < 2) return;
      PopupMe(ListBuilder, {
        id,
        offset,
        placement,
        removeOnOutClick: true,
        componentProps: { prop, selected, onOptionChanged, className: selected.className },
        target: placement !== "center" ? container : undefined,
        childClass: listClassName,
        animation,
        containerClass,
      });
    },
    [prop]
  );

  return !optionsVisible ? (
    // <div onClick={showList} style={style} className={containerClass}>
    // </div>
    <Builder showList={showList} onOptionChanged={onOptionChanged} prop={prop} selected={selected} activeClassName={selected.className} />
  ) : (
    <ListBuilder style={style} prop={prop} selected={selected} onOptionChanged={onOptionChanged} activeClassName={selected.className} showList={showList} />
  );
};

export default React.memo(Selector);

const DefaultBuilder = ({ selected, showList }: IOptionBuilder) => {
  return (
    <div onClick={({ currentTarget }) => showList(currentTarget)} className={`form-selector ${selected.className || ""}`}>
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

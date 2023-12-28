import React from "react";
import { IListOption, ISelectorBuilder, ISelectorListBuilder, ISelectorProps, ToggleListProps } from "./Types";
import { Popup, PopupMe } from "morabaa-provider"; // Todo: return to this;
// import { Popup, PopupMe } from "../../../../Provider/src/lib/index";
import ToggleOptions from "./ToggleOptions";

const Selector = ({
  id = "selector",
  setValue,
  onChange = setValue ? ({ value }) => setValue(value) : undefined,
  options,
  label,
  value = "",
  getOptions,
  activeClassName,
  listClassName,
  listContainerClass,
  noOptionsMessage = "No options",
  optionsVisible = false,
  toggleOnSelect = true,
  builder: Builder = DefaultBuilder,
  listBuilder: ListBuilder = optionsVisible ? ToggleOptions : DefaultListBuilder,
  emptyOption = { value: "", label } as IListOption,

  listProps = {
    //
    offset: { x: 0, y: 5 },
    containerClass: listContainerClass,
    placement: "list",
    animation: "height",
    childClass: listClassName,
  },
}: ISelectorProps<any>) => {
  const [prop, setProp] = React.useState(
    options ? { options, selected: options?.findIndex((option) => option.value === value) } : { options: [], selected: -1 }
  );

  React.useEffect(() => {
    setProp((_prev) => ({ ..._prev, selected: _prev.options?.findIndex((option: IListOption) => option.value == value) }));
  }, [value]);

  const selected = React.useMemo(() => {
    const _selected = prop.options[prop.selected ?? prop.options?.findIndex((option: IListOption) => option.value == value)] ?? emptyOption ?? {}; // { displayTitle: label };
    // ?? prop.options[0] ?? { value: "", displayTitle: label };
    return { className: activeClassName, ..._selected, label: _selected.displayLabel ?? _selected.label };
  }, [prop, value]);

  React.useMemo(() => {
    if (getOptions) {
      setTimeout(async () => {
        let _options = await getOptions();
        let selected = !options && !value ? 0 : _options?.findIndex((option) => option.value == value);
        if (selected === 0 && _options.length > 0) onChange?.({ value: _options[0].value, label: _options[0].label, id, clear: () => onOptionChanged() });
        setProp({ options: _options, selected });
      }, 0);
    }
  }, []);

  const onOptionChanged = (option = prop.options[0]) => {
    if (toggleOnSelect) Popup.remove(id);
    if (option.value !== selected.value) {
      setProp((_prev) => ({ ..._prev, selected: _prev.options?.findIndex((_option: IListOption) => _option.value == option.value) }));
      setTimeout(() => {
        onChange?.({ value: option.value, label: option.label, id, clear: () => onOptionChanged() });
      }, 300);
    }
  };

  const toggleList = React.useCallback(
    async ({ container, show = true }: ToggleListProps) => {
      if (show === false || Popup.getPopup(id)) {
        Popup.remove(id);
        return;
      }
      if (getOptions) prop.options = await getOptions();
      // if (prop.options?.length < 1) return;
      PopupMe(ListBuilder, {
        componentProps: {
          options: prop.options,
          selected,
          onOptionChanged,
          className: selected.className,
          setOptions: (options) => setProp((_prev) => ({ ..._prev, options })),
          toggleList,
          activeClassName: selected.className,
          noOptionsMessage,
        } as ISelectorListBuilder,
        id,
        target: listProps.placement !== "center" ? container : undefined,
        childClass: listClassName,
        removeOnOutClick: true,
        ...listProps,
      });
    },
    [prop]
  );

  return !optionsVisible ? (
    <Builder
      toggleList={toggleList}
      options={prop.options}
      selected={selected}
      activeClassName={selected.className}
      setOptions={(options) => {
        setProp((_prev) => ({ ..._prev, options }));
      }}
    />
  ) : (
    <ListBuilder
      options={prop.options}
      selected={selected}
      onOptionChanged={onOptionChanged}
      activeClassName={selected.className}
      toggleList={toggleList}
      setOptions={(options) => {
        setProp((_prev) => ({ ..._prev, options }));
      }}
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default Selector;

const DefaultBuilder = ({ selected, toggleList }: ISelectorBuilder) => {
  return (
    <div onClick={({ currentTarget }) => toggleList({ container: currentTarget })} className={`form-selector ${selected.className || ""}`}>
      <p className="selector-label">{selected.label}</p>
    </div>
  );
};

const DefaultListBuilder = ({ options, selected, onOptionChanged, activeClassName, toggleList, noOptionsMessage }: ISelectorListBuilder) => {
  return (
    <div className="gap-l col" style={{ minWidth: 150 }}>
      {options.length ? (
        options.map((option, i) => {
          const _optionClass = option.className ?? activeClassName;
          const _notSelected = option.value !== selected.value;
          return (
            option.visible !== false && (
              <p
                onMouseEnter={({ currentTarget }) => {
                  if (_notSelected && _optionClass) currentTarget.classList.add(_optionClass);
                }}
                onMouseLeave={({ currentTarget }) => {
                  if (_notSelected && _optionClass) currentTarget.classList.remove(_optionClass);
                }}
                key={option.value}
                onClick={() => {
                  onOptionChanged(option);
                }}
                className={`selector-option ${_notSelected ? "" : _optionClass}`}>
                {option.label}
              </p>
            )
          );
        })
      ) : (
        <p className="selector-option">{noOptionsMessage}</p>
      )}
    </div>
  );
};

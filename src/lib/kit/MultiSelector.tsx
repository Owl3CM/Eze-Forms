import React, { useEffect } from "react";
import { IListOption, IMultiSelectorBuilder, IMultiSelectorListBuilder, IMultiSelectorProps, ToggleListProps } from "./Types";
import { Popup, PopupMe } from "morabaa-provider"; // Todo: return to this;
// import { Popup, PopupMe } from "../../../../Provider/src/lib/index";

export const MultiSelector = ({
  setValue,
  onChange = setValue ? ({ value }) => setValue(value) : undefined,
  options: defaultOptions,
  label,
  value = "",
  getOptions,
  listClassName,
  id = "selector",
  noOptionsMessage = "No options",
  toggleOnSelect = false,
  builder: Builder = DefaultBuilder,
  listBuilder: ListBuilder = DefaultListBuilder as any,
  listContainerClass,
  listProps = {
    //
    offset: { x: 0, y: 5 },
    containerClass: listContainerClass,
    placement: "list",
    animation: "height",
    childClass: listClassName,
  },
  placeholder = "Select...",
  inputClass = "flex-grow input",
}: IMultiSelectorProps<any>) => {
  const [options, setOptions] = React.useState<IListOption[]>(defaultOptions ?? []);
  const [inputValue, setInputValue] = React.useState("");
  const popupController = React.useMemo(() => ({ render: () => {} }), []);

  React.useEffect(() => {
    if (!value || value.length < 1)
      setOptions((_prev) =>
        _prev.map((o) => {
          o.selected = false;
          return o;
        })
      );
    else
      setOptions((_prev) =>
        _prev.map((o) => {
          o.selected = value.includes(o.value);
          return o;
        })
      );
  }, [value]);

  const selected = React.useMemo(() => options?.filter((o) => o.selected) ?? [], [options, value]);

  React.useMemo(() => {
    if (getOptions) {
      setTimeout(async () => {
        let _options = await getOptions();
        let selected = !defaultOptions && !value ? 0 : _options?.findIndex((option) => option.value == value);
        if (selected === 0 && _options.length > 0) onChange?.({ value: _options[0].value, label: _options[0].label, id, clear: () => onOptionChanged() });
        setOptions(_options);
      }, 0);
    }
  }, []);

  const onOptionChanged = (option = options[0]) => {
    if (toggleOnSelect) Popup.remove(id);
    // setProp((_prev) => ({ ..._prev, selected: _prev?.findIndex((_option: IListOption) => _option.value == option.value) }));
    setTimeout(
      () => onChange?.({ value: options.filter((s) => s.selected).map((s) => s.value), label: option.label, id, clear: () => onOptionChanged() }),
      toggleOnSelect ? 300 : 0
    );
  };

  const filter = React.useCallback(
    (value?: string) => {
      if (value !== undefined) {
        options.forEach((option: any) => {
          option.visible = option.label.toLowerCase().includes(value.toLowerCase());
        });
      }
      setOptions([...options]);
      popupController.render();
    },
    [options]
  );

  const select = (option: IListOption) => {
    option.selected = true;
    setInputValue("");
    popupController.render();
    setOptions([...options]);
    onOptionChanged();
  };
  const unSelect = (option: IListOption) => {
    option.selected = false;
    popupController.render();
    setOptions([...options]);
    onOptionChanged();
  };

  const unSelectAll = React.useCallback(() => {
    options.forEach((option: any) => (option.selected = false));
    setOptions([...options]);
    onOptionChanged();
  }, [options]);

  const selectAll = React.useCallback(() => {
    options.forEach((option: any) => (option.selected = true));
    setOptions([...options]);
    onOptionChanged();
  }, [options]);

  useEffect(() => {
    filter(inputValue);
  }, [inputValue]);

  const toggleList = React.useCallback(
    async ({ container, show = true }: ToggleListProps) => {
      if (show === false) {
        Popup.remove(id);
        return;
      }
      let _options = options;
      if (Popup.getPopup(id)) return;
      if (getOptions) _options = await getOptions();
      if (_options?.length < 2) return;
      PopupMe(
        <ListContainer
          controller={popupController}
          Component={ListBuilder}
          props={{ options: _options, selected, setOptions: setOptions, select, selectAll, unSelectAll, noOptionsMessage, toggleList, unSelect }}
        />,
        {
          id,
          target: listProps.placement !== "center" ? container : undefined,
          childClass: listClassName,
          removeOnOutClick: true,
          ...listProps,
        }
      );
    },
    [options]
  );

  return (
    <Builder
      selected={selected}
      unSelect={unSelect}
      toggleList={toggleList}
      options={options}
      inputClass={inputClass}
      inputValue={inputValue}
      setInputValue={setInputValue}
      placeholder={placeholder}
      selectAll={selectAll}
      unSelectAll={unSelectAll}
      select={select}
      setOptions={setOptions}
    />
  );
};

const DefaultBuilder = ({
  selected,
  unSelect,
  toggleList,
  options,
  inputClass,
  inputValue,
  setInputValue,
  placeholder,
  selectAll,
  unSelectAll,
  select,
  setOptions: setProp,
}: IMultiSelectorBuilder) => {
  return (
    <div className="multi-selector bg-king p-lg gap-lg">
      {/* <Icon icon={icon} className={`${options?.length > 1 ? "" : " opacity-20"}`} /> */}
      {/* options.map(
        (option: any) =>
          option.selected && ( */}
      {selected.map((option: any) => (
        <div
          key={option.value}
          className="selector-list-label"
          onClick={(e) => {
            e.stopPropagation();
            unSelect(option);
          }}>
          x <p>{option.label}</p>
        </div>
      ))}
      <input
        className={inputClass}
        value={inputValue}
        onChange={({ currentTarget }) => setInputValue(currentTarget.value)}
        placeholder={options?.some((o) => o.selected) ? "" : placeholder}
        onFocus={({ currentTarget }) => {
          toggleList({ container: currentTarget.parentElement as HTMLElement });
        }}
      />
    </div>
  );
};

export const DefaultListBuilder = ({
  options,
  select,
  noOptionsMessage,
  selectAll,
  unSelectAll,
  selected,
  setOptions: setProp,
  toggleList,
  unSelect,
}: IMultiSelectorListBuilder) => {
  const _Options = options.filter((o) => o.visible !== false && !o.selected);

  return _Options.length ? (
    _Options.map((option: any, i: number) => (
      <button
        type="button"
        key={option.value}
        data-list-item-disabled={option.disabled}
        className="selector-list-item"
        onClick={() => {
          if (option.disabled) return;
          select(option);
        }}>
        {option.label}
      </button>
    ))
  ) : (
    <p className="text-center">{noOptionsMessage}</p>
  );
};

const ListContainer = ({ controller, Component, props }: { controller: any; Component: any; props: IMultiSelectorListBuilder }) => {
  const [_, render] = React.useState(0);
  controller.render = React.useCallback(() => render((prev) => prev + 1), []);
  return <Component {...props} />;
};

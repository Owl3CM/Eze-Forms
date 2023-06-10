import React from "react";
import { IOptionBuilder, IOptionsProps } from "../Types";

const OptionsBuilder = ({
  onChange,
  options,
  title,
  value = "",
  storageKey = "",
  getData,
  onInit,
  builder: Builder,
  ...props
}: IOptionsProps<any> & {
  builder: React.FC<IOptionBuilder & any>;
}) => {
  const _value = React.useMemo(getDefaultValue(storageKey, value), []);

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
      id: props.id,
    };
    if (getData) {
      setTimeout(async () => {
        let _options = (await getData()) as any[];
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
      id: props.id,
      clear: () => _onOptionChanged(),
    });
    if (storageKey) localStorage.setItem(storageKey, option.id as any);
    setProp((_prev) => ({ ..._prev, selected: i }));
  };

  return <Builder _onOptionChanged={_onOptionChanged} prop={prop} selected={selected} {...props} />;
};

export default React.memo(OptionsBuilder);

function getDefaultValue(storageKey: string, value: any): () => any {
  return () => {
    let _stored = localStorage.getItem(storageKey);
    if (_stored) {
      try {
        return JSON.parse(_stored);
      } catch (e) {
        return _stored;
      }
    }
    return value;
  };
}

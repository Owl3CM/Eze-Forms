import React from "react";

const Selector = ({
  id,
  title,
  onChange,
  options,
  value = "",
  className = "",
  storageKey = "",
  icon: Icon = DefaultIcon,
  activClass = "selected-option",
  button: Button = DefaultButton,
  getData,
  style,
  init,
}) => {
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
  const [popup, setPopup] = React.useState(false);
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
        if (selected === 0 && _options.length > 0) onChange(_options[0].id);
        setProp({ options: _options, selected });
        init && init(initData);
      }, 0);
    } else init && init(initData);
  }, []);

  const _onOptionChanged = (option = prop.options[0], i = 0) => {
    if (storageKey) localStorage.setItem(storageKey, option.id);
    onChange({
      value: option.id,
      title: option.title,
      id,
      clear: _onOptionChanged,
    });
    setProp((_prev) => ({ ..._prev, selected: i }));
  };
  const closePoup = () => {
    setPopup(false);
    window.removeEventListener("click", closePoup);
  };

  return prop.options.length > 0 ? (
    <Button
      onClick={() => {
        if (prop.options?.length < 2) return;
        if (popup) closePoup();
        else {
          setPopup(true);
          setTimeout(() => {
            window.addEventListener("click", closePoup);
          });
        }
      }}
      id={id}
      style={style}
      className={`relative ${selected.className || className}`}
      title={selected.dispalyTitle || selected.title}
      options={prop.options}
      active={popup}
      Icon={Icon}>
      {popup && (
        <div className="selector-child scroller">
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
                className={`selector-option ${_notSelected ? "" : _optionClass}`}>
                {option.title}
              </p>
            );
          })}
        </div>
      )}
    </Button>
  ) : (
    <></>
  );
};
export default React.memo(Selector);

const DefaultIcon = ({ options, active }) => (
  <svg
    height={8}
    style={{
      marginRight: "auto",
      opacity: options.length > 1 ? 1 : 0.4,
      rotate: active ? "180deg" : "0deg",
    }}
    className="selector-button-svg"
    viewBox="0 0 512.02 319.26">
    <path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z" />
  </svg>
);

export const DefaultButton = ({ title, children, id, onClick, className, active, options, Icon, style }) => {
  return (
    <div onClick={onClick} id={id} className={"selector-button " + className} style={style}>
      <p className="cut-words" style={{ width: 100 }}>
        {title}
      </p>
      <Icon options={options} active={active} />
      {children}
    </div>
  );
};

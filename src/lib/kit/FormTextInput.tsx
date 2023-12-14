import React from "react";
import { IClearIconProps, IInputProps } from "../Types";
import { TimedCallback } from "morabaa-utils";

const FormTextInput = ({
  id,
  onChange,
  placeholder,
  value = "",
  className = "",
  dely = 0,
  onFocus,
  style,
  onInit,
  clearIcon: ClearIcon = _clearIcon,
  containerClass = "search-input-container",
  ...props
}: IInputProps) => {
  let container: HTMLDivElement;

  const setValue = (value: string, effect = false) => {
    const target = container.querySelector("input") as HTMLInputElement;
    target.value = value;
    (target.nextSibling as any).setAttribute("data-input-has-value", (!!value).toString());
    effect && onChange?.({ clear, value, title: placeholder, id, setValue });
  };
  React.useEffect(() => {
    setValue(value, false);
  }, [value]);

  const clear = (effect = false) => setValue("", effect);
  onInit?.({ setValue, clear, value, title: placeholder, id });

  const onInputChange = ({ target }: { target: HTMLElement | any }, _dely = dely) => {
    const callback = () => {
      value = target.value;
      target.nextSibling.setAttribute("data-input-has-value", (!!value).toString());
      onChange?.({ setValue, clear, value: value, title: placeholder, id });
    };
    _dely > 0 ? TimedCallback.create({ id, callback, timeout: _dely, onRepated: () => {} }) : callback();
  };

  return (
    <div className={containerClass} ref={(_ref) => _ref && (container = _ref)}>
      <input
        id={id}
        type="text"
        tabIndex={-1}
        defaultValue={value}
        onChange={onInputChange}
        placeholder={placeholder}
        className={`${className} form-search-input`}
        onFocus={({ target }) => {
          onFocus?.({ clear, value: target.value, title: placeholder, id });
        }}
        {...props}
      />
      <div data-input-has-value={(!!value).toString()}>{ClearIcon && <ClearIcon value={value} clear={(effect = true) => clear(effect)} />}</div>
    </div>
  );
};

export default FormTextInput;

const _clearIcon = ({ clear, value }: IClearIconProps) => <span onClick={() => clear(true)} className="delete-mark" />;

// function ClearIcon({ value, xId, clear }) {
//   return (
//     <svg
//       className={`clear-icon ${value ? "" : "hide"}`}
//       id={xId}
//       onClick={clear}
//       height={10}
//       style={{ fill: "var(--red)" }}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 460.775 460.775">
//       <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z" />
//     </svg>
//   );
// }

import React from "react";
import { TimedCallback } from "morabaa-utils";
import { IInputProps } from "./Types";

export const Input = ({
  id,
  service,
  onChange = service?.set as any,
  value = service?.get(id) ?? "",
  placeholder,
  dely = 0,
  valdiateOn = "onChange",
  type = "text",
  ...rest
}: IInputProps) => {
  let controller = React.useMemo(() => {
    return {
      id,
      value,
      title: placeholder,
      input: null as any,

      getValue: () => controller.value,
      clear: (effect = false) => controller.setValue("", effect),
      setValue: (value: string, effect = false) => {
        controller.value = value;
        controller.input.value = value;
        effect && onChange?.(controller);
      },
      onChange: onChange
        ? dely > 0
          ? ({ target: { value } }: any) => {
              controller.value = value;
              TimedCallback.create({ id, callback: onChange(controller) as any, timeout: dely, onRepated: () => {} });
            }
          : ({ target: { value } }: any) => {
              controller.value = value;
              onChange(controller);
            }
        : null,
    };
  }, []);

  return (
    <input
      tabIndex={-1}
      defaultValue={value}
      placeholder={placeholder}
      onChange={valdiateOn === "onChange" ? controller.onChange : null}
      onBlur={valdiateOn === "onBlur" ? controller.onChange : null}
      type={type}
      ref={(_ref: any) => {
        if (!_ref) return;
        controller.input = _ref;
        if (service?.subscribe) {
          const parent = _ref.parentElement;
          parent.setAttribute("data-position", "bottom");
          service.subscribe({
            id,
            setValue: controller.setValue,
            onError: (error: string) => parent.setAttribute("data-input-error", error),
            onSuccess: () => parent.removeAttribute("data-input-error"),
          });
          controller.setValue(service.get(id));
        }
      }}
      {...rest}
    />
  );
};

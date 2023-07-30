import React from "react";
import { TimedCallback } from "morabaa-utils";
import { IKitProps } from "./Types";
import { IFormChange } from "@/Forms/Types";

export interface IInputProps extends IKitProps {
  //extends React.InputHTMLAttributes<HTMLInputElement> {
  dely?: number;
  placeholder?: string;
  service?: null | {
    subscribe: (props: { id: string; onError: (error: string) => void; onSuccess: () => void; setValue: (value: string) => void }) => void;
    get: (id: string) => string;
    set: ({ id, value }: IFormChange) => void;
  };
  valdiateOn?: "onChange" | "onBlur" | "onFocus" | "none";
}

export const Input = ({
  id,
  service,
  onChange = service?.set as any,
  value = service?.get(id) ?? "",
  placeholder,
  dely = 0,
  containerClassName = "col w-full",
  valdiateOn = "onChange",
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
      onFocus={valdiateOn === "onFocus" ? controller.onChange : null}
      ref={(_ref: any) => {
        if (!_ref) return;
        controller.input = _ref;
        const parent = _ref.parentElement;
        parent.setAttribute("data-position", "bottom");
        if (service?.subscribe) {
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

  // React.useEffect(() => {
  //     controller.setValue(value, false);
  // }, [value]);
};

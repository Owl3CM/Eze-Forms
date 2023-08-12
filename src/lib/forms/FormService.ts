import { JsonBuilder, Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";
export type defaultFormState = "idle" | "loading" | "error" | "success" | "processing";
export type IFormService<T = any, State = defaultFormState> = FormService<T, State>;

export default class FormService<T, State = defaultFormState> {
  private validationSchema: any;
  defaultValues = {} as T;
  state = "idle";
  setState: React.Dispatch<React.SetStateAction<State | defaultFormState>> = () => {};

  values: T = {} as T;
  reset = (values: T = this.defaultValues, valdiate = false) => {
    (this.values as any) = values;
    Object.entries(this.values as any).map(([id, value]: any) => {
      if (valdiate) this.valdiate(id, value);
      this.privateSetValue(id, value);
    });
  };
  upload = defaultUpload;
  load: (valdiate?: boolean) => void;
  reload: (valdiate?: boolean) => void;

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.entries(this.values as any).every(([key, value]) => this.valdiate(key, value as any))) {
      this.upload(this.values);
    }
  };
  set = ({ id, value }: IFormChange) => {
    this.valdiate(id, value);
    (this.values as any)[id] = value;
  };
  setValue = ({ id, value }: IFormChange) => {
    this.valdiate(id, value);
    this.privateSetValue(id, value);
  };
  get = (id: string) => (this.values as any)[id] ?? "";
  getValues = (ids: string[]) => ids.map((id) => this.get(id));
  subscribe = ({ id, setValue, setError, onSuccess }: SubscribeProps) => {
    (this as any)[`set${id}`] = setValue;
    (this as any)[`set${id}Error`] = setError ?? ((error: string) => error && Toast.error({ title: error }));
    (this as any)[`on${id}Success`] = onSuccess ?? setError;
  };
  setError = (id: string, error: string) => {
    (this as any)[`set${id}Error`](error);
  };

  setValueToArray = (id: string, value: string, i: number) => {
    this.valdiate(id, value);
    (this.values as any)[id][i] = value;
  };

  private valdiate = (id: string, value: string) => {
    try {
      this.validationSchema.validateSyncAt(id, { [id]: value });
    } catch ({ message }: any) {
      if (!(message as any).includes("The schema does not contain the path")) {
        this.setError(id, message as any);
        return false;
      }
    }
    this.onSuccess(id);
    return true;
  };
  private privateSetValue = (id: string, value: string) => {
    (this as any)[`set${id}`]?.(value);
    (this.values as any)[id] = value;
  };
  private onSuccess = (id: string) => {
    (this as any)[`on${id}Success`]?.();
  };

  constructor({ defaultValues, validationSchema, onSubmit, load, mode = "onBlur", valdiateOnLoad }: IFormProps<T>) {
    this.validationSchema = validationSchema;
    this.defaultValues = defaultValues;
    if (onSubmit) this.upload = onSubmit;
    if (load) {
      const _load = async (valdiate = valdiateOnLoad) => {
        this.setState("processing");
        this.reset(await load(), valdiate);
        this.setState("idle");
      };
      this.load = _load;
    } else this.load = (valdiate = valdiateOnLoad) => this.reset(defaultValues, valdiate);
    this.reload = this.load;
  }
}
function defaultUpload(formData: any) {
  Toast.warn({ title: "upload not implemented." });
  PopupMe({
    Component: JsonBuilder,
    componentProps: { json: formData },
  });
}

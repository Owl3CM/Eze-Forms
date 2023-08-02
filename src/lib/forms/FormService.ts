import { JsonBuilder, Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";

export type IFormService<T = any> = FormService<T>;

export default class FormService<T> {
  private validationSchema: any;
  formData: T = {} as T;
  setFormData = (formData: T, valdiate = false) => {
    (this.formData as any) = formData;
    Object.entries(this.formData as any).map(([id, value]: any) => {
      if (valdiate) this.valdiate(id, value);
      this.setValue(id, value);
    });
  };
  upload = (formData: T) => {
    Toast.warn({ title: "upload not implemented." });
    PopupMe({
      Component: JsonBuilder,
      componentProps: { json: formData },
    });
  };
  load = (valdiate = true) => {};
  reload = (valdiate = true) => {};
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.entries(this.formData as any).every(([key, value]) => this.valdiate(key, value as any))) {
      this.upload(this.formData as any);
    }
  };
  set = ({ id, value, effect = false }: IFormChange) => {
    this.valdiate(id, value);
    (this.formData as any)[id] = value;
    if (effect) this.setValue(id, value);
  };
  get = (id: string) => (this.formData as any)[id] ?? "";
  subscribe = ({ id, setValue, onError, onSuccess }: SubscribeProps) => {
    (this as any)[`set${id}`] = setValue;
    (this as any)[`on${id}Error`] = onError;
    (this as any)[`on${id}Success`] = onSuccess;
  };
  private valdiate = (id: string, value: string) => {
    try {
      this.validationSchema.validateSyncAt(id, { [id]: value });
    } catch ({ message }: any) {
      if (!(message as any).includes("The schema does not contain the path")) {
        this.onError(id, message as any);
        return false;
      }
    }
    this.onSuccess(id);
    return true;
  };
  private setValue = (id: string, value: string) => {
    (this as any)[`set${id}`]?.(value);
  };
  private onError = (id: string, error: string) => {
    const errorFunc = (this as any)[`on${id}Error`];
    errorFunc ? errorFunc(error) : Toast.error({ title: error });
  };
  private onSuccess = (id: string) => {
    (this as any)[`on${id}Success`]?.();
  };

  onPriceChange = ({ id, value }: any) => {
    console.log(id, value);
    this.set({ id, value });
    this.set({ id: "address", value: (value * 2) as any, effect: true });
  };

  constructor({ defaultValues, validationSchema, upload, load, reload = load, valdiateOnLoad = true }: IFormProps<T>) {
    (this.formData as any) = defaultValues;
    this.validationSchema = validationSchema;
    upload && (this.upload = upload);
    if (load) {
      this.load = async (valdiate = valdiateOnLoad) => {
        this.setFormData(await load(), valdiate);
      };
      this.reload = async (valdiate = valdiateOnLoad) => {
        this.setFormData(await (reload as any)(), valdiate);
      };
      this.load(valdiateOnLoad);
    } else {
      this.load = () => this.setFormData(defaultValues, valdiateOnLoad);
      (this as any).reload = load;
    }
  }
}

import { JsonBuilder, Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";

export type IFormService<T = any> = FormService<T>;

export default class FormService<T> {
  private validationSchema: any;
  formData: T = {} as T;
  setFormData = (formData: T, valdiate = false) => {
    this.formData = formData;
    Object.entries(this.formData).map(([id, value]) => {
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
    if (Object.entries(this.formData).every(([key, value]) => this.valdiate(key, value as any))) {
      this.upload(this.formData);
    }
  };
  set = ({ id, value, effect = false }: IFormChange) => {
    this.valdiate(id, value);
    this.formData[id] = value;
    if (effect) this.setValue(id, value);
  };
  get = (id: string) => this.formData[id] ?? "";
  subscribe = ({ id, setValue, onError, onSuccess }: SubscribeProps) => {
    this[`set${id}`] = setValue;
    this[`on${id}Error`] = onError;
    this[`on${id}Success`] = onSuccess;
  };
  private valdiate = (id: string, value: string) => {
    try {
      this.validationSchema.validateSyncAt(id, { [id]: value });
    } catch ({ message }) {
      if (!message.includes("The schema does not contain the path")) {
        this.onError(id, message);
        return false;
      }
    }
    this.onSuccess(id);
    return true;
  };
  private setValue = (id: string, value: string) => {
    this[`set${id}`]?.(value);
  };
  private onError = (id: string, error: string) => {
    const errorFunc = this[`on${id}Error`];
    errorFunc ? errorFunc(error) : Toast.error({ title: error });
  };
  private onSuccess = (id: string) => {
    this[`on${id}Success`]?.();
  };

  onPriceChange = ({ id, value }: any) => {
    console.log(id, value);
    this.set({ id, value });
    this.set({ id: "address", value: (value * 2) as any, effect: true });
  };

  constructor({ defaultValues, validationSchema, upload, load, reload = load, valdiateOnLoad = true }: IFormProps<T>) {
    this.formData = defaultValues;
    this.validationSchema = validationSchema;
    upload && (this.upload = upload);
    if (load) {
      this.load = async (valdiate = valdiateOnLoad) => {
        this.setFormData(await load(), valdiate);
      };
      this.reload = async (valdiate = valdiateOnLoad) => {
        this.setFormData(await reload(), valdiate);
      };
      this.load(valdiateOnLoad);
    } else {
      this.load = () => this.setFormData(defaultValues, valdiateOnLoad);
      this.reload = this.reload;
    }
  }
}

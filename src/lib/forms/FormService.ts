import { Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";

export type IFormService<T = any> = FormService<T>;

export default class FormService<T> {
  private validationSchema: any;
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>> = (formData: T) => {
    this.formData = formData;
    Object.entries(this.formData).map(([id, value]) => {
      this.setValue(id, value);
      this.valdiate(id, value as any);
    });
  };
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.entries(this.formData).every(([key, value]) => this.valdiate(key, value as any))) {
      Toast.success({ title: "All Good" });
    }
  };
  set = ({ id, value }: IFormChange) => {
    this.valdiate(id, value);
    this.formData[id] = value;
  };
  get = (id: string) => this.formData[id];
  subscribe = ({ id, setValue, onError, onSuccess }: SubscribeProps) => {
    this[`set${id}`] = setValue;
    this[`on${id}Error`] = onError;
    this[`on${id}Success`] = onSuccess;
  };
  private valdiate = (id: string, value: string) => {
    try {
      this.validationSchema.validateSyncAt(id, { [id]: value });
      this.onSuccess(id);
      return true;
    } catch ({ message }) {
      this.onError(id, message);
    }
  };
  private setValue = (id: string, value: string) => {
    this[`set${id}`]?.(value);
  };
  private onError = (id: string, error: string) => {
    this[`on${id}Error`]?.(error);
  };
  private onSuccess = (id: string) => {
    this[`on${id}Success`]?.();
  };

  constructor({ defaultValues, validationSchema }: IFormProps<T>) {
    this.formData = defaultValues;
    this.validationSchema = validationSchema;
  }
}

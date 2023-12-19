import { JsonBuilder, Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";
import { StateBuilder } from "morabaa-services";
export type defaultFormState = "idle" | "loading" | "error" | "success" | "processing";
export type IFormService<T = any, State = defaultFormState> = FormService<T, State>;

type FormType = "edit" | "add";

export default class FormService<T, State = any> extends StateBuilder<State> {
  // private submitButtonRef: HTMLButtonElement | null = null;
  private validationSchema: any;
  private dataChanged = false;
  private setToValues = (id: string, value: string) => {
    (this.values as any)[id] = value;
    (this as any)[`${id}Changed`]?.(value);
    this.valuesChanged(id, value);
  };
  valuesChanged = (id: string, value: string) => {};

  type: FormType = "add";
  setType = (type: FormType) => {
    this.type = type;
  };

  onDataChanged = (isChanged: boolean) => {};
  defaultValues = {} as T;
  errors: { [key: string]: string } = {};

  values: T = {} as T;
  reset = (values: T, valdiate = false, effective = false) => {
    (this.values as any) = values ?? this.defaultValues;
    Object.entries(this.values as any).map(([id, value]: any) => {
      if (valdiate) this.valdiateAndError(id, value);
      else this.getError(id, value);
      if (effective) this.effectiveSetNoValidate({ id, value });
      else this.effectiveSetNoValidate({ id, value });
      // (this.values as any)[id] = value;
    });
  };
  upload = defaultUpload;
  load: (valdiate?: boolean) => void;
  reload: (valdiate?: boolean) => void;

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Object.keys(this.values as any).map((key) => this.onSuccess(key));
    setTimeout(() => {
      Object.entries(this.values as any).map(([key, value]) => this.valdiateAndError(key, value as any));
      if (!Object.keys(this.errors).length) this.upload(this.values);
    }, 100);
    // if (Object.entries(this.values as any).every(([key, value]) => this.valdiateAndError(key, value as any))) {
    //   this.upload(this.values);
    // }
  };

  noValidateSet = ({ id, value }: IFormChange) => {
    this.setToValues(id, value);
    this.checkDataChanged();
  };

  effectiveSet = ({ id, value }: IFormChange) => {
    this.valdiateAndError(id, value);
    this.effectiveSetNoValidate({ id, value });
  };

  effectiveSetNoValidate = ({ id, value }: IFormChange) => {
    this.privateEffectiveSetValue(id, value);
    this.checkDataChanged();
  };

  silentSet = ({ id, value }: IFormChange) => {
    this.valdiateAndError(id, value);
    this.setToValues(id, value);
    this.checkDataChanged();
  };

  get = (id: string) => (this.values as any)[id] ?? "";
  getValues = (ids: string[]) => ids.map((id) => this.get(id));
  subscribe = ({ id, setValue, setError, onSuccess }: SubscribeProps) => {
    (this as any)[`set${id}`] = setValue;
    (this as any)[`set${id}Error`] = setError;
    (this as any)[`on${id}Success`] = onSuccess
      ? () => {
          onSuccess();
          this.onError(id, "");
        }
      : setError;
  };

  getErrors = () => this.errors;
  onError = (id: string, error?: string) => {};
  setError = (id: string, error: string) => {
    const onError = (this as any)[`set${id}Error`];
    if (onError) onError(error);
    else Toast.error({ title: "Error", content: error, timeout: 5000 });
    this.onError(id, error);
  };

  // Array
  setValueToArray = (id: string, value: string, i: number) => {
    if (!(this.values as any)[id]) (this.values as any)[id] = [];
    if (!value) this.removeFromArray({ id, i });
    else this.addToArray({ id, value });
  };
  addToArray = ({ id, value }: IFormChange) => {
    // this.valdiateAndError(id, value);
    (this.values as any)[id].push(value);
  };
  removeFromArray = ({ id, i }: { id: string; i: number }) => {
    // this.valdiateAndError(id, "");
    (this.values as any)[id].splice(i, 1);
  };
  // Array

  private valdiateAndError = (id: string, value: string | any) => {
    let _value = value;
    if (typeof value === "object") _value = value?.value;
    const message = this.getError(id, _value);
    message ? this.setError(id, message as any) : this.onSuccess(id);
    return !message;
  };
  private getError = (id: string, value: string) => {
    try {
      this.validationSchema.validateSyncAt(id, { [id]: value });
      this.removeError(id);
    } catch ({ message }: any) {
      if (!(message as any).includes("The schema does not contain the path")) {
        this.addError(id, message as string);
        return message;
      }
    }
  };
  private checkDataChanged = () => {
    const isChanged = Object.entries(this.defaultValues as any).some(([key, val]) => val !== (this.values as any)[key]);
    if (this.dataChanged !== isChanged) {
      this.dataChanged = isChanged;
      this.setIsDirty(isChanged);
      this.onDataChanged(isChanged);
    }
  };

  private privateEffectiveSetValue = (id: string, value: string) => {
    (this as any)[`set${id}`]?.(value);
    this.setToValues(id, value);
  };
  private onSuccess = (id: string) => {
    (this as any)[`on${id}Success`]?.();
  };

  setIsDirty = (isDirty: boolean) => {
    this.isDirty = isDirty;
  };
  isDirty = false;

  // private checkSubmitButton = () => {
  //   if (this.submitButtonRef) {
  //     const hasError = Object.keys(this.errors).length > 0;
  //     this.submitButtonRef.disabled = hasError;
  //   }
  // };

  private removeError = (id: string) => {
    if (this.errors[id]) {
      delete this.errors[id];
      this.onErrorChanged(this.errors);
    }
    // this.checkSubmitButton();
  };
  private addError = (id: string, error: string) => {
    if (!this.errors[id] && error) {
      this.errors[id] = error;
      this.onErrorChanged(this.errors);
    }
    // this.checkSubmitButton();
  };
  onErrorChanged = (value: { [key: string]: string }) => {};
  render = (name = "") => {
    if (!name) name = "Default";
    const fn = (this as any)[`render${name}`];
    if (fn) fn();
    else throw new Error("You need to use useRender.");
  };
  constructor({ defaultValues, validationSchema, onSubmit, load, mode = "onBlur", valdiateOnLoad, onDataChanged, onErrorChanged }: IFormProps<T>) {
    super();
    this.validationSchema = validationSchema;
    this.defaultValues = { ...defaultValues };
    this.values = { ...this.defaultValues };
    if (onDataChanged) this.onDataChanged = onDataChanged;
    if (onErrorChanged) this.onErrorChanged = onErrorChanged;
    if (onSubmit) this.upload = onSubmit;
    if (load) {
      const _load = async (valdiate = valdiateOnLoad) => {
        this.setState("processing");
        const newValues = await load();
        this.defaultValues = newValues;
        this.reset(this.defaultValues, valdiate, true);
        this.setState("idle");
      };
      this.load = _load;
    } else this.load = (valdiate = valdiateOnLoad) => this.reset(defaultValues, valdiate, false);
    this.reload = this.load;
    // setTimeout(() => {
    //   this.submitButtonRef = (document.querySelector("button[type=submit]") || document.querySelector("input[type=submit]")) as any;
    Object.entries(this.values as any).map(([id, value]: any) => this.getError(id, value));
    // }, 5);
  }
  static render = () => {
    throw new Error("You need to use useRender.");
  };
}
function defaultUpload(formData: any) {
  Toast.warn({ title: "upload not implemented." });
  PopupMe(JsonBuilder, {
    componentProps: { json: formData },
  });
}

import { JsonBuilder, Toast } from "morabaa-utils";
import React from "react";
import { IFormChange, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";
import { StateBuilder } from "morabaa-services";
export type defaultFormState = "idle" | "loading" | "error" | "success" | "processing";
export type IFormService<T = any, State = defaultFormState> = FormService<T, State>;

export default class FormService<T, State = any> extends StateBuilder<State> {
  // private submitButtonRef: HTMLButtonElement | null = null;
  private validationSchema: any;
  private dataChanged = false;
  defaultValues = {} as T;
  errors: { [key: string]: string } = {};

  values: T = {} as T;
  reset = (values: T, valdiate = false) => {
    (this.values as any) = values ?? this.defaultValues;
    Object.entries(this.values as any).map(([id, value]: any) => {
      if (valdiate) this.valdiateAndError(id, value);
      else this.getError(id, value);
      this.privateSetValue(id, value);
    });
  };
  upload = defaultUpload;
  load: (valdiate?: boolean) => void;
  reload: (valdiate?: boolean) => void;

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.entries(this.values as any).every(([key, value]) => this.valdiateAndError(key, value as any))) {
      this.upload(this.values);
    }
  };
  set = ({ id, value }: IFormChange) => {
    this.valdiateAndError(id, value);
    (this.values as any)[id] = value;
    this.checkDataChanged();
  };
  setValue = ({ id, value }: IFormChange) => {
    this.valdiateAndError(id, value);
    this.privateSetValue(id, value);
    this.checkDataChanged();
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
    this.valdiateAndError(id, value);
    (this.values as any)[id][i] = value;
  };

  private valdiateAndError = (id: string, value: string) => {
    const message = this.getError(id, value);
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
    } else this.setIsDirty(false);
  };

  private privateSetValue = (id: string, value: string) => {
    (this as any)[`set${id}`]?.(value);
    (this.values as any)[id] = value;
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

  constructor({ defaultValues, validationSchema, onSubmit, load, mode = "onBlur", valdiateOnLoad, onDataChanged, onErrorChanged }: IFormProps<T>) {
    super();
    this.validationSchema = validationSchema;
    this.defaultValues = { ...defaultValues };
    this.values = { ...this.defaultValues };
    if (onDataChanged) this.setIsDirty = onDataChanged;
    if (onErrorChanged) this.onErrorChanged = onErrorChanged;
    if (onSubmit) this.upload = onSubmit;
    if (load) {
      const _load = async (valdiate = valdiateOnLoad) => {
        this.setState("processing");
        const newValues = await load();
        this.defaultValues = newValues;
        this.reset(this.defaultValues, valdiate);
        this.setState("idle");
      };
      this.load = _load;
    } else this.load = (valdiate = valdiateOnLoad) => this.reset(defaultValues, valdiate);
    this.reload = this.load;
    // setTimeout(() => {
    //   this.submitButtonRef = (document.querySelector("button[type=submit]") || document.querySelector("input[type=submit]")) as any;
    Object.entries(this.values as any).map(([id, value]: any) => this.getError(id, value));
    // }, 5);
  }
}
function defaultUpload(formData: any) {
  Toast.warn({ title: "upload not implemented." });
  PopupMe({
    Component: JsonBuilder,
    componentProps: { json: formData },
  });
}

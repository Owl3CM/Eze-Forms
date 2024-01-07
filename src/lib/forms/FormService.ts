import React from "react";
import { JsonBuilder, Toast } from "morabaa-utils";
import { FormType, IFormProps, SubscribeProps } from "./Types";
import { PopupMe } from "morabaa-provider";
import { StateBuilder } from "morabaa-services";
export type defaultFormState = "idle" | "loading" | "error" | "success" | "processing";
export type IFormService<T = any, State = defaultFormState> = FormService<T, State>;

export class FormService<T, State = any> extends StateBuilder<State> {
  // private submitButtonRef: HTMLButtonElement | null = null;
  private validationSchema: any;
  private dataChanged = false;
  private setToValues = (id: keyof T, value: any) => {
    (this.values as any)[id] = value;
    (this as any)[`${id as any}Changed`]?.(value);
    this.valuesChanged(id, value);
  };
  valuesChanged = (id: keyof T, value: any) => {};

  type: FormType = "new";
  setType = (type: FormType) => {
    this.type = type;
  };

  onDataChanged = (isChanged: boolean) => {};
  defaultValues = {} as T;
  errors: { [key: string]: string } = {} as any;

  values: T = {} as T;
  reset = (values: T, valdiate = false, effective = false) => {
    (this.values as any) = { ...(values ?? this.defaultValues) };
    Object.entries(this.values as any).map(([id, value]: any) => {
      if (valdiate) this.startValdiateAndError(id, value);
      else this.getError(id, value);
      if (effective) this.effectiveSetNoValidate(id, value);
      else this.effectiveSetNoValidate(id, value);
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
      Object.entries(this.values as any).map(([key, value]: any) => this.startValdiateAndError(key, value));
      if (!Object.keys(this.errors).length) this.upload(this.values);
      else console.error("Form has errors", this.errors);
      // else
      //   Toast.error({
      //     title: "Error",
      //     content: Object.entries(this.errors)
      //       .map(([key, value]) => `${key}: ${value}`)
      //       .join("\n"),
      //     timeout: 5000,
      //   });
    }, 100);
    // if (Object.entries(this.values as any).every(([key, value]) => this.valdiateAndError(key, value as any))) {
    //   this.upload(this.values);
    // }
  };

  noValidateSet = (id: keyof T, value: any) => {
    this.setToValues(id, value);
    this.checkDataChanged();
  };

  effectiveSet = (id: keyof T, value: any) => {
    this.startValdiateAndError(id, value);
    this.effectiveSetNoValidate(id, value);
  };

  effectiveSetNoValidate = (id: keyof T, value: any) => {
    this.privateEffectiveSetValue(id, value);
    this.checkDataChanged();
  };

  silentSet = (id: keyof T, value: any) => {
    this.startValdiateAndError(id, value);
    this.setToValues(id, value);
    this.checkDataChanged();
  };

  get = (id: keyof T) => (this.values as any)[id] ?? "";
  getValues = (ids: string[]) => ids.map((id) => this.get(id as any));
  subscribe = ({ id, setValue, setError, onSuccess }: SubscribeProps) => {
    (this as any)[`set${id}`] = setValue;
    (this as any)[`set${id}Error`] = setError;
    (this as any)[`on${id}Success`] = onSuccess ?? setError;
  };

  getErrors = () => this.errors;
  setError = (id: keyof T, error: string) => {
    const onError = (this as any)[`set${id as any}Error`];
    console.log({ onError });
    if (onError) onError(error);
    else Toast.error({ title: "Error", content: `${error}: ${id as any}`, timeout: 5000 });
  };

  // Array
  setValueToArray = (id: keyof T, value: string, i: number) => {
    if (!(this.values as any)[id]) (this.values as any)[id] = [];
    if (!value) this.removeFromArray({ id, i });
    else this.addToArray(id, value);
  };
  addToArray = (id: keyof T, value: any) => {
    // this.valdiateAndError(id, value);
    (this.values as any)[id].push(value);
  };
  removeFromArray = ({ id, i }: { id: keyof T; i: number }) => {
    // this.valdiateAndError(id, "");
    (this.values as any)[id].splice(i, 1);
  };
  // Array

  private startValdiateAndError = (id: keyof T, value: any) => {
    return this.valdiateAndError(id, value, id);
  };
  private valdiateAndError = (id: keyof T, value: any, parentId: keyof T) => {
    let errors: any;
    if (value && typeof value === "object") {
      Object.entries(value).map(([key, val]: any) => {
        const _err = this.getError(`${id as any}_${key}` as any, val);
        if (_err) {
          if (!errors) errors = {};
          errors[key] = _err;
        }
      });
    } else {
      errors = this.getError(id, value);
    }
    // console.log({ errors });

    errors ? this.setError(parentId, errors as any) : this.onSuccess(parentId);
    return !errors;
  };
  private getError = (id: keyof T, value: string) => {
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

  private privateEffectiveSetValue = (id: any, value: string) => {
    (this as any)[`set${id}`]?.(value);
    this.setToValues(id, value);
  };
  private onSuccess = (id: any) => {
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

  private removeError = (id: any) => {
    if (this.errors[id]) {
      delete this.errors[id];
      this.onErrorChanged(this.errors);
    }
    // this.checkSubmitButton();
  };
  private addError = (id: any, error: string) => {
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
  static ExtractId = (taker: any, key: string) => {
    if (taker[key]) {
      taker[`${key}Id`] = taker[key].id;
      delete taker[key];
    }
  };
  static PropFromParentToChild = (giver: any, taker: string | any) => {
    if (!giver[taker]) giver[taker] = {};
    if (typeof taker === "string") taker = giver[taker];
    Object.entries(taker).map(([key, value]: any) => {
      if (giver[key] !== undefined) {
        taker[key] = giver[key];
        delete giver[key];
      }
    });
  };
  static Format = (values: any) => {
    const formatedPayment = {} as any;
    console.log({ values });

    Object.entries(values).map(([key, value]: any) => {
      console.log({ key: value.key });

      if (value.value) formatedPayment[value.key ?? key] = value.value;
      else formatedPayment[key] = value;
    });
    return formatedPayment;
  };
}
function defaultUpload(formData: any) {
  Toast.warn({ title: "upload not implemented." });
  PopupMe(JsonBuilder, {
    componentProps: { json: formData },
  });
}

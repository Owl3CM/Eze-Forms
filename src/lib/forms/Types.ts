export type { IFormService } from "./FormService";
export interface IFormChange {
  id: string;
  value: string;
  effect?: boolean;
}
export interface SubscribeProps {
  id: string;
  setValue: (value: string) => void;
  setError: (error: string) => void;
  onSuccess?: () => void;
}

export interface IFormProps<T> {
  defaultValues: T;
  validationSchema: any;
  load?: () => Promise<T>;
  reload?: () => Promise<T>;
  onSubmit?: (formData: T) => void;
  valdiateOnLoad?: boolean;
  mode?: "onBlur" | "onChange" | "onSubmit";
}

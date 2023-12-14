export type { IFormService } from "./FormService";
export interface IFormChange {
  id: string;
  value: string;
  // silent?: boolean;
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
  // onDataChanged?: (data: T) => void;
  onDataChanged?: (isChanged: boolean) => void;
  onErrorChanged?: (errors: { [key: string]: string }) => void;
  mode?: "onBlur" | "onChange" | "onSubmit";
}

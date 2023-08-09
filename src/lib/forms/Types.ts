export type { IFormService } from "./FormService";
export interface IFormChange {
  id: string;
  value: string;
  effect?: boolean;
}
export interface SubscribeProps {
  id: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  setValue: (value: string) => void;
}

export interface IFormProps<T> {
  defaultValues: T;
  validationSchema: any;
  load?: () => Promise<T>;
  reload?: () => Promise<T>;
  upload?: (formData: T) => void;
  valdiateOnLoad?: boolean;
}

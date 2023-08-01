export type { IFormService } from "./FormService";
import { IFormService } from "./FormService";

export interface InputFormProps {
  service: IFormService;
  id: string;
  onChange?: (props: IFormChange) => void;
  children?: any;
  valdiateOn?: "onChange" | "onBlur" | "onFocus";
}

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

export interface IKitProps<T = any> {
  id?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  value?: T;
  onChange?: (props: IChange) => void;
  type?: string;
}

export interface IChange {
  id?: string;
  clear: (effect?: boolean) => void;
  value: any;
  title?: string;
  setValue?: (value: string) => void;
}

import { PopupPlacement } from "morabaa-provider/dist/lib/types";
import { IFormChange } from "../forms";

export type FormServiceType = {
  subscribe: (props: { id: string; onError: (error: string) => void; onSuccess: () => void; setValue: (value: string) => void }) => void;
  get: (id: string) => string;
  set: ({ id, value }: IFormChange) => void;
} | null;

export interface IKitProps<T = any> {
  id?: string;
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
  value?: T;
  onChange?: (props: IChange | IFormChange) => void;
  type?: string;
}

export interface IChange {
  id?: string;
  clear: (effect?: boolean) => void;
  value: any;
  title?: string;
  setValue?: (value: string) => void;
}

export interface IInputProps extends IKitProps {
  // service?: FormServiceType;
  id: string;
  children?: any;
  // valdiateOn?: "onChange" | "onBlur" | "none";
  [key: string]: any;
}

export interface IOptionsProps<T = any> extends IKitProps {
  value?: T;
  options?: IOption[];
  getOptions?: () => Promise<IOption[]>;
  activeClassName?: string;
  placement?: PopupPlacement;
  builder?: React.FC<IOptionBuilder>;
  listBuilder?: React.FC<IOptionBuilder>;
  optionsVisible?: boolean;
  listClassName?: string;
  offset?: { x: number; y: number };
  containerClassName?: string;
  service?: FormServiceType;
  stateName?: string;
  title?: string;
}

export interface IOption {
  title?: string;
  value?: any;
  className?: string;
  displayTitle?: string;
  to?: string;
}

export interface IOptionBuilder {
  prop: { options: IOption[]; selected: number };
  selected: IOption;
  onOptionChanged: (option: IOption, i: number) => void;
  activeClassName?: string;
  style?: any;
  containerClassName?: string;
  ref?: any;
}

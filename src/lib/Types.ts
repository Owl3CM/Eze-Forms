import { PopupPlacement } from "morabaa-provider/dist/lib/types";
import React from "react";
import { IFormChange } from "./forms/Types";

interface IChange {
  id: string;
  clear: (effect?: boolean) => void;
  value: any;
  title?: string;
  setValue?: (value: string) => void;
}
export interface IKitProps<T = any> {
  id: string;
  className?: string;
  title?: string;
  style?: any;
  value?: T;
  onChange?: (props: IChange) => void;
  onInit?: (props: IChange) => void;
}

export interface IClearIconProps {
  value: string;
  clear: (effect?: boolean) => void;
}

export interface IInputProps extends IKitProps {
  //extends React.InputHTMLAttributes<HTMLInputElement> {
  dely?: number;
  placeholder?: string;
  service?: null | {
    subscribe: (props: { id: string; onError: (error: string) => void; onSuccess: () => void; setValue: (value: string) => void }) => void;
    get: (id: string) => string;
    set: ({ id, value }: IFormChange) => void;
  };
  valdiateOn?: "onChange" | "onBlur" | "none";
  type?: string;
  [key: string]: any;
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
  service?: {
    subscribe: (props: { id: string; onError: (error: string) => void; onSuccess: () => void; setValue: (value: string) => void }) => void;
    get: (id: string) => string;
    set: ({ id, value }: any) => void;
  } | null;
  stateName?: string;
}

export interface IPopupSelectorProps extends IOptionsProps {
  icon?: any;
  button?: any;
}

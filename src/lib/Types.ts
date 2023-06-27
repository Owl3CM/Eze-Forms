import { PopupPlacement } from "morabaa-provider/dist/lib/types";
import React from "react";

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
  onChange?: (props: IChange) => void;
  style?: any;
  value?: T;
  onInit?: (props: IChange) => void;
}

export interface IClearIconProps {
  value: string;
  clear: (effect?: boolean) => void;
}

export interface IInputProps {
  //extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  dely?: number;
  clearIcon?: React.FC<IClearIconProps> | null;
  placeholder?: string;
  className?: string;
  title?: string;
  style?: any;
  value?: any;
  containerClassName?: string;
  onFocus?: (props: IChange) => void;
  onChange?: (props: IChange) => void;
  onInit?: (props: IChange) => void;
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
}

export interface IPopupSelectorProps extends IOptionsProps {
  icon?: any;
  button?: any;
}

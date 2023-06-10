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
  storageKey?: string;
  title?: string;
  // showInClearBar?: boolean;
  onChange?: (props: IChange) => void;
  storage?: any;
  children?: any;
  style?: any;
  containerClassName?: string;
  value?: T;
  onInit?: (props: IChange) => void;
}

export interface IClearIconProps {
  value: string;
  clear: (effect?: boolean) => void;
}

export interface ISearchInputProps extends IKitProps {
  id: string;
  dely?: number;
  startIcon?: any;
  endIcon?: any;
  clearIcon?: React.FC<IClearIconProps>;
  placeholder?: string;
  onFocus?: (props: IChange) => void;
}

export interface IOption {
  id: string | number;
  title?: string;
  value?: any;
  className?: string;
  displayTitle?: string;
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
  getData?: () => Promise<IOption[]>;
  activeClassName?: string;
  placement?: PopupPlacement;
  builder?: React.FC<IOptionBuilder>;
  listBuilder?: React.FC<IOptionBuilder>;
  optionsVisible?: boolean;
}

export interface IPopupSelectorProps extends IOptionsProps {
  icon?: any;
  button?: any;
}

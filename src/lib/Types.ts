import { Animation, PopupPlacement } from "morabaa-provider";
import React from "react";

interface IChange {
  id: string;
  clear: (effect?: boolean) => void;
  value: any;
  label?: string;
  setValue?: (value: string) => void;
}
export interface IKitProps<T = any> {
  id?: string;
  style?: any;
  value?: T;
  onChange?: (props: IChange) => void;
}

export interface IClearIconProps {
  value: string;
  clear: (effect?: boolean) => void;
}

export interface IInputProps extends IKitProps {
  //extends React.InputHTMLAttributes<HTMLInputElement> {
  dely?: number;
  clearIcon?: React.FC<IClearIconProps> | null;
  placeholder?: string;
  containerClass?: string;
  onFocus?: (props: IChange) => void;
  [key: string]: any;
}

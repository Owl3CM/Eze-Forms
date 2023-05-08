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
  showInClearBar?: boolean;
  onChange?: (props: IChange) => void;
  storage?: any;
  children?: any;
  style?: any;
  containerClass?: string;
  value?: T;
  onInit?: (props: IChange) => void;
}

export interface ISearchInputProps extends IKitProps {
  id: string;
  dely?: number;
  icon?: any;
  placeholder?: string;
  onFocus?: (props: IChange) => void;
}

export interface IOption {
  id: string;
  title: string;
  value: any;
  className?: string;
}

export interface IOptionBuilder {
  prop: { options: IOption[]; selected: number };
  selected: IOption;
  _onOptionChanged: (option: IOption, i: number) => void;
  className?: string;
  activClass?: string;
  style?: any;
}
export interface IOptionsProps<T = any> extends IKitProps {
  value?: T;
  options?: any[];
  getData?: () => any;
  activClass?: string;
}

export interface IPopupSelectorProps extends IOptionsProps {
  icon?: any;
  button?: any;
}

interface IChange {
  clear: (effect?: boolean) => void;
  value: string;
  title: string;
  id: string;
  setValue?: (value: string) => void;
}
export interface ISearchInputProps {
  id: string;
  onChange: (props: IChange) => void;
  placeholder: string;
  value: string;
  storageKey: string;
  containerClass: string;
  icon: any;
  className: string;
  dely: number;
  onFocus: (props: IChange) => void;
  style: any;
  onInit: (props: IChange) => void;
  storage: any;
  children: any;
}

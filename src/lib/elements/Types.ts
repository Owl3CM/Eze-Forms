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

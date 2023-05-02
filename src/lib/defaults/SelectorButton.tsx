import React from "react";

interface IButton {
  title: string;
  children?: any;
  // id?: string;
  onClick?: any;
  className?: string;
  active?: boolean;
  options?: any[];
  Icon?: any;
  style?: any;
}

const SelectorButton = ({
  title,
  children,
  // id,
  onClick,
  className,
  active,
  options,
  Icon,
  style,
}: IButton) => {
  return (
    <div
      onClick={onClick}
      // id={id}
      className={"selector-button " + className}
      style={style}>
      <p className="cut-words" style={{ width: 100 }}>
        {title}
      </p>
      <Icon options={options} active={active} />
      {children}
    </div>
  );
};

export default SelectorButton;

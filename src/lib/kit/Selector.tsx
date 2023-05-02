import React from "react";
import { IOptionBuilder, IPopupSelectorProps } from "../Types";
import OptionsBuilder from "./OptionsBuilder";
import { SelectorButton, DefaultIcon } from "../defaults";

const Selector = (props: IPopupSelectorProps) => {
  return <OptionsBuilder {...props} builder={Children} />;
};

export default React.memo(Selector);

interface ChildrenProps extends IOptionBuilder {
  button: any;
  icon: any;
}
const Children: React.FC<ChildrenProps> = ({
  prop,
  selected,
  _onOptionChanged,
  className,
  style,
  activClass,
  button: Button = SelectorButton,
  icon: Icon = DefaultIcon,
}: ChildrenProps) => {
  const [popup, setPopup] = React.useState(false);

  return prop.options.length ? (
    <Button
      onClick={() => {
        prop.options?.length > 1 && setPopup(!popup);
      }}
      // id={id}
      style={style}
      className={`${selected.className || className}`}
      Icon={Icon}
      options={prop.options}
      active={popup}
      // title={selected.displayTitle || selected.title}
      title={selected.title}>
      {popup && (
        <div className="selector-child scroller">
          {prop.options.map((option, i) => {
            const _optionClass = option.className || activClass;
            const _notSelected = option.id !== selected.id;
            return (
              <p
                onMouseEnter={({ currentTarget }) => {
                  if (_notSelected && _optionClass) currentTarget.classList.add(_optionClass);
                }}
                onMouseLeave={({ currentTarget }) => {
                  if (_notSelected && _optionClass) currentTarget.classList.remove(_optionClass);
                }}
                key={option.id}
                onClick={() => {
                  _notSelected && _onOptionChanged(option, i);
                }}
                className={`selector-option ${_notSelected ? "" : _optionClass}`}>
                {option.title}
              </p>
            );
          })}
        </div>
      )}
    </Button>
  ) : null;
};

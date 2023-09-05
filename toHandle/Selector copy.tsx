import React from "react";
import { IOptionBuilder, IPopupSelectorProps } from "../Types";
import OptionsBuilder from "./OptionsBuilder";
import { SelectorButton, DefaultIcon } from "../defaults";
import { PopupMe } from "morabaa-provider";

const Selector = (props: IPopupSelectorProps) => {
  return <OptionsBuilder {...props} builder={Builder} />;
};

export default React.memo(Selector);

interface ChildrenProps extends IOptionBuilder {
  button: any;
  icon: any;
}
const Builder: React.FC<ChildrenProps> = ({
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
      onClick={({ currentTarget }: any) => {
        //  setPopup(!popup);
        if (prop.options?.length < 2) return;
        PopupMe(ListBuilder, {
          id: "selector",
          componentProps: { prop, selected, _onOptionChanged, activClass },
          target: currentTarget,
          placement: "auto",
          offset: {
            x: 0,
            y: 10,
          },
        });
      }}
      // id={id}
      style={style}
      className={`${selected.className || className}`}
      Icon={Icon}
      options={prop.options}
      active={popup}
      // title={selected.displayTitle || selected.title}
      title={selected.title}></Button>
  ) : null;
};

interface ListBuilderProps extends IOptionBuilder {
  activClass: string;
}

const ListBuilder = ({ prop, selected, _onOptionChanged, activClass }: ListBuilderProps) => {
  return (
    <div
      className="gap-l col"
      style={{
        minWidth: 150,
      }}>
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
  );
};

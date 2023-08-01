import React from "react";
import { GetFormField } from "../builder";

interface IGroup {
  prop: {
    children: any[];
    className?: string;
    onChange?: any;
  };
}

const Group = ({ prop }: IGroup) => {
  const final = React.useMemo(() => {
    let _final: any[] = [];
    let _bodies: any[] = [];
    prop.children?.map((child) => {
      child.onChange = prop.onChange;
      if (child.children && !child.type) child.type = "group";
      _bodies.push(GetFormField(child));
    });
    _final.push({
      className: prop.className || "form-section",
      bodies: _bodies,
    });
    return _final;
  }, []);

  return (
    <>
      {final.map((group) => (
        <div key={group.bodies[0].key} className={group.className}>
          {group.bodies}
        </div>
      ))}
    </>
  );
};

export default Group;

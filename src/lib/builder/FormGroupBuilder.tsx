import React from "react";
import { GetFormField } from ".";

interface IFormGroupBuilder {
  prop: any;
}

const FormGroupBuilder = ({ prop }: IFormGroupBuilder) =>
  React.useMemo(() => {
    let _final: any[] = [];
    prop.children?.map((group: { children: any[]; className: string }) => {
      let _bodies: any[] = [];
      group.children.map((child) => {
        child.onChange = (updated: any) => {
          child = { ...child, ...updated };
          prop.onChange(child);
        };
        if (child.children && !child.type) child.type = "group";
        let __child = GetFormField(child);
        __child && _bodies.push(__child);
      });
      _final.push({
        className: group.className || "form-section",
        bodies: _bodies,
      });
    });
    return (
      <>
        {_final.map((group, i) => (
          <div key={i} className={group.className}>
            {group.bodies}
          </div>
        ))}
      </>
    );
  }, []);

export default FormGroupBuilder;

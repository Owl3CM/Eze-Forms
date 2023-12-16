import React from "react";
import FormGroupBuilder from "./FormGroupBuilder";
import FormSecripts from "./FormSecripts";
import { Logger } from "morabaa-utils";

interface IFormBuilder {
  service?: any;
  fields: any;
  onChange?: any;
  init?: any;
  className?: string;
}

const FormBuilder = ({
  service,
  fields,
  onChange = service?.updateQueryParams || _defaultOnChange,
  init = service?.setQueryParmas,
  className = "form-container",
}: IFormBuilder) =>
  React.useMemo(() => {
    console.log({ service });

    if (init) init(FormSecripts.extractValues(fields));

    return (
      <div className={className}>
        <FormGroupBuilder prop={{ children: fields, onChange }} />
        {/* <FormCleaner service={service} /> */}
      </div>
    );
  }, []);

export default FormBuilder;

const _defaultOnChange = (child: any) => {
  Logger({
    log: child,
    // json: child,
    // jsonLog: child,
    // type: "info",
  });
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'success'
  // })
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'warn'
  // })
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'error'
  // })
};

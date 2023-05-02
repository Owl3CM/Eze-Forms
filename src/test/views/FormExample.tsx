import React from "react";
import { FieldsSample, FormBuilder, FormSecripts } from "../../lib";

const FormExample = () => {
  const service = {
    queryParmas: FormSecripts.extractValues(FieldsSample),
  };

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller">
      <h1>Form</h1>
      <FormBuilder
        fields={FieldsSample}
        onChange={(prop) => {
          console.log({ prop });
        }}
      />
    </div>
  );
};

export default FormExample;

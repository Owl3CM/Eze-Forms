import React from "react";
import { FormService } from "../../lib";

const FormExample = () => {
  const service = React.useMemo(() => {}, []);

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
      <h1>Form</h1>
    </div>
  );
};

export default FormExample;

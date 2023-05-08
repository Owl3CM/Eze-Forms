import React from "react";
import { FieldsSample, FormBuilder, FormSecripts, PopupSelector, Selector } from "../../lib";
import Button from "../components/Button";

const FormExample = () => {
  const service = {
    queryParmas: FormSecripts.extractValues(FieldsSample),
  };

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
      <h1>Form</h1>
      <FormBuilder
        fields={FieldsSample}
        onChange={(prop: any) => {
          console.log({ prop });
        }}
      />
      <PopupSelector
        id="age"
        title="Age"
        value={1}
        storageKey="q-age"
        getData={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return [
            { id: 1, title: "دينار" },
            { id: 2, title: "دولار" },
            { id: 3, title: "يورو" },
          ];
        }}
        button={Button}
      />
      <Selector
        id="currencyId-getData"
        getData={async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return [
            { id: 1, title: "دينار" },
            { id: 2, title: "دولار" },
            { id: 3, title: "يورو" },
          ];
        }}
        onChange={(prop: any) => {
          console.log({ prop });
        }}
      />
    </div>
  );
};

export default FormExample;

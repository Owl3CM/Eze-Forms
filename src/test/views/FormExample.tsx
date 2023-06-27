import React from "react";
import { FieldsSample, FormBuilder, FormSecripts, FormTextInput, Selector } from "../../lib";
import Button from "../components/Button";
import { CustomEvents, Logger } from "morabaa-utils";

const FormExample = () => {
  const service = React.useMemo(() => {
    const _service = {
      queryParmas: FormSecripts.extractValues(FieldsSample),
    };
    return _service;
  }, []);

  console.log({ service });

  const optionsCurrencies = [{ id: -1, title: "بدون" }];

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
      <h1>Form</h1>
      <FormTextInput
        dely={700}
        id="search-input"
        placeholder="Search"
        onChange={(prop) => {
          Logger({ log: prop, clear: false });
        }}
      />

      <Selector
        id="currencyId"
        title="Currency"
        getOptions={getOptions}
        placement="list"
        options={optionsCurrencies}
        onInit={(prop) => {
          console.log(prop);
        }}
        onChange={(prop) => {
          console.log(prop);
        }}
        value={1}
        // builder={builder}
        // listBuilder={listBuilder}
        // activeClassName="bg-cyan"
      />
      {/* <AmFrom /> */}
    </div>
  );
};

export default FormExample;

const getOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // return mockOptions();
  return true
    ? [
        { value: -1, title: "بدون", displayTitle: "العملة" },
        { value: 1, title: "دينار" },
        { value: 2, title: "دولار" },
        { value: 2, title: "دولار" },
      ]
    : [
        { value: -1, title: "بدون", className: "bg-cyan", displayTitle: "العملة" },
        { value: 1, title: "دينار", className: "bg-red" },
        { value: 2, title: "دولار", className: "bg-green" },
        { value: 2, title: "دولار" },
      ];
};

const builder = ({ selected, prop, activeClassName }) => {
  return (
    <div className={" px-l py-s round-s row-center"}>
      <p className=" button">{"العملة"}</p>
      <p className="text-bold">{selected.title}</p>
    </div>
  );
};

const listBuilder = ({ selected, onOptionChanged, prop, activeClassName }) => {
  return (
    <div className="col gap-s">
      {prop.options.map((option, i) => {
        return (
          <div className="bg-cyan text-black round-l p-l" key={option.id} onClick={() => onOptionChanged(option, i)}>
            {option.title}
          </div>
        );
      })}
    </div>
  );
};

const mockOptions = () => {
  return Array.from({ length: 100 }).map((_, i) => {
    return { id: i, title: `option ${i}`, value: i };
  });
};

const AmFrom = () => {
  return (
    <div className="col gap-l">
      <div>
        <Selector
          id="currencyId"
          value={-1}
          // activeClassName="bg-green"
          title="Currency"
          // options={[{ id: -1, title: "الغاء", className: "bg-green", value: -1, displayTitle: "العملة" }]}
          getOptions={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            // return mockOptions();
            return [
              { id: -1, title: "بدون", className: "bg-prim", value: -1, displayTitle: "العملة" },
              { id: 1, title: "دينار", className: "bg-red", value: 1 },
              { id: 2, title: "دولار", className: "bg-green", value: 2 },
              { id: 3, title: "يورو", className: "bg-cyan", value: 3 },
            ];
          }}
          placement="center"
          builder={({ selected, prop, activeClassName: className }) => {
            return (
              <div className={" px-l py-s round-s"}>
                <p>{selected.title}</p>
              </div>
            );
          }}
          onChange={(prop) => {
            console.log("option changed", prop.value, prop.title);
          }}
          optionsVisible
          // options={[
          //   { id: -1, title: "بدون", className: "bg-prim", value: -1, displayTitle: "العملة" },
          //   { id: 1, title: "دينار", className: "bg-red", value: 1 },
          // ]}
        />
      </div>
      {/* <div className="row-center">
        <FormTextInput
          dely={700}
          id="search-input"
          placeholder="Search"
          onChange={(prop) => {
            Logger({ log: prop, clear: false });
          }}
        />
        <p
          onClick={() => {
            CustomEvents.setToInput("search-input", "TEST");
          }}>
          change input to TEST
        </p>
      </div> */}
    </div>
  );
};

// return (
//   <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
//     <h1>Form</h1>

//     <FormBuilder
//       fields={FieldsSample}
//       onChange={(prop: any) => {
//         console.log({ prop });
//       }}
//     />
//     <PopupSelector
//       id="age"
//       title="Age"
//       value={1}
//       storageKey="q-age"
//       getData={async () => {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return [
//           { id: 1, title: "دينار" },
//           { id: 2, title: "دولار" },
//           { id: 3, title: "يورو" },
//         ];
//       }}
//       button={Button}
//     />
//     <Selector
//       id="currencyId-getData"
//       getData={async () => {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return [
//           { id: 1, title: "دينار" },
//           { id: 2, title: "دولار" },
//           { id: 3, title: "يورو" },
//         ];
//       }}
//       onChange={(prop: any) => {
//         console.log({ prop });
//       }}
//     />
//   </div>
// );

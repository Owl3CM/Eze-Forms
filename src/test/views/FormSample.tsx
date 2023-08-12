import React from "react";
import * as yup from "yup";
import { Controller, Form, FormService } from "../../lib/forms";
import "../../lib/elements/elements.css";
import { Input, Selector } from "../../lib/elements";
import { JsonBuilder } from "morabaa-utils";

const optionsCurrencies = [
  //
  // { id: -1, title: "بدون" },
  { value: "", title: "بدون", displayTitle: "العملة" },
  { value: 11111111111, title: "دينار" },
  { value: 2, title: "دولار" },
  { value: 3, title: "دولار" },
];

const test = [1];

const getOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    //
    { value: "", title: "بدون", displayTitle: "العملة" },
    { value: 11111111111, title: "دينار" },
    { value: 2, title: "دولار" },
    { value: 3, title: "دولار" },
  ];
};
const FormSample = () => {
  const formService = React.useMemo(() => new FormService<any>({ defaultValues, validationSchema }), []);

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
      <Form onSubmit={formService.onSubmit}>
        <Controller
          id="name"
          formService={formService}
          Component={({ value, error, setValue, setError }) => {
            return (
              <div data-input-error={error}>
                <input type="text" value={value} onChange={({ target: { value } }) => setValue(value)} />
                {/* <p className="text-red">{error}</p> */}
              </div>
            );
          }}
        />
        <Controller
          id="phoneNumber"
          formService={formService}
          Component={({ value, error, setValue, setError }) => {
            return (
              <div data-input-error={error}>
                <input type="text" value={value} onChange={({ target: { value } }) => setValue(value)} />
                {/* <p className="text-red">{error}</p> */}
              </div>
            );
          }}
        />
      </Form>
    </div>
  );

  return (
    <div id="json-example" className="col gap-l p-l h-screen overflow-auto scroller items-start">
      <Form onSubmit={formService.onSubmit}>
        {/* <TestForm service={formService} id="name" /> */}
        {/* <Input service={formService} id="name" className="bg-prim" /> */}
        {/* <IconInput service={formService} id="name" className="bg-prim" icon="accounts" /> */}
        {/* <IconCard variant="card-m" icon="conclusion" iconClass="svg-active p-s svg-border-shark" label="NameOfAgent">
                    <MyInpuForm service={formService} id="name" />
        </IconCard> */}
        <InputController id="name" service={formService} />
        <InputController id="phoneNumber" service={formService} />
        {/* <div>
          <Input service={formService} id="name" className="" />
        </div> */}
        {/* <Input service={formService} id="openingbalance" /> */}
        {/* <Input service={formService} id="phoneNumber" /> */}
        {/* <Input service={formService} id="address" />
        <Selector
          service={formService}
          id="address"
          title="Currency"
          getOptions={getOptions}
          placement="list"
          // options={optionsCurrencies}
          stateName="currencyId"
        /> */}
        {/* <InputSelector
          options={[
            { title: "IQD", value: 1 },
            { title: "USD", value: 2 },
          ]}
          service={formService}
          id="currency"
          title="TheCurrency"
          variant="input-selector"
        /> */}
        <div
          onClick={() => {
            formService.reset(JSON.parse(JSON.stringify(defaultValues)));
          }}>
          rest
        </div>
      </Form>
    </div>
  );
};

export default FormSample;

const InputController = ({ service, id }: any) => {
  return (
    <Controller
      id={id}
      formService={service}
      Component={({ value, setValue, error }) => {
        return (
          <div>
            <input type="text" value={value} onChange={({ target: { value } }) => setValue(value)} />
            <p className="text-red">{error}</p>
          </div>
        );
      }}
    />
  );
};

interface IAccountForm {
  name: string;
  address: string;
  phoneNumber: string;
  openingbalance: number;
  currency: number;
}

const defaultValues = {
  //
  name: "test",
  address: "d",
  phoneNumber: "",
  openingbalance: 0,
  currency: 0,
};

const validationSchema = yup.object().shape({
  name: yup.string().required("الرجاء ادخال الاسم").min(4, "الاسم على الاقل اربع احرف"),
  address: yup.string().required("العنوان مطلوب"),
  phoneNumber: yup
    .string()
    .trim()
    .required("phoneNumberRequired")
    .matches(/^\d{11}$/, "PhoneNumberMustBeValid"),
  // openingbalance: yup
  //   .number()
  //   .transform((v) => (isNaN(v) ? 0 : v))
  //   .default(0)
  //   .optional()
  //   .nullable(),
  // currency: yup.number().oneOf([0, 1]).default(0),
});

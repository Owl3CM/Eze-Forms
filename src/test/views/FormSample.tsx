import React from "react";
import FormService from "../../lib/forms/FormService";
import Form from "../../lib/forms/Form";
import * as yup from "yup";
import { Input, Selector } from "../../lib/elements";
// import InputSelector from "../elements/InputSelector";

const optionsCurrencies = [
  //
  // { id: -1, title: "بدون" },
  { value: "", title: "بدون", displayTitle: "العملة" },
  { value: 11111111111, title: "دينار" },
  { value: 2, title: "دولار" },
  { value: 3, title: "دولار" },
];

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
  const formService = React.useMemo(
    () =>
      new FormService<IAccountForm>({
        defaultValues,
        validationSchema,
        load: () => {
          return new Promise((resolve) =>
            setTimeout(() => {
              resolve(defaultValues);
            }, 3000)
          );
        },
      }),
    []
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
        <div>
          <Input service={formService} id="name" className="" />
        </div>
        {/* <Input service={formService} id="openingbalance" /> */}
        {/* <Input service={formService} id="phoneNumber" /> */}
        <Input service={formService} id="address" />
        <Selector
          service={formService}
          id="address"
          title="Currency"
          getOptions={getOptions}
          placement="list"
          // options={optionsCurrencies}
          stateName="currencyId"
        />
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
            formService.setFormData(JSON.parse(JSON.stringify(defaultValues)));
          }}>
          rest
        </div>
      </Form>
    </div>
  );
};

export default FormSample;

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

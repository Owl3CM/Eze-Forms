import React from "react";
import FormService from "./FormService";
import { IconCard, IconInput, IconsInput, InputSelector, PopupSelector, Wrapper } from "@/components";
import Form from "./Form";
import * as yup from "yup";
import { Lang } from "@/Lang";
import TestForm from "./TestForm";

const FormSample = () => {
    const formService = React.useMemo(() => new FormService<IAccountForm>({ defaultValues, validationSchema }), []);
    return (
        <Wrapper service={formService}>
            <Form onSubmit={formService.onSubmit}>
                {/* <TestForm service={formService} id="name" /> */}
                {/* <Input service={formService} id="name" className="bg-prim" /> */}
                {/* <IconInput service={formService} id="name" className="bg-prim" icon="accounts" /> */}
                {/* <IconCard variant="card-m" icon="conclusion" iconClass="svg-active p-s svg-border-shark" label="NameOfAgent">
                    <MyInpuForm service={formService} id="name" />
                </IconCard> */}
                <IconCard icon="conclusion" label="NameOfAgent">
                    <IconInput service={formService} icon="name" id="name" />
                </IconCard>
                <IconCard icon="accounts" label="ExtraInformation">
                    <IconInput service={formService} icon="phone-number" id="phoneNumber" title="PhoneNumber" />
                    <IconInput service={formService} icon="address" id="address" title="Address" />
                </IconCard>
                <IconCard icon="accounts" label="OpeningBalance">
                    <InputSelector
                        options={[
                            { title: "IQD", value: 1 },
                            { title: "USD", value: 2 },
                        ]}
                        service={formService}
                        id="currency"
                        title="TheCurrency"
                        variant="input-selector"
                    />
                    {/* <div className="row-center justify-between">
                        <IconInput service={formService} icon="accounts" id="openingbalance" title="TheAmount" />
                        <PopupSelector
                            options={[
                                { title: "IQD", value: 1 },
                                { title: "USD", value: 2 },
                            ]}
                            service={formService}
                            id="currency"
                            title="TheCurrency"
                            variant="selector-btn-with-input"
                        />
                    </div> */}
                </IconCard>
                <div
                    onClick={() => {
                        formService.setFormData(JSON.parse(JSON.stringify(defaultValues)));
                    }}>
                    rest
                </div>
            </Form>
        </Wrapper>
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
    phoneNumber: "",
    address: "d",
    openingbalance: 0,
    currency: 0,
};

const validationSchema = yup.object().shape({
    name: yup.string().required("الرجاء ادخال الاسم").min(4, "الاسم على الاقل اربع احرف"),
    address: yup.string().required("العنوان مطلوب"),
    phoneNumber: yup
        .string()
        .trim()
        .required(Lang.phoneNumberRequired)
        .matches(/^\d{11}$/, Lang.PhoneNumberMustBeValid),
    openingbalance: yup
        .number()
        .transform((v) => (isNaN(v) ? 0 : v))
        .default(0)
        .optional()
        .nullable(),
    currency: yup.number().oneOf([0, 1]).default(0),
});

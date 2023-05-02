import React from "react";
import * as FormKit from "../kit";
import "./form.css";

export { default as FormBuilder } from "./FormBuilder";
export { default as FormCleaner } from "./FormCleaner";
export { default as FormSecripts } from "./FormSecripts";

interface IGetFormField {
  type: keyof typeof FormKit.keys;
  id: string;
}

export const GetFormField = (child: IGetFormField) => {
  const Body = (FormKit as any)[FormKit.keys[child.type]];
  return Body ? <Body {...child} key={child.id} /> : null;
};

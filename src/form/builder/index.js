import './form.css'
export { default as FormBuilder } from './FormBuilder'
export { default as FormCleaner } from './FormCleaner'
export { default as FormSecripts } from './FormSecripts'

import * as FormKit from '../kit'

console.log({ FormKit })

export const GetFormField = (child) => {
  const Body = FormKit[FormKit.keys[child.type]]
  return Body ? <Body {...child} key={child.id} /> : null
}

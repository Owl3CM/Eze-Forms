import React from 'react'
import * as FormKit from '../kit'
import './form.css'

export { default as FormBuilder } from './FormBuilder'
export { default as FormCleaner } from './FormCleaner'
export { default as FormSecripts } from './FormSecripts'

export const GetFormField = (child) => {
  const Body = FormKit[FormKit.keys[child.type]]
  return Body ? <Body {...child} key={child.id} /> : null
}

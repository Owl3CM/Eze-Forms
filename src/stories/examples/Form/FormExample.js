import './form.css'
import React from 'react'
import { FieldsSample, FormBuilder, FormSecripts } from '../Lib'
import { Logger } from 'js-node-tools'

const FormExample = () => {
  const service = {
    queryParmas: FormSecripts.extractValues(FieldsSample)
  }
  Logger({
    json: service.queryParmas,
    jsonLog: service.queryParmas
  })

  return (
    <div
      id='json-example'
      className='col gap-lg p-lg h-screen overflow-auto scroller'
    >
      <h1>JsonExample</h1>
      <FormBuilder fields={FieldsSample} />
    </div>
  )
}

export default FormExample

const sample = {
  id: '943-34234kf-f32f-23f32f-c8',
  name: 'Jhon Doe',
  descriptionT:
    'somthing going on here ok then this is a description so that is not a good idea',
  amBoolean: true,
  objectColction: [
    { id: 'KKKK' },
    { name: 'Obdestest' },
    { description: 'obdes' }
  ],
  colction: ['one ', 'test', 'four', 'four', 'four', 'owls'],
  object: {
    id: 'K-sdf-KK-sdfK',
    name: 'Jhon Doe',
    description: 'this is a description',
    idK: 'K-sdf-KK-sdfK',
    nameK: 'Obdes test by Jhon Doe'
  }
}

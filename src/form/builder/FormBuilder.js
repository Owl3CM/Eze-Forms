import React from 'react'
import FormGroupBuilder from './FormGroupBuilder'
import FormSecripts from './FormSecripts'

const FormBuilder = ({
  service,
  fields,
  onChange = service?.updateQueryParams || _defaultOnChange,
  init = service?.initQueryParams,
  className = 'form-container'
}) =>
  React.useMemo(() => {
    if (init) init(FormSecripts.extractValues(fields))

    return (
      <div className={className}>
        {/* <FormGroupBuilder prop={{ children: fields, onChange }} /> */}
        {/* <FormCleaner service={service} /> */}
      </div>
    )
  }, [])

export default FormBuilder

const _defaultOnChange = (child) => {
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'info'
  // })
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'success'
  // })
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'warn'
  // })
  // Logger({
  //   json: child,
  //   jsonLog: child,
  //   type: 'error'
  // })
}

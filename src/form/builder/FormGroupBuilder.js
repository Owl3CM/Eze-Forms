import React from 'react'
import { GetFormField } from '.'

const FormGroupBuilder = ({ prop }) =>
  React.useMemo(() => {
    let _final = []
    prop.children?.map((group) => {
      console.log({ group })
      let _bodies = []
      group.children.map((child) => {
        child.onChange = (updated) => {
          child = { ...child, ...updated }
          prop.onChange(child)
        }
        if (child.children && !child.type) child.type = 'group'
        let __child = GetFormField(child)
        __child && _bodies.push(__child)
      })
      _final.push({
        className: group.className || 'form-section',
        bodies: _bodies
      })
    })
    console.log({ _final })
    return _final.map((group, i) => (
      <div key={i} className={group.className}>
        {group.bodies}
      </div>
    ))
  }, [])

export default FormGroupBuilder

import React, { Fragment } from 'react'

const FormCleaner = ({ service }) => {
  ;[service.queryParmas, service.setQueryParmas] = React.useState(
    service.queryParmas
  )
  return React.useMemo(() => {
    const toDelete =
      service.queryParmas &&
      Object.entries(service.queryParmas).filter(([_, value]) => value?.value)
    console.log({ toDelete })
    return toDelete && toDelete.length > 0 ? (
      <div className='form-cleaner'>
        {toDelete.map(([_, _queryProp]) => (
          <p
            key={_}
            onClick={() => {
              delete service.queryParmas[_]
              service.setQueryParmas({ ...service.queryParmas })
              _queryProp.clear && _queryProp.clear()
            }}
            className='button'
          >
            <span>{`X- ${_queryProp.title} : ${
              _queryProp.titleValue || _queryProp.value
            }`}</span>
          </p>
        ))}
      </div>
    ) : (
      <Fragment />
    )
  }, [service.queryParmas])
}

export default FormCleaner

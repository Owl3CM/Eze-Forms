import React from 'react'

const Boolean = ({
  className,
  queryKey,
  storageKey,
  value,
  title,
  showInClearBar,
  onChange
}) => {
  let _value = React.useMemo(() => value, [])

  return (
    <div className={`owl-toggle-button ${className}`} key={queryKey}>
      <p
        onClick={({ currentTarget }) => {
          _value = !_value
          currentTarget.classList.toggle('owl-toggled')
          if (storageKey) localStorage.setItem(storageKey, _value)

          let clear = showInClearBar
            ? () => {
                _value = !_value
                currentTarget.classList.toggle('owl-toggled')
              }
            : null
          onChange(_value, clear)
        }}
        className={`owl-toggled-bg ${_value ? 'owl-toggled' : ''}`}
      >
        <span />
      </p>
      <p className='font-bold owl-text-sm'>{title}</p>
    </div>
  )
}
export default React.memo(Boolean)

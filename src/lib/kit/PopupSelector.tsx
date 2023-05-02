import React from 'react'
import { DefaultButton } from './Selector'

const PopupSelector = ({
  id,
  onChange,
  options,
  title,
  className = '',
  value = '',
  storageKey = '',
  getData,
  init,
  style,
  icon: Icon = DefaultIcon,
  showTitle = true,
  button: Button = DefaultButton
}) => {
  const _value = React.useMemo(() => {
    let _stored = localStorage.getItem(storageKey)
    if (_stored) {
      try {
        return JSON.parse(_stored)
      } catch (e) {
        return _stored
      }
    }
    return value
  }, [])

  const [popup, setPopup] = React.useState(false)
  const [prop, setProp] = React.useState(
    options
      ? {
          options,
          selected: options.findIndex((option) => option.id == _value)
        }
      : { options: [], selected: 0 }
  )

  const selected = React.useMemo(
    () => prop.options[prop.selected] || { title },
    [prop]
  )

  React.useMemo(() => {
    const initData = {
      clear: () => _onOptionChanged(prop.options[0] || { id: 0 }),
      title: selected.title,
      value: selected?.id,
      id
    }
    if (getData) {
      setTimeout(async () => {
        let _options = await getData()
        let selected =
          !options && !_value
            ? 0
            : _options.findIndex((option) => option.id == _value)
        if (selected === 0 && _options.length > 0) onChange(_options[0].id)
        setProp({ options: _options, selected })
        init && init(initData)
      }, 0)
    } else init && init(initData)
  }, [])

  const _onOptionChanged = (option = prop.options[0], i = 0) => {
    if (storageKey) localStorage.setItem(storageKey, option.id)
    onChange({
      value: option.id,
      title: option.title,
      id,
      clear: () => _onOptionChanged()
    })
    setProp((_prev) => ({ ..._prev, selected: i }))
  }

  return prop.options.length > 0 ? (
    <Button
      onClick={() => {
        prop.options?.length > 1 && setPopup(!popup)
      }}
      id={id}
      style={style}
      className={`${selected.className || className}`}
      Icon={Icon}
      options={prop.options}
      active={popup}
      title={selected.displayTitle || selected.title}
    >
      {popup && (
        <div className='popup-selector-container'>
          <div className='popup-selector-child scroller'>
            {prop.options.map((option, i) => {
              const _optionClass = option.className || 'selected-option'
              const _notSelected = option.id !== selected.id
              return (
                <p
                  onMouseEnter={({ currentTarget }) => {
                    if (_notSelected) currentTarget.classList.add(_optionClass)
                  }}
                  onMouseLeave={({ currentTarget }) => {
                    if (_notSelected)
                      currentTarget.classList.remove(_optionClass)
                  }}
                  key={option.id}
                  onClick={() => {
                    _notSelected && _onOptionChanged(option, i)
                  }}
                  className={`selector-option ${
                    _notSelected ? '' : _optionClass || 'selected-option'
                  }`}
                >
                  {option.title}
                </p>
              )
            })}
          </div>
        </div>
      )}
    </Button>
  ) : (
    <></>
  )
}
export default React.memo(PopupSelector)

const DefaultIcon = ({ options, active }) => (
  <svg
    height={12}
    style={{
      marginRight: 'auto',
      opacity: options?.length > 1 ? 1 : 0.4,
      rotate: active ? '180deg' : '0deg'
    }}
    className='popup-selector-button-svg'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 264.55 377.7'
  >
    <path
      d='M501,311c7,1.28,12.13,5.47,17,10.42q53.38,53.68,107,107.1c6.07,6.05,8.78,12.87,6.06,21.23a18.8,18.8,0,0,1-28.52,9.66,43.23,43.23,0,0,1-6-5.27q-46.15-46.08-92.23-92.23c-1.29-1.29-2.34-2.82-3.85-4.67-1.85,1.74-3.17,2.91-4.41,4.15q-47,47-94,94c-5.1,5.11-10.84,8.32-18.26,7.12a18.86,18.86,0,0,1-11.66-31c3.74-4.45,8.09-8.39,12.21-12.51,33.45-33.46,66.81-67,100.5-100.21,3.68-3.61,9.3-5.25,14-7.81Z'
      transform='translate(-367.68 -311)'
    />
    <path
      d='M499.36,643.31c9.21-9.26,17.17-17.31,25.18-25.32q37.1-37.14,74.23-74.21c11.36-11.3,29-7,32.8,7.89,2,7.65-.64,14-6.13,19.45Q603.65,592.8,582,614.59q-33,33-66.09,66.08c-10.72,10.7-21,10.71-31.68,0q-54.62-54.59-109.25-109.18c-6.05-6-8.86-12.85-6.19-21.21a18.78,18.78,0,0,1,28.43-9.93,41.48,41.48,0,0,1,6,5.28q46.32,46.27,92.58,92.62C497,639.55,497.89,641.24,499.36,643.31Z'
      transform='translate(-367.68 -311)'
    />
  </svg>
)

import React from 'react'
import Group from './Group'

const FilterButton = (prop) => {
  console.debug('Boolean RD')
  const ref = React.useRef(null)

  return (
    <div key={prop.key} className={`owl-button-conatiner  ${prop.className}`}>
      <button
        onClick={() => {
          prop.visible = !prop.visible
          ref.current.className = prop.visible ? 'owl-popup-container' : 'hide'
        }}
        className='owl-button'
      >
        {prop.title}
      </button>
      <div
        id='popupContainer'
        onClick={({ target }) => {
          if (target.id === 'popupContainer') {
            prop.visible = false
            ref.current.className = 'hide'
          }
        }}
        ref={ref}
        className='hide'
      >
        <div
          onMouseLeave={() => {
            prop.visible = false
            ref.current.className = 'hide'
          }}
          id='popupContainer'
          className='owl-close-space'
        >
          <div
            id='popupContainer'
            className={`${prop.popupClassName} owl-popup`}
          >
            <Group prop={prop} />
          </div>
        </div>
        <div id='popupContainer' className='close-popup' />
      </div>
    </div>
  )
}

export default FilterButton

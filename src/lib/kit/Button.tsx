import React from 'react'

const Button = ({ prop }) => {
  return (
    <div key={prop.key} className={`owl-button-conatiner  ${prop.className}`}>
      <button onClick={prop.onClick} className='owl-button'>
        {prop.title}
      </button>
    </div>
  )
}

export default Button

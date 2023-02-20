import React from 'react'
import { Link } from 'react-router-dom'

const LinkLabel = ({ queryKey, url, title, action }) => {
  console.log('LinkLabel', queryKey, url, title, action)
  return (
    <Link id={queryKey} to={url}>
      <p onClick={action} className='more-option'>
        {title}
      </p>
    </Link>
  )
}

export default React.memo(LinkLabel)

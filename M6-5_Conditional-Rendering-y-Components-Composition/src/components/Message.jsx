import React from 'react'

const Message = ({ mensaje }) => {
  return (
    <div>
      {mensaje ? <p>{mensaje}</p> : null}
    </div>
  )
}

export default Message

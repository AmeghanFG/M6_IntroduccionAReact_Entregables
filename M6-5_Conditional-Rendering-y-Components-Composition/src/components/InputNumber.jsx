import React from 'react'

const InputNumber = ({ numeroIngresado, setNumeroIngresado }) => {
  return (
    <div>
      <input type='number' name='numeroIngresado' id='numeroIngresado' value={numeroIngresado} onChange={(event) => setNumeroIngresado(event.target.value)} />
    </div>
  )
}

export default InputNumber

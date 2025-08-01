import React from 'react'
import imagen404 from '../assets/404_image.png'

const NotFound = () => {
  return (
    <div className='page-404'>
      <h1>Error 404 - Página no encontrada</h1>
      <img src={imagen404} alt='imagen de erorr 404' />
    </div>
  )
}

export default NotFound

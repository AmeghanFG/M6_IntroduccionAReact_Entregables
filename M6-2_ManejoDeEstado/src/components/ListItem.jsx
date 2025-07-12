import React from 'react'

const ListItem = ({producto, eliminarProducto}) => {
  return (
    <li><p>{producto}</p> 
        <button onClick={eliminarProducto}>
            Eliminar
        </button>
    </li>
  )
}

export default ListItem
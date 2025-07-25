import React from 'react'

const ListaTareas = ({ tareas }) => {
  return (
    <div>
    <h3>Tareas</h3>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>{tarea.nombre}: {tarea.duracion} minutos</li>
        ))}
      </ul>
    </div>
  )
}

export default ListaTareas
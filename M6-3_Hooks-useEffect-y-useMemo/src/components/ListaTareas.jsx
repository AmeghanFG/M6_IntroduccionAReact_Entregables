import React from 'react'

const ListaTareas = ({ tareas }) => {
  return (
    <div>
    <h2>Tareas</h2>
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>{tarea.nombre}: {tarea.duracion} minutos</li>
        ))}
      </ul>
    </div>
  )
}

export default ListaTareas
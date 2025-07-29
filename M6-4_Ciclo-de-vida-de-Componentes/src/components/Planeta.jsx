import React, { useEffect } from 'react';

function Planeta({ planeta, handleDelete }) {
  useEffect(() => {
    console.log(`¡El planeta ${planeta.nombre} ha aparecido!`); // Montaje
    return () => console.log(`¡El planeta ${planeta.nombre} ha desaparecido!`); // Desmontaje
  }, [planeta.nombre]);
  return <div>
    <li>
      <h3>{planeta.nombre}</h3>
      <p>{planeta.descripcion}</p>
      {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  </div>;
}

export default Planeta;

import React, { useEffect } from 'react';

function Planeta({ planeta, handleDelete }) {
  useEffect(() => {
    console.log(`¡El planeta ${planeta.nombre} ha aparecido!`); // Montaje
    return () => console.log(`¡El planeta ${planeta.nombre} ha desaparecido!`); // Desmontaje
  }, [planeta.nombre]);

  return (
    <li>
      <h3>{planeta.nombre}</h3>
      <p>{planeta.descripcion}</p>
      <div className='imagen-planeta'>{planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}</div>
      <button onClick={handleDelete}>Eliminar</button>
    </li>
  );
}

export default Planeta;

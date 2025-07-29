import React, { useState, useEffect, useMemo, useRef } from 'react';
// import Planeta from './components/Planeta';
import './App.css'

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(10);
  const [estadoNave, setEstadoNave] = useState('En órbita');

  // Estados para planetas desde localStorage
  const [planetas, setPlanetas] = useState(
    JSON.parse(localStorage.getItem('planetas')) || []
  );
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState(null);
  const inputImagenRef = useRef(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false); 

  // Efectos
  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      // ... (simulación de vuelo)
      setCombustible((prev) => {
        if (estadoNave === 'Aterrizando' || prev < 1) {
          clearInterval(intervalo);
          return prev;
        } else {
          setDistancia((distancia) => distancia + 50); // Aumento de 100km por segundo
          return prev - 1; // Reducir combustible 1%
        }
      });
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, [estadoNave]);


  useEffect(() => {
    // setEstadoNave('¡Combustible actualizado!');
    console.log(`Combustible actualizado: ${combustible}%`);
    if (combustible === 0 && estadoNave !== 'Aterrizando') {
      setEstadoNave('Sin combustible ⛽️');
    }
  }, [combustible]);


  // Efecto para guardar planetas en localStorage
  useEffect(() => {
    localStorage.setItem('planetas', JSON.stringify(planetas));
  }, [planetas]);

  // Memorización
  const mensajeEstado = useMemo(() => {
    return estadoNave;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave('Aterrizando, agrega el planeta');
    setMostrarFormulario(true);
  };

  const despegar = () => {
    if (combustible > 0) {
      setEstadoNave('En órbita');
      setMostrarFormulario(false);
    } else {
      setEstadoNave('Sin combustible, aterriza para recargar ⛽️');
    }
  };

  const recargarCombustible = () => {
    setCombustible(10);
    // setEstadoNave('Combustible recargado');
  };

  const handleSubmit = (e) => { // Guardar planeta
    e.preventDefault();

    const nuevoPlaneta = {
      nombre,
      descripcion,
      imagen: imagen ? URL.createObjectURL(imagen) : null,
    };

    setPlanetas([...planetas, nuevoPlaneta]);
    setNombre('');
    setDescripcion('');
    setImagen(null);

    if (inputImagenRef.current) {
      inputImagenRef.current.value = ''; // Limpiar el input de imagen
    }
  };

  const handleDelete = (index) => {
    const nuevosPlanetas = [...planetas];
    nuevosPlanetas.splice(index, 1);
    setPlanetas(nuevosPlanetas);
  };

  return (
    <>
      <div>
        <h1>Panel de Control de la Nave Espacial</h1>
        <p>Distancia recorrida: {distancia} km</p>
        <p>Combustible restante: {combustible}%</p>
        <p>Estado de la nave: {mensajeEstado}</p>
        <button onClick={aterrizar} disabled={estadoNave === 'Aterrizando'}>Aterrizar</button>
        <button onClick={recargarCombustible}>Recargar combustible</button>
        <button onClick={despegar} disabled={estadoNave !== 'Aterrizando'}>Despegar</button>
      </div>
      <div>

        {mostrarFormulario && (
          <div className='formRegistrar-Planetas'>
        <h2>Registrar Planeta</h2>
          <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImagen(e.target.files[0])}
          ref={inputImagenRef}
        />
        <button type="submit">Guardar</button>
      </form>
        </div>
      )}

      <h2>Planetas Registrados</h2>
      <ul>
        {planetas.map((planeta, index) => (
          <li key={index}>
            <h3>{planeta.nombre}</h3>
            <p>{planeta.descripcion}</p>
            {planeta.imagen && <img src={planeta.imagen} alt={planeta.nombre} />}
            <button onClick={() => handleDelete(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      </div>
    </>
  )
}
export default App;

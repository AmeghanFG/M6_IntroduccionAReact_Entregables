import React, { useState, useEffect, useMemo } from 'react';
import './App.css'

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(10);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

  // Memorización
  const mensajeEstado = useMemo(() => {
    return estadoNave;
  }, [estadoNave]);

  // Efectos
  useEffect(() => {
    console.log("¡El panel está listo!"); // Montaje

    const intervalo = setInterval(() => { // Montaje
      // ... (simulación de vuelo)
      setCombustible((prev) => {
        if (prev > 0) {
          setDistancia((distancia) => distancia + 50); // Aumento de 100km por segundo
          return prev - 1; // Reducir combustible 1%
        }
        return 0; // Salir del bucle si el combustible llega a 0
      });
    }, 1000);

    return () => {
      clearInterval(intervalo); // Desmontaje
      console.log("El panel se ha apagado."); // Desmontaje
    };
  }, []);

  // Efecto para manejar mensajes y aterrizar
  useEffect(() => {
    setEstadoNave('¡Combustible actualizado!');
    if (combustible === 0) {
      setEstadoNave('Sin combustible, aterriza para recargar ⛽️');
    }
  }, [combustible]);

  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    setPlanetasVisitados((prev) => [...prev, 'Nuevo planeta']);
    setCombustible(10); // Recarga de combustible para seguir viajando
  };


  return (
    <>
      <div>
        <h1>Panel de Control de la Nave Espacial</h1>
        <p>Distancia recorrida: {distancia} km</p>
        <p>Combustible restante: {combustible}%</p>
        <p>Estado de la nave: {mensajeEstado}</p>
        <p>Planetas visitados: {planetasVisitados.join(', ') || 'Ninguno'}</p>
      </div>
      <div>
        <button onClick={aterrizar}>Aterrizar</button>
      </div>
    </>
  )
}
export default App;

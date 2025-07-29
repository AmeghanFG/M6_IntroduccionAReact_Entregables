import React, { useState, useEffect, useMemo } from 'react';
import Planeta from './components/Planeta';
import './App.css'

function App() {
  // Estados
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(10);
  const [estadoNave, setEstadoNave] = useState('En órbita');
  const [planetasVisitados, setPlanetasVisitados] = useState([]);

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
      setEstadoNave('Sin combustible, aterriza para recargar ⛽️');
    }
  }, [combustible]);

  // Memorización
  const mensajeEstado = useMemo(() => {
    return estadoNave;
  }, [estadoNave]);

  const aterrizar = () => {
    setEstadoNave('Aterrizando');
    setPlanetasVisitados((prev) => [...prev, 'Nuevo planeta']);
    setTimeout(() => {
      setCombustible(10);
      setEstadoNave('En órbita');
    }, 1500); // Simula el aterrizaje y recarga de combustible
  };

  return (
    <>
      <div>
        <h1>Panel de Control de la Nave Espacial</h1>
        <p>Distancia recorrida: {distancia} km</p>
        <p>Combustible restante: {combustible}%</p>
        <p>Estado de la nave: {mensajeEstado}</p>
        
        <h2>Planetas Visitados</h2>
        {planetasVisitados.length > 0 ? (
          planetasVisitados.map((planeta, index) => (
            <Planeta key={index} nombre={planeta} />
          ))
        ) : (
          <p>No has visitado ningún planeta aún.</p>
        )}
      </div>
      <div>
        <button onClick={aterrizar} disabled={estadoNave === 'Aterrizando'}>Aterrizar</button>
      </div>
    </>
  )
}
export default App;

import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import ListaTareas from './components/listaTareas';

function App() {
  // TODO: Estados para manejar las tareas y su duración
  const [tareas, setTareas] = useState([]); // Inicializa un array vacío para las tareas
  const [nuevaTarea, setNuevaTarea] = useState(''); // Estado para el nombre de la nueva tarea
  const [duracion, setDuracion] = useState(''); // Estado para la duración de la nueva tarea
  const [filtroTareas, setFiltroTareas] = useState(''); // Estado para el filtro de tareas por duración
  const [mostrarRecientes, setMostrarRecientes] = useState(false);

  // Cálculo de tiempo total optimizado con useMemo
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce((total, tarea) => total + tarea.duracion, 0);
  }, [tareas]); // Solo se recalcula cuando cambian las tareas

  // *Filtro de tareas, puede ser por duración y/o recientes
  const tareasFiltradas = useMemo(() => {
    let filtrado = tareas;

    if (filtroTareas) {
      filtrado = filtrado.filter((tarea) => tarea.duracion === parseInt(filtroTareas));
      console.log(`Filtrando tareas por duración: ${filtroTareas} minutos`);
    }

    if (mostrarRecientes) {
    const tiempoMin = 1 * 60 * 60 * 1000; // 1 hora en milisegundos
    const ahora = Date.now();
    filtrado = filtrado.filter(tarea => ahora - new Date(tarea.fecha).getTime() <= tiempoMin);
  }

    return filtrado;
  }, [tareas, filtroTareas, mostrarRecientes]); // Se recalcula cuando cambian las tareas o el filtro

  // *Efecto secundario: Actualizar el título del documento cada vez que cambia el total
  useEffect(() => {
  document.title = `Total: ${calcularTiempoTotal} minutos`;
}, [calcularTiempoTotal]);  // Se ejecuta cada vez que las tareas cambian
// Para evitar el warning de dependencias faltantes se debe remplazar "tareas" con "calcularTiempoTotal"

  // *Función para agregar una nueva tarea
  const agregarTarea = () => {
    if (nuevaTarea && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fecha: new Date() 
      };
      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea('');
      setDuracion('');
    }
  };

  return (
    <div>
      <h1>Contador de Tareas</h1>
      <div>
        <input 
          type="text" 
          value={nuevaTarea} 
          onChange={(e) => setNuevaTarea(e.target.value)} 
          placeholder="Nombre de la tarea" 
        />
        <input 
          type="number" 
          value={duracion} 
          onChange={(e) => setDuracion(e.target.value)} 
          placeholder="Duración en minutos" 
        />
        <button onClick={agregarTarea}>Agregar tarea</button>

        <div className='filtros'>
          <input
            type="number"
            value={filtroTareas}
            onChange={(e) => setFiltroTareas(e.target.value)}
            placeholder="Filtrar por duración en minutos"
          />

          <label>
            <input
            type="checkbox"
            checked={mostrarRecientes}
            onChange={(e) => setMostrarRecientes(e.target.checked)}/>
            Recientes (1 hora)
          </label>
        </div>
      </div>

      <ListaTareas tareas={tareasFiltradas} />

      <h3>Total de tiempo: {calcularTiempoTotal} minutos</h3>
    </div>
  );
}

export default App;
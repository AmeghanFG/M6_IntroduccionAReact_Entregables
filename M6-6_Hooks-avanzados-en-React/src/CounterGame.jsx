import { useReducer, useRef, useCallback, useEffect, useState } from 'react'

const initialState = { count: 0, history: [] } /* Estado inicial del componente, count guarda el valor actual del contador y history guarda en forma de arreglo la secuencia de cambios realizados */

// Carga inicial del LocalStorage
const loadCounterHistory = () => {
  try {
    const info = localStorage.getItem('counterHistory')
    return info ? JSON.parse(info) : initialState
  } catch {
    return initialState
  }
}

// *Function reducer
function reducer (state, action) { // state es el estado actual antes de la acción, action es un objeto con al menos una propiedad type, que indica qué tipo de acción se debe ejecutar.
  switch (action.type) { // Si se activa increment se agrega uno a state
    case 'increment': {
      const increment = action.payload || 0
      return {
        count: state.count + increment, history: [...state.history, `+${increment} (Nuevo valor: ${state.count + increment})`]
      } // En el count se suma/resta y se agrega la acción en history con spread operator para no perder las acciones anteriores
    }
    case 'decrement': {
      const decrement = action.payload || 0
      return {
        count: state.count - decrement, history: [...state.history, `-${decrement} (Nuevo valor: ${state.count - decrement})`]
      }
    }
    case 'reset':
      return initialState // Regresar al estado inicial
    case 'undo': {
      if (state.history.length === 0) {
        return state
      }

      if (state.history.length === 1) {
        return initialState
      }

      const previous = state.history[state.history.length - 2] // Extraer el último elemento del historial
      const lastNumber = previous.match(/\(Nuevo valor: (-?\d+)\)/) // Extraemos último valor

      const newCount = lastNumber ? parseInt(lastNumber[1], 10) : state.count // Si se encontro lastNumber, se extrae el 1er grupo (-/+ no) capturado entre parentesis y se asegura en convertirse en base 10

      // Crear un nuevo array sin el último elemento para el nuevo historial
      const newHistory = state.history.slice(0, -1)

      return {
        count: newCount,
        history: newHistory,
      }
    }
    default:
      return state
  }
}

const CounterGame = () => {
  const incrementBtnRef = useRef(null) // Crea referencia  mutable que persiste entre renders. Al inicializar con null, se usará para referenciar directamente el DOM del botón "+".

  // Estados para inputs
  const [inputNumber, setInputNumber] = useState()

  const [state, dispatch] = useReducer(reducer, loadCounterHistory()) // state es el estado actual, que inicialmente es initialState y dispatch es una función para mandar acciones al reducer (la función) y actualizar el estado

  useEffect(() => {
    if (incrementBtnRef.current) { // Se hace referencia al boton +
      incrementBtnRef.current.focus() // Se agrega el .focus() para que el btn tenga el foco en automatico al recargar la página
      // TODO: Investigar para que se usa el .current
    }
  }, []) // Solo se ejecuta una vez

  // *Guardar en LocalStorage con useEffect
  useEffect(() => {
    localStorage.setItem('counterHistory', JSON.stringify(state))
  }, [state])

  // Acciones
  const handleIncrement = useCallback(() => {
    const incrementValue = parseInt(inputNumber, 10)
    if (!isNaN(incrementValue) && incrementValue > 0) { // Evalua si son números y si es mayor que 0
      setInputNumber('') // Limpiar
      dispatch({ type: 'increment', payload: incrementValue }) // Payload es el nombre (por convención) de una propiedad que contiene datos que se necesitan para actualizar el estado
    } else {
      console.log(`${incrementValue} no es válido, solo números`)
    }
  }, [inputNumber])

  const handleDecrement = useCallback(() => {
    const decrementValue = parseInt(inputNumber, 10)
    if (!isNaN(decrementValue) && decrementValue > 0) {
      setInputNumber('')
      dispatch({ type: 'decrement', payload: decrementValue })
    }
  }, [inputNumber])

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  const handleUndo = useCallback(() => {
    dispatch({ type: 'undo' })
  }, [])

  return ( // Interfaz
    <section id='contenedor-juego'>
      <h2>Contador: {state.count}</h2>
      <div id='formulario'>
        <div id='contedor-input-botones-mas-menos'>
          <input
            type='number'
            min='0' placeholder='Ingresa un número'
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value)}
          />
          <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
        </div>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleUndo}>Deshacer</button>
      </div>
      <h3>Historial de cambios:</h3>
      <ul>
        {
        state.history.length > 0
          ? state.history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))
          : <p>No hay cambios</p>
          }
      </ul>
    </section>
  )
}

export default CounterGame

// Opción 2: https://gist.github.com/heladio-devf-mx/997e700a03762c892a84f76e1491845a

import { useReducer, useRef, useCallback, useEffect } from 'react'

const initialState = { count: 0, history: [] } /* Estado inicial del componente, count guarda el valor actual del contador y history guarda en forma de arreglo la secuencia de cambios realizados */

function reducer (state, action) { // state es el estado actual antes de la acción, action es un objeto con al menos una propiedad type, que indica qué tipo de acción se debe ejecutar.
  switch (action.type) { // Si se activa increment se agrega uno a state
    case 'increment':
      return {
        count: state.count + 1, history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`]
      } // En el count se suma/resta y se agrega la acción en history con spread operator para no perder las acciones anteriores
    case 'decrement':
      return {
        count: state.count - 1, history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`]
      }
    case 'reset':
      return initialState // Regresar al estado inicial
    default:
      return state
  }
}

const CounterGame = () => {
  const incrementBtnRef = useRef(null) // Crea referencia  mutable que persiste entre renders. Al inicializar con null, se usará para referenciar directamente el DOM del botón "+".

  const [state, dispatch] = useReducer(reducer, initialState) // state es el estado actual, que inicialmente es initialState y dispatch es una función para mandar acciones al reducer y actualizar el estado

  useEffect(() => {
    if (incrementBtnRef.current) { // Se hace referencia al boton +
      incrementBtnRef.current.focus() // Se agrega el .focus() para que el btn tenga el foco en automatico al recargar la página
      // TODO: Investigar para que se usa el .current
    }
  }, []) // Solo se ejecuta una vez

  // Acciones
  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment' })
  }, [])

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement' })
  }, [])

  const handleReset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  return ( // Interfaz
    <div>
      <h2>Contador: {state.count}</h2>
      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset}>Reset</button>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  )
}

export default CounterGame

import { useReducer, useRef, useCallback, useEffect } from 'react'

const CounterGame = () => {
  const incrementBtnRef = useRef(null)
  const initialState = { count: 0, history: [] }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    incrementBtnRef.current.focus()
  }, [])

  function reducer (state, action) {
    switch (action.type) {
      case 'increment':
        return {
          count: state.count + 1, history: [...state.history, `+1 (Nuevo valor: ${state.count + 1})`]
        }
      case 'decrement':
        return {
          count: state.count - 1, history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`]
        }
      case 'reset':
        return initialState
      default:
        return state
    }
  }

  const handleIncrement = useCallback(() => {
    dispatch({ type: 'increment' })
  }, [])

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement' })
  }, [])

  return (
    <div>
      <h2>Contador: {state.count}</h2>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>

      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>

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

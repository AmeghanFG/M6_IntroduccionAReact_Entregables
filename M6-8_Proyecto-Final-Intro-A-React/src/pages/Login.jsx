// Login.js (incompleto)
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(userName)
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text' placeholder='Nombre del usuario'
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button type='submit'>Iniciar sesion</button>
    </form>
  )
}

export default Login

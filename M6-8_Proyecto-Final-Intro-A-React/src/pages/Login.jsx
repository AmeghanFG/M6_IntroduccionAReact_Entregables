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
    <div className='login-container'>
      <h1>Registra tu usuario</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type='text' placeholder='Nombre del usuario'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <button type='submit'>Iniciar sesion</button>
      </form>
    </div>
  )
}

export default Login

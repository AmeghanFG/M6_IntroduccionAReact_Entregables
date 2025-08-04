import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import { useState, useEffect } from 'react'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Recuperar información del usuario desde localStorage
    const getUser = localStorage.getItem('user')
    if (getUser) {
      setUser(JSON.parse(getUser))
    }
  }, [])

  const login = (userName) => {
    // Actualizar estado y guardar información en localStorage
    const userInfo = { userName }
    setUser(userInfo)
    localStorage.setItem('user', JSON.stringify(userInfo))
  }

  const logout = () => {
    // Eliminar información del usuario del estado y localStorage
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login onLogin={login} />} />
        <Route path='/' element={<Home user={user} logout={logout} />} />
        <Route
          path='/profile'
          element={user ? <Profile user={user} /> : <Navigate to='/login' />}
        />
      </Routes>
    </Router>
  )
}

export default App

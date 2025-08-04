import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = ({ user }) => {
  const navegate = useNavigate()

  const handleGoBack = () => {
    navegate(-1)
  }

  return (
    <div className='profile'>
      <h1>Bienvenido a tu perfil</h1>
      {user && <p>Nombre de usuario: {user.userName}</p>}
      <button onClick={handleGoBack}>Volver</button>
    </div>
  )
}

export default Profile

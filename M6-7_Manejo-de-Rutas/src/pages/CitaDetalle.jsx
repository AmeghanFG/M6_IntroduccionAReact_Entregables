import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { citasMedicas } from '../data/citasMedicas'

function CitaDetalle () {
  const { id } = useParams()
  const cita = citasMedicas.find((cita) => cita.id === parseInt(id))

  const navegate = useNavigate()

  if (!cita) {
    return <h1>Cita no encontrada 😿</h1>
  }

  const handleGoBack = () => {
    navegate(-1)
  }

  return (
    <>
      <h1>Detalles</h1>

      <div className='cita-details'>
        <h2>Cita {cita.id}</h2>

        <div>
          <section className='patient-info'>
            <h3>Paciente</h3>
            <p><strong>Nombre: </strong>{cita.paciente.nombre}</p>
            <p><strong>Edad: </strong>{cita.paciente.edad}</p>
            <p><strong>Genero: </strong>{cita.paciente.genero}</p>
            <p><strong>Contacto: </strong>{cita.paciente.contacto}</p>
          </section>

          <section className='dr-info'>
            <h3>Doctor</h3>
            <p><strong>Nombre: </strong>{cita.medico.nombre}</p>
            <p><strong>Especialidad: </strong>{cita.medico.especialidad}</p>
          </section>
        </div>

        <section className='general-details-info'>
          <h3>Detalles de la cita</h3>
          <p><strong>Fecha: </strong>{cita.fecha}</p>
          <p><strong>Hora: </strong>{cita.hora}</p>
          <p><strong>Motivo: </strong>{cita.motivo}</p>
          <p><strong>Estado: </strong>{cita.estado}</p>
          <p><strong>Notas: </strong>{cita.notas}</p>
        </section>
      </div>
      <button onClick={handleGoBack} className='btn-volver'>Volver atrás</button>
    </>
  )
}

export default CitaDetalle

import React from 'react'
import { citasMedicas } from '../data/citasMedicas'
import { Link } from 'react-router-dom'

const Citas = () => {
  return (
    <div className='page-citas'>
      <h1>Citas Médicas</h1>

      <div className='appointments-cards'>
        {citasMedicas.map((cita) => (
          <div key={cita.id} className='cita-card'>
            <h3>Cita {cita.id}</h3>
            <p><strong>Paciente: </strong>{cita.paciente.nombre}</p>
            <p><strong>Médico:</strong> {cita.medico.nombre} ({cita.medico.especialidad})</p>
            <p><strong>Fecha:</strong> {cita.fecha} a las {cita.hora}</p>
            <p><strong>Estado:</strong> {cita.estado}</p>
            <Link to={`/cita/${cita.id}`}><button>Ver detalles</button></Link>
          </div>
        ))}
      </div>
    </div>
  )
}
// https://es.react.dev/ o minu.dev pag web y en su web

export default Citas

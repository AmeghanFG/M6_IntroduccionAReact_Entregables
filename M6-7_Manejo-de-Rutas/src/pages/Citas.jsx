import React from 'react'

const citasMedicas = [
  {
    id: 1,
    paciente: {
      nombre: 'Regulus Black',
      edad: 34,
      genero: 'Femenino',
      contacto: 'laura.gomez@email.com'
    },
    medico: {
      nombre: 'Liza Andazola',
      especialidad: 'Dermatología'
    },
    fecha: '2025-08-01',
    hora: '10:30',
    motivo: 'Revisión de lunares',
    estado: 'confirmada',
    notas: 'Paciente con antecedentes de melanoma. Llevar historial clínico.'
  },
  {
    id: 2,
    paciente: {
      nombre: 'Andromeda Torres',
      edad: 58,
      genero: 'Masculino',
      contacto: 'carlos.ruiz@email.com'
    },
    medico: {
      nombre: 'Izar De León',
      especialidad: 'Cardiología'
    },
    fecha: '2025-08-02',
    hora: '14:00',
    motivo: 'Chequeo postoperatorio',
    estado: 'pendiente',
    notas: 'Evaluar presión arterial y ritmo cardíaco.'
  },
  {
    id: 3,
    paciente: {
      nombre: 'Celina Sorní',
      edad: 45,
      genero: 'Femenino',
      contacto: 'maria.lopez@email.com'
    },
    medico: {
      nombre: 'Lena Solís',
      especialidad: 'Ginecología'
    },
    fecha: '2025-08-03',
    hora: '09:00',
    motivo: 'Control anual',
    estado: 'cancelada',
    notas: 'Paciente canceló por motivos personales. Reagendar.'
  },
  {
    id: 4,
    paciente: {
      nombre: 'Oliver Ramírez',
      edad: 29,
      genero: 'Masculino',
      contacto: 'jorge.ramirez@email.com'
    },
    medico: {
      nombre: 'Elena Navarro',
      especialidad: 'Neurología'
    },
    fecha: '2025-08-04',
    hora: '11:15',
    motivo: 'Dolores de cabeza frecuentes',
    estado: 'confirmada',
    notas: 'Solicitar resonancia magnética si persisten los síntomas.'
  }
]

const Citas = () => {
  return (
    <div className='page-citas'>
      <h1>Citas Médicas</h1>
      <div className='appointments-cards'>
        {citasMedicas.map((cita) => (
          <div key={cita.id} className='cita-card'>
            <h3>Cita {cita.id}</h3>
            <p>{cita.paciente.nombre}</p>
            <p><strong>Edad:</strong> {cita.paciente.edad} años</p>
            <p><strong>Género:</strong> {cita.paciente.genero}</p>
            <p><strong>Contacto:</strong> {cita.paciente.contacto}</p>
            <p><strong>Médico:</strong> {cita.medico.nombre} ({cita.medico.especialidad})</p>
            <p><strong>Fecha:</strong> {cita.fecha} a las {cita.hora}</p>
            <p><strong>Motivo:</strong> {cita.motivo}</p>
            <p><strong>Estado:</strong> {cita.estado}</p>
            <p><strong>Notas:</strong> {cita.notas}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
// https://es.react.dev/ o minu.dev pag web y en su web

export default Citas

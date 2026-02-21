import React, { useState } from 'react'
import api from '../api'

export default function Registro() {
  const [formulario, setFormulario] = useState({ name: '', email: '', password: '' })
  const [mensaje, setMensaje] = useState('')

  const manejarCambio = e => setFormulario({ ...formulario, [e.target.name]: e.target.value })

  const manejarEnvio = async e => {
    e.preventDefault()
    setMensaje('')
    try {
      await api.post('/api/register', formulario)
      setMensaje('Registro exitoso. Puedes iniciar sesión.')
      setFormulario({ name: '', email: '', password: '' })
    } catch (err) {
      setMensaje(err?.response?.data?.message || 'Error en el registro')
    }
  }

  return (
    <div className="card">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Nombre</label>
        <input name="name" value={formulario.name} onChange={manejarCambio} required />
        <label>Email</label>
        <input name="email" type="email" value={formulario.email} onChange={manejarCambio} required />
        <label>Contraseña</label>
        <input name="password" type="password" value={formulario.password} onChange={manejarCambio} required />
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  )
}

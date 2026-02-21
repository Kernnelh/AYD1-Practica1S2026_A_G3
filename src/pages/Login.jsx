import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function InicioSesion() {
  const [formulario, setFormulario] = useState({ email: '', password: '' })
  const [mensaje, setMensaje] = useState('')
  const navegar = useNavigate()

  const manejarCambio = e => setFormulario({ ...formulario, [e.target.name]: e.target.value })

  const manejarEnvio = async e => {
    e.preventDefault()
    setMensaje('')
    try {
      const res = await api.post('/api/login', formulario)
      const token = res.data?.token
      if (token) {
        localStorage.setItem('token', token)
        navegar('/profile')
      } else {
        setMensaje('Respuesta inválida del servidor')
      }
    } catch (err) {
      setMensaje(err?.response?.data?.message || 'Error en el login')
    }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Email</label>
        <input name="email" type="email" value={formulario.email} onChange={manejarCambio} required />
        <label>Contraseña</label>
        <input name="password" type="password" value={formulario.password} onChange={manejarCambio} required />
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import api from '../api'

export default function Perfil() {
  const [usuario, setUsuario] = useState(null)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const obtenerPerfil = async () => {
      setMensaje('')
      try {
        const token = localStorage.getItem('token')
        const res = await api.get('/api/profile', {
          headers: { Authorization: token ? `Bearer ${token}` : '' }
        })
        setUsuario(res.data)
      } catch (err) {
        setMensaje(err?.response?.data?.message || 'No se pudo cargar el perfil')
      }
    }
    obtenerPerfil()
  }, [])

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setUsuario(null)
    setMensaje('Sesión cerrada')
  }

  return (
    <div className="card">
      <h2>Perfil</h2>
      {mensaje && <p className="msg">{mensaje}</p>}
      {usuario ? (
        <div>
          <p><strong>Nombre:</strong> {usuario.name}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No hay datos de usuario.</p>
      )}
    </div>
  )
}

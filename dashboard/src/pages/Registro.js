import React, { useState } from 'react';

export default function Registro() {
  const [formulario, setFormulario] = useState({ usuario: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  const manejarCambio = e =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const manejarEnvio = async e => {
    e.preventDefault();
    setMensaje('');
    setEnviando(true);

    try {
      const res = await fetch('http://localhost:8000/usuarios/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario: formulario.usuario, password: formulario.password })
      });

      if (res.status === 201) {
        setMensaje('Registro exitoso. Puedes iniciar sesión.');
        setFormulario({ usuario: '', password: '' });
      } else {
        const data = await res.json();
        setMensaje(data.detail || 'Error en el registro');
      }
    } catch (err) {
      setMensaje('No se pudo conectar con el servidor');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="card">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Usuario</label>
        <input
          name="usuario"
          value={formulario.usuario}
          onChange={manejarCambio}
          required
        />
        <label>Contraseña</label>
        <input
          name="password"
          type="password"
          value={formulario.password}
          onChange={manejarCambio}
          required
        />
        <button type="submit" disabled={enviando}>{enviando ? 'Enviando...' : 'Registrar'}</button>
      </form>
      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  );
}

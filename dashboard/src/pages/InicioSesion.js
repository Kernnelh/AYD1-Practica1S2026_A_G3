import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InicioSesion() {
  const [formulario, setFormulario] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navegar = useNavigate();

  const manejarCambio = e =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const manejarEnvio = e => {
    e.preventDefault();
    setMensaje('');
    if (formulario.email && formulario.password) {
      // Guardar token ficticio y datos de usuario en localStorage
      localStorage.setItem('token', 'demo-token');
      localStorage.setItem(
        'usuario',
        JSON.stringify({ name: 'Usuario Demo', email: formulario.email })
      );
      navegar('/profile');
    } else {
      setMensaje('Debes ingresar email y contraseña');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formulario.email}
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
        <button type="submit">Iniciar sesión</button>
      </form>
      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  );
}
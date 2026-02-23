import React, { useState } from 'react';

export default function Registro() {
  const [formulario, setFormulario] = useState({ name: '', email: '', password: '' });
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = e =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const manejarEnvio = e => {
    e.preventDefault();
    setMensaje('');
    try {
      // Guardar usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(formulario));
      setMensaje('Registro exitoso. Puedes iniciar sesión.');
      setFormulario({ name: '', email: '', password: '' });
    } catch (err) {
      setMensaje('Error en el registro local');
    }
  };

  return (
    <div className="card">
      <h2>Registro</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Nombre</label>
        <input
          name="name"
          value={formulario.name}
          onChange={manejarCambio}
          required
        />
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
        <button type="submit">Registrar</button>
      </form>
      {mensaje && <p className="msg">{mensaje}</p>}
    </div>
  );
}

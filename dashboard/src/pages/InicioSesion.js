import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InicioSesion() {
  const [formulario, setFormulario] = useState({ email: '', password: '' });
  const [mensaje, setMensaje] = useState('');
  const navegar = useNavigate();

  const manejarCambio = e =>
    setFormulario({ ...formulario, [e.target.name]: e.target.value });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    
    if (formulario.email && formulario.password) {
      try {
        // Petición real a tu backend
        const respuesta = await fetch('http://localhost:8000/usuarios/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            usuario: formulario.email, // Emparejamos el email del front con 'usuario' del back
            password: formulario.password
          })
        });

        if (respuesta.ok) {
          const datosUsuario = await respuesta.json();
          // Guardamos el ID real para que Notas.js sepa a quién asignarle la nota
          localStorage.setItem('usuario_id', datosUsuario.id); 
          localStorage.setItem('usuario', JSON.stringify(datosUsuario));
          
          // Cambia '/profile' por la ruta donde esté montado tu componente Notas
          navegar('/notas'); 
        } else {
          setMensaje('Credenciales incorrectas');
        }
      } catch (error) {
        setMensaje('Error al conectar con el servidor (¿Está encendido FastAPI?)');
      }
    } else {
      setMensaje('Debes ingresar usuario y contraseña');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={manejarEnvio} className="form">
        <label>Usuario / Email</label>
        <input
          name="email"
          type="text" 
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
      {mensaje && <p className="msg" style={{color: 'red'}}>{mensaje}</p>}
    </div>
  );
}
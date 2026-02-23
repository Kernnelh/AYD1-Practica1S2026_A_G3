import React, { useEffect, useState } from 'react';

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    setMensaje('');
    const token = localStorage.getItem('token');
    const datosUsuario = localStorage.getItem('usuario');
    if (token && datosUsuario) {
      setUsuario(JSON.parse(datosUsuario));
    } else {
      setMensaje('No se pudo cargar el perfil');
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    setMensaje('Sesión cerrada');
  };

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
  );
}
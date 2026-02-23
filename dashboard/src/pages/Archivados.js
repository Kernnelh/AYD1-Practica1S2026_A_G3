import { useState, useEffect } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { GoArchive } from "react-icons/go";

const Archivados = () => {
  // Manejamos el estado localmente para que sea un componente independiente
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // 1. Cargar las notas archivadas del usuario desde MySQL
  useEffect(() => {
    const fetchArchivedNotas = async () => {
      try {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        const respuesta = await fetch(`http://localhost:8000/notas/?usuario_id=${idUsuario}`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          const notasFormateadas = data.map(n => ({
            id: n.id,
            title: n.titulo,
            description: n.descripcion,
            pinned: n.es_fijado,
            archived: n.es_archivado
          }));
          
          // FILTRO CLAVE: Aquí solo guardamos las que SÍ están archivadas
          setArchivedNotes(notasFormateadas.filter(n => n.archived));
        }
      } catch (error) {
        console.error("Error al cargar notas archivadas:", error);
      }
    };
    fetchArchivedNotas();
  }, []);

  // 2. Desarchivar nota (PUT)
  const handleUnarchive = async (note) => {
    try {
      const respuesta = await fetch(`http://localhost:8000/notas/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          es_archivado: false // El interruptor mágico para regresarla
        })
      });

      if (respuesta.ok) {
        // Quitamos la nota de esta vista inmediatamente
        setArchivedNotes(archivedNotes.filter((n) => n.id !== note.id));
        
        // Cerramos el panel derecho si estaba viendo la nota que acaba de desarchivar
        if (selectedNote && selectedNote.id === note.id) {
          setSelectedNote(null);
        }
      } else {
        console.error("Error al desarchivar la nota");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="archived-layout">
      <h2 style={{ color: "black", marginLeft: "15px", marginBottom: "15px" }}>
        Notas Archivadas
      </h2>

      {/* LISTA DE NOTAS ARCHIVADAS */}
      <div className="notes-list">
        {archivedNotes.length === 0 ? (
          <p style={{ color: "black" }}>No hay notas archivadas</p>
        ) : (
          archivedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>
              <div className="note-actions">
                <IoMdEye
                  className="eye-icon"
                  onClick={() => setSelectedNote(note)}
                />
                <GoArchive
                  className="archive-icon"
                  onClick={() => handleUnarchive(note)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* PANEL DERECHO */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>{selectedNote.title}</h3>
            <IoMdClose
              className="close-icon"
              onClick={() => setSelectedNote(null)}
            />
          </div>

          <div className="panel-content">
            {selectedNote.description || "Sin descripción"}
          </div>

          {selectedNote.tag && (
            <div className="panel-tag">
              <FaTag />
              <span>{selectedNote.tag}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Archivados;

// FUNCIONANDO HASTA EL MOMENTO
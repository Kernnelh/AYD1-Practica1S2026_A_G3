import { useState, useEffect } from "react";
import { FaTag, FaThumbtack } from "react-icons/fa"; // Importamos el ícono de tachuela
import { IoMdEye, IoMdClose } from "react-icons/io";

const Fijados = () => {
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // 1. Cargar las notas fijadas del usuario desde MySQL
  useEffect(() => {
    const fetchPinnedNotas = async () => {
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
          
          // FILTRO CLAVE: Solo guardamos las que están fijadas y NO están archivadas
          setPinnedNotes(notasFormateadas.filter(n => n.pinned && !n.archived));
        }
      } catch (error) {
        console.error("Error al cargar notas fijadas:", error);
      }
    };
    fetchPinnedNotas();
  }, []);

  // 2. Desfijar nota desde esta vista (PUT)
  const handleUnpin = async (note) => {
    try {
      const respuesta = await fetch(`http://localhost:8000/notas/${note.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          es_fijado: false
        })
      });

      if (respuesta.ok) {
        // La quitamos de esta pantalla
        setPinnedNotes(pinnedNotes.filter((n) => n.id !== note.id));
        
        // Cerramos el panel derecho si estaba abierto
        if (selectedNote && selectedNote.id === note.id) {
          setSelectedNote(null);
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="pinned-layout">
      {/* ===== TÍTULO ===== */}
      <h2 style={{ color: "black", marginLeft: "10px", marginBottom: "15px" }}>
        Notas Fijadas
      </h2>

      {/* ===== LISTA DE NOTAS FIJADAS ===== */}
      <div className="notes-list">
        {pinnedNotes.length === 0 ? (
          <p style={{ color: "black", marginLeft: "10px" }}>No hay notas fijadas.</p>
        ) : (
          pinnedNotes.map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>

              {/* Botones de acción */}
              <div className="note-actions" style={{ display: 'flex', gap: '10px' }}>
                <IoMdEye
                  className="eye-icon"
                  onClick={() => setSelectedNote(note)}
                  style={{ cursor: "pointer" }}
                />
                {/* Agregamos el ícono para desfijar */}
                <FaThumbtack 
                  className="pin-icon pinned" 
                  onClick={() => handleUnpin(note)}
                  style={{ color: "#007bff", cursor: "pointer" }}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ===== PANEL DERECHO ===== */}
      {selectedNote && (
        <div className="note-panel">
          <div className="panel-header">
            <h3>{selectedNote.title}</h3>
            <IoMdClose
              className="close-icon"
              onClick={() => setSelectedNote(null)}
              style={{ cursor: "pointer" }}
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

export default Fijados;
import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import NoteForm from "../components/NoteForm";

const ModificarNotas = () => {
  // Ahora manejamos el estado de las notas localmente, sin depender de App.js
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  // 1. Cargar notas desde la base de datos MySQL al abrir la pantalla
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const idUsuario = localStorage.getItem('usuario_id');
        if (!idUsuario) return;

        const respuesta = await fetch(`http://localhost:8000/notas/?usuario_id=${idUsuario}`);
        if (respuesta.ok) {
          const data = await respuesta.json();
          // Mapeamos los campos del backend (titulo, es_archivado) al frontend (title, archived)
          const notasFormateadas = data.map(n => ({
            id: n.id,
            title: n.titulo,
            description: n.descripcion,
            pinned: n.es_fijado,
            archived: n.es_archivado
          }));
          
          // Solo mostramos en esta lista las notas que no estén archivadas
          setNotes(notasFormateadas.filter(n => !n.archived));
        }
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    };
    fetchNotas();
  }, []);

  // 2. Enviar actualización al backend (PUT)
  const handleUpdateNote = async (updatedData) => {
    try {
      const respuesta = await fetch(`http://localhost:8000/notas/${selectedNote.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Traducimos lo que devuelve tu NoteForm a lo que espera FastAPI
          titulo: updatedData.title,
          descripcion: updatedData.description
        })
      });

      if (respuesta.ok) {
        // Actualizamos la vista localmente
        const updatedNotes = notes.map((note) =>
          note.id === selectedNote.id
            ? { ...note, ...updatedData }
            : note
        );
        setNotes(updatedNotes);
        setSelectedNote(null);
        alert("Nota modificada con éxito en la base de datos");
      } else {
        alert("Error al modificar la nota en el servidor");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="notas-container" style={{ padding: "20px" }}>
      <h2 style={{ color: "black", marginBottom: "20px" }}>Modificar Notas</h2>

      {/* MENSAJE SI NO HAY NOTAS */}
      {notes.length === 0 && (
        <div className="note-card" style={{ color: "black" }}>
          Aún no hay notas existentes que puedas modificar
        </div>
      )}

      {/* LISTA DE NOTAS */}
      {notes.length > 0 && (
        <div className="notes-list" style={{ marginBottom: "20px" }}>
          {notes.map((note) => (
            <div key={note.id} className="note-item modify-item" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{note.title}</span>

              <FaEdit
                className="edit-icon"
                onClick={() => setSelectedNote(note)}
                title="Modificar nota"
                style={{ cursor: "pointer", color: "#007bff" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* FORMULARIO DE EDICIÓN */}
      {selectedNote && (
        <div className="note-panel" style={{ position: "relative" }}>
          <h3 style={{ color: "black", marginBottom: "15px" }}>Editando: {selectedNote.title}</h3>
          <NoteForm
            initialData={selectedNote}
            onSubmit={handleUpdateNote}
            buttonText="Guardar cambios"
          />
        </div>
      )}
    </div>
  );
};

export default ModificarNotas;
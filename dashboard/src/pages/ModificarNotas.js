import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import NoteForm from "../components/NoteForm";

const ModificarNotas = ({ notes, setNotes }) => {
  const [selectedNote, setSelectedNote] = useState(null);

  const handleUpdateNote = (updatedData) => {
    const updatedNotes = notes.map((note) =>
      note.id === selectedNote.id
        ? { ...note, ...updatedData }
        : note
    );

    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  return (
    <div className="notas-container">
      {/* MENSAJE SI NO HAY NOTAS */}
      {notes.length === 0 && (
        <div className="note-card">
          Aún no hay notas existentes que puedas modificar
        </div>
      )}

      {/* LISTA DE NOTAS */}
      {notes.length > 0 && (
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-item modify-item">
              <span>{note.title}</span>

              <FaEdit
                className="edit-icon"
                onClick={() => setSelectedNote(note)}
                title="Modificar nota"
              />
            </div>
          ))}
        </div>
      )}

      {/* FORMULARIO DE EDICIÓN */}
      {selectedNote && (
        <NoteForm
          initialData={selectedNote}
          onSubmit={handleUpdateNote}
          buttonText="Guardar cambios"
        />
      )}
    </div>
  );
};

export default ModificarNotas;
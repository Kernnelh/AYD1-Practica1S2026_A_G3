import { useState } from "react";
import { FaTag } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { GoArchive } from "react-icons/go";
import { FaThumbtack } from "react-icons/fa";                //ícono para fijar notas


const Notas = ({ notes, setNotes, archivedNotes, setArchivedNotes }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");

  // Archivar nota
  const handleArchive = (note) => {
    setNotes(notes.filter((n) => n.id !== note.id));
    setArchivedNotes([note, ...archivedNotes]);
  };

  const togglePin = (noteId) => {                       // Para fijar/desfijar nota
  setNotes(
    notes.map((n) =>
      n.id === noteId ? { ...n, pinned: !n.pinned } : n
    )
  );
  };


  // Crear nueva nota
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }

    const newNote = {
      id: Date.now(),
      title,
      description,
      tag,
      pinned: false         // la funcionalidad para saber si esta o no fijada
    };

    setNotes([newNote, ...notes]);

    // Reset form
    setTitle("");
    setDescription("");
    setTag("");
    setError("");
    setShowForm(false);
  };

  return (
    <div className="notas-layout">
      {/* ===== ZONA IZQUIERDA ===== */}
      <div className="notas-container">
        <button className="btn-create" onClick={() => setShowForm(!showForm)}>
          + Crear nota
        </button>

        {showForm && (
          <div className="note-card">
            <form onSubmit={handleSubmit}>
              <h3>Nueva Nota</h3>

              {error && <p className="error">{error}</p>}

              <input
                type="text"
                placeholder="Título *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <input
                list="tags"
                placeholder="Etiqueta"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />

              <datalist id="tags">
                {tags.map((t, index) => (
                  <option key={index} value={t} />
                ))}
              </datalist>

              <button type="submit" className="btn-save">
                Guardar nota
              </button>
            </form>
          </div>
        )}

    {/* LISTA DE NOTAS */}
    <div className="notes-list">
      {notes.length === 0 ? (
        <p style={{ color: "black" }}>No hay notas creadas</p>
      ) : (
        [...notes] // copiamos el array
          .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) // ordenamos para mostrar primero las fijadas
          .map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>

              {/* Contenedor de íconos */}
              <div className="note-actions">
                <IoMdEye
                  className="eye-icon"
                  onClick={() => setSelectedNote(note)}
                />

                <GoArchive
                  className="archive-icon"
                  onClick={() => handleArchive(note)}
                />

                <FaThumbtack
                  className={`pin-icon ${note.pinned ? "pinned" : ""}`}
                  onClick={() => togglePin(note.id)}
                />
              </div>

            </div>
          ))
      )}
    </div>

      </div>

      {/* ===== PANEL DERECHO ===== */}
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

export default Notas;

// funciona por el  momento
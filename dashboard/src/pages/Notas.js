import { useState, useEffect, useContext } from "react";
import { UserContext } from '../UserContext';
import { FaTag, FaThumbtack } from "react-icons/fa";
import { IoMdEye, IoMdClose } from "react-icons/io";
import { GoArchive } from "react-icons/go";

const Notas = () => {
  // Convertimos las props en estado local para que el componente sea independiente y rápido de probar
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState("");
  const { user } = useContext(UserContext);

  // NUEVO: Cargar notas desde el backend al iniciar
  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const respuesta = await fetch('http://localhost:8000/notas/');
        if (respuesta.ok) {
          const data = await respuesta.json();
          // Mapeamos los nombres de la BD a los nombres que usa tu diseño frontend
          const notasFormateadas = data.map(n => ({
            id: n.id,
            title: n.titulo,
            description: n.descripcion,
            pinned: n.es_fijado,
            archived: n.es_archivado
          }));
          setNotes(notasFormateadas.filter(n => !n.archived));
        }
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    };
    fetchNotas();
  }, []);

  const handleArchive = (note) => {
    setNotes(notes.filter((n) => n.id !== note.id));
    setArchivedNotes([note, ...archivedNotes]);
    // Nota para después del release: Aquí iría el fetch PUT para es_archivado
  };

  const togglePin = (noteId) => {                       
    setNotes(notes.map((n) => n.id === noteId ? { ...n, pinned: !n.pinned } : n));
    // Nota para después del release: Aquí iría el fetch PUT para es_fijado
  };

  // NUEVO: Guardar nota real en el backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      setError("El título es obligatorio");
      return;
    }

    // Obtenemos el ID del usuario que se logueó, si no hay, usamos 1 por seguridad
    const idUsuario = (user && user.id) ? user.id : (localStorage.getItem('usuario_id') || 1);

    const nuevaNotaBD = {
      id_usuario: parseInt(idUsuario),
      titulo: title,
      descripcion: description,
      es_fijado: false,
      es_archivado: false
    };

    try {
      const respuesta = await fetch('http://localhost:8000/notas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaNotaBD)
      });

      if (respuesta.ok) {
        const notaGuardada = await respuesta.json();
        const nuevaNotaFront = {
          id: notaGuardada.id,
          title: notaGuardada.titulo,
          description: notaGuardada.descripcion,
          pinned: notaGuardada.es_fijado
        };
        
        setNotes([nuevaNotaFront, ...notes]);
        setTitle("");
        setDescription("");
        setTag("");
        setError("");
        setShowForm(false);
      }
    } catch (error) {
      setError("Error al guardar en la base de datos");
    }
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
              {error && <p className="error" style={{color: 'red'}}>{error}</p>}
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
        [...notes] 
          .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)) 
          .map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.title}</span>
              <div className="note-actions">
                <IoMdEye className="eye-icon" onClick={() => setSelectedNote(note)} />
                <GoArchive className="archive-icon" onClick={() => handleArchive(note)} />
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
            <IoMdClose className="close-icon" onClick={() => setSelectedNote(null)} />
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
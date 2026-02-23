import { useContext } from 'react';
import { UserContext } from '../UserContext';

export default function DeletedNotes({ deletedNotes }) {
  const { user } = useContext(UserContext);
  return (
    <div className="card dark-card">
      <h2>Notas eliminadas</h2>
      {deletedNotes.length === 0 ? (
        <p>No hay notas eliminadas.</p>
      ) : (
        deletedNotes.map((note, idx) => (
          <div key={idx} className="note">
            <p>{note.text}</p>
          </div>
        ))
      )}
    </div>
  );
}


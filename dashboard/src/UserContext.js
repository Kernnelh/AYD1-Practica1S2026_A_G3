import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Inicializamos desde localStorage para persistencia entre recargas
  const stored = localStorage.getItem('usuario');
  const storedId = localStorage.getItem('usuario_id');
  const initialUser = stored ? JSON.parse(stored) : (storedId ? { id: parseInt(storedId) } : null);

  const [user, setUser] = useState(initialUser);

  const setUserAndPersist = (u) => {
    setUser(u);
    try {
      if (u) {
        if (u.id) localStorage.setItem('usuario_id', String(u.id));
        localStorage.setItem('usuario', JSON.stringify(u));
      } else {
        localStorage.removeItem('usuario');
        localStorage.removeItem('usuario_id');
      }
    } catch (err) {
      // no-op
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserAndPersist }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

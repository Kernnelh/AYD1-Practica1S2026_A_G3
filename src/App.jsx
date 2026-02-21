import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <Link to="/register">Registro</Link>
        <Link to="/login">Login</Link>
        <Link to="/profile">Perfil</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

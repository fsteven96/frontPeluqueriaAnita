import React, { useState } from 'react';
import { login } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function LoginPage() {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({ usuario: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    const data = await login(formData.usuario, formData.password);

    // Redirigir si se recibe un usuario válido
    if (data.usuario) {
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        window.location.href = '/dashboard'; // O la ruta que tengas
    } else {
        setError('Login incorrecto');
    }
    } catch (err) {
    setError('Usuario o contraseña inválidos');
    }

  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">Usuario</label>
            <input
              type="text"
              className="form-control"
              id="usuario"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

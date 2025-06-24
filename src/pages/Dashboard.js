import React, { useState } from 'react';
import ClienteList from '../components/ClienteList';
import CitaList from '../components/CitaList';



import ListaAtenciones from '../components/ListaAtenciones';

const Dashboard = () => {
  const [seccion, setSeccion] = useState('clientes');
  
  const handleChange = (e) => {
    setSeccion(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Panel de Control - Peluquería Anita</h2>

      {/* Selector de sección */}
      <div className="mb-3">
        <label htmlFor="seccion" className="form-label">
          Seleccionar sección:
        </label>
        <select
          id="seccion"
          className="form-select"
          value={seccion}
          onChange={handleChange}
        >
          <option value="clientes">Clientes</option>
          <option value="citas">Citas</option>
          <option value="atenciones">Atenciones</option>
        </select>
      </div>

      {/* Mostrar contenido según opción seleccionada */}
      {seccion === 'clientes' && (
        <div>
          
          <ClienteList />
        </div>
      )}

      {seccion === 'citas' && (
        <div>
        
          <CitaList />
        </div>
      )}

      {seccion === 'atenciones' && (
        <div>
         <ListaAtenciones />
        </div>
      )}
    </div>
  );
};

export default Dashboard;


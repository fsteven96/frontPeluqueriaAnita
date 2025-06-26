import React, { useState, useEffect } from 'react';
import { obtenerAtenciones } from '../services/api';
import FormNuevaAtencion from './FormNuevaAtencion';

const ListaAtenciones = () => {
  const [atenciones, setAtenciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const cargarAtenciones = async () => {
    try {
      const data = await obtenerAtenciones();
      setAtenciones(data);
    } catch (err) {
      setError('Error al cargar las atenciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAtenciones();
  }, []);

  const handleAtencionGuardada = () => {
    cargarAtenciones(); // Recarga la lista después de guardar una atención
  };

  if (loading) return <p>Cargando atenciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Atenciones por Cita</h5>
        <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
          + Agregar Atención
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre Cliente</th>
              <th>Fecha y Hora de Cita</th>
              <th>Descripción de Atención</th>
              <th>Fecha de Atención</th>
            </tr>
          </thead>
          <tbody>
            {atenciones.length > 0 ? (
              atenciones.map((atencion) => (
                <tr key={atencion.Id}>
                  <td>{atencion.NombreCliente}</td>
                  <td>{new Date(atencion.FechaHora).toLocaleString()}</td>
                  <td>{atencion.Descripcion}</td>
                  <td>{new Date(atencion.FechaAtencion).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay atenciones registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal para agregar nueva atención */}
      {mostrarModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalLabel">Registrar Nueva Atención</h5>
                <button type="button" className="btn-close" onClick={() => setMostrarModal(false)} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <FormNuevaAtencion onAtencionGuardada={handleAtencionGuardada} onClose={() => setMostrarModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaAtenciones;



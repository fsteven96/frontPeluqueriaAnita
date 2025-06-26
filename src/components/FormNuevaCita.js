import React, { useState, useEffect } from 'react';
import { agendarCita, obtenerClientes } from '../services/api';

const FormNuevaCita = ({ mostrar, onClose, onCitaCreada }) => {
  const [clientes, setClientes] = useState([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  useEffect(() => {
    if (mostrar) {
      cargarClientes();
    }
  }, [mostrar]);

  const cargarClientes = async () => {
    try {
      const data = await obtenerClientes();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId) {
      alert('Por favor selecciona un cliente.');
      return;
    }

    try {
      await agendarCita({
        clienteId: parseInt(clienteId),
        fechaHora: fechaHora,
        estado: 'Agendada',  // Estado fijo
      });

      onCitaCreada();  // Notifica al padre que debe recargar
      onClose();       // Cierra el modal
    } catch (error) {
      alert('Error al guardar la cita.');
      console.error(error);
    }
  };

  if (!mostrar) return null;

  const clientesFiltrados = clientes.filter(c =>
    c.Nombre.toLowerCase().includes(filtroCliente.toLowerCase())
  );

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Agendar Nueva Cita</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">

              <div className="mb-3">
                <label>Buscar Cliente</label>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Filtrar por nombre..."
                  value={filtroCliente}
                  onChange={(e) => setFiltroCliente(e.target.value)}
                />
                <select
                  className="form-select"
                  value={clienteId}
                  onChange={(e) => setClienteId(e.target.value)}
                  required
                >
                  <option value="">-- Selecciona un cliente --</option>
                  {clientesFiltrados.map(c => (
                    <option key={c.Id} value={c.Id}>
                      {c.Nombre}
                    </option>
                  ))}
                </select>
                {clienteId && (
                  <small className="text-muted mt-1 d-block">
                    ID Cliente seleccionado: {clienteId}
                  </small>
                )}
              </div>

              <div className="mb-3">
                <label>Fecha y Hora</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={fechaHora}
                  onChange={(e) => setFechaHora(e.target.value)}
                  required
                />
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormNuevaCita;


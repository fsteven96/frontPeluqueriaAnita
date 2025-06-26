import React, { useState } from 'react';
import { crearCliente } from '../services/api'; // Asegúrate de tener esta función

const FormNuevoCliente = ({ mostrar, onClose, onClienteAgregado }) => {
  const [Nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    Const nuevoCliente = { nombre, telefono };
    try {
      const creado = await crearCliente(nuevoCliente);
      console.log(creado);
      onClienteAgregado(); // avisamos al padre
      onClose(); // cerramos modal
      setNombre('');
      setTelefono('');
    } catch (error) {
      alert('Error al crear cliente');
    }
  };

  if (!mostrar) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Cliente</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="number"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormNuevoCliente;


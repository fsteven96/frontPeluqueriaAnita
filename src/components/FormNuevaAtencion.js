import React, { useState } from 'react';
import { registrarAtencion } from '../services/api';

const FormNuevaAtencion = ({ onAtencionGuardada, onClose }) => {
  const [citaId, setCitaId] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const guardar = async () => {
    try {
      await registrarAtencion({ citaId, descripcion });
      alert('Atención registrada');
      onAtencionGuardada();  // Notificar que la atención fue guardada
      onClose();  // Cerrar el modal
    } catch (error) {
      alert('Error al registrar la atención');
      console.error(error);
    }
  };

  return (
    <div className="mt-4">
      <h5>Nueva Atención</h5>
      <input
        type="number"
        className="form-control"
        placeholder="ID Cita"
        value={citaId}
        onChange={(e) => setCitaId(e.target.value)}
      />
      <input
        className="form-control mt-2"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={guardar}>Guardar Atención</button>
    </div>
  );
};

export default FormNuevaAtencion;


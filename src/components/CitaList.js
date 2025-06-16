import React, { useState, useEffect } from 'react';
import { obtenerCitasPorCliente, obtenerClientes } from '../services/api';
import FormNuevaCita from './FormNuevaCita';

const CitaList = () => {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [citasFiltradas, setCitasFiltradas] = useState([]);
  const [clienteNombre, setClienteNombre] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  console.log(clientes);
  // Cargar clientes al inicio
  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const data = await obtenerClientes();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      }
    };

    cargarClientes();
  }, []);

  // Cargar citas al inicio
  useEffect(() => {
    const cargarCitas = async () => {
      try {
        const data = await obtenerCitasPorCliente();
        setCitas(data);
        setCitasFiltradas(data);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    };

    cargarCitas();
  }, []);

  // Filtrar citas por nombre de cliente
  useEffect(() => {
    if (clienteNombre) {
      const filtro = clienteNombre.toLowerCase();
      const citasFiltradas = citas.filter(cita =>
        cita.nombreCliente.toLowerCase().includes(filtro)
      );
      setCitasFiltradas(citasFiltradas);
    } else {
      setCitasFiltradas(citas);
    }
  }, [clienteNombre, citas]);

  const handleCitaCreada = () => {
    // Recargar las citas después de agregar una nueva
    const cargarCitas = async () => {
      try {
        const data = await obtenerCitasPorCliente();
        setCitas(data);
        setCitasFiltradas(data);
      } catch (error) {
        console.error('Error al cargar citas:', error);
      }
    };

    cargarCitas();
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Citas por Cliente</h5>
        <button className="btn btn-success" onClick={() => setMostrarModal(true)}>
          + Agregar Cita
        </button>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar cliente por nombre"
          value={clienteNombre}
          onChange={(e) => setClienteNombre(e.target.value)}
        />
        <button className="btn btn-outline-primary" onClick={() => {}}>
          Buscar
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Id Cita</th>
              <th>Nombre Cliente</th>
              <th>Fecha y Hora</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {citasFiltradas.length > 0 ? (
              citasFiltradas.map((cita) => (
                <tr key={cita.id}>
                  <td>{cita.id}</td>
                  <td>{cita.nombreCliente}</td>
                  <td>{new Date(cita.fechaHora).toLocaleString()}</td>
                  <td>{cita.estado}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No hay citas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <FormNuevaCita
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onCitaCreada={handleCitaCreada}
      />
    </div>
  );
};

export default CitaList;


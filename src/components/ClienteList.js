import React, { useEffect, useState } from 'react';
import { obtenerClientes } from '../services/api';
import FormNuevoCliente from './FormNuevoCliente';

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [filtrados, setFiltrados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      const data = await obtenerClientes();
      setClientes(data);
      setFiltrados(data);
    };
    cargar();
  }, []);

  useEffect(() => {
    const resultados = clientes.filter(cliente =>
      cliente.Nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.Telefono.includes(busqueda)
    );
    setFiltrados(resultados);
  }, [busqueda, clientes]);

const handleClienteAgregado = async () => {
  const data = await obtenerClientes();
  setClientes(data);
  setFiltrados(data);
};


  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Clientes</h5>
        <button className="btn btn-primary" onClick={() => setMostrarModal(true)}>
          + Nuevo Cliente
        </button>
      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Buscar por nombre o teléfono..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.length > 0 ? (
              filtrados.map(cliente => (
                <tr key={cliente.Id}>
                  <td>{cliente.Nombre}</td>
                  <td>{cliente.Telefono}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No se encontraron clientes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <FormNuevoCliente
        mostrar={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onClienteAgregado={handleClienteAgregado}
      />
    </div>
  );
};

export default ClienteList;

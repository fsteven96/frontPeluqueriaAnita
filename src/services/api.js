import axios from 'axios';
const API = 'api-anita-peluqueria-fthph6f5ebd8f5bp.brazilsouth-01.azurewebsites.net/api';

export const obtenerClientes = async () => (await axios.get(`${API}/Cliente/todosClientes`)).data;
export const crearCliente = async (cliente) => await axios.post(`${API}/Cliente/agregarCliente`, cliente);

export const obtenerCitasPorCliente = async () => (await axios.get(`${API}/Cita/activas`)).data;
export const agendarCita = async (cita) => {
  console.log('Enviando cita al backend:', cita); 
  return await axios.post(`${API}/Cita`, cita);
};

export const obtenerAtenciones = async (clienteId) => (await axios.get(`${API}/atencion`)).data;
export const registrarAtencion = async (atencion) => await axios.post(`${API}/atencion`, atencion);


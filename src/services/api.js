import axios from 'axios';
const API = 'https://api-anita-peluqueria-fthph6f5ebd8f5bp.brazilsouth-01.azurewebsites.net/api';

export const obtenerClientes = async () => (await axios.get(`${API}/todosClientes`)).data;
export const crearCliente = async (cliente) => await axios.post(`${API}/agregarCliente`, cliente);

export const obtenerCitasPorCliente = async () => (await axios.get(`${API}/citas/activas`)).data;
export const agendarCita = async (cita) => {
  console.log('Enviando cita al backend:', cita); 
  return await axios.post(`https://peluqueriaanita-aqegegejepffavg3.canadacentral-01.azurewebsites.net/api/cita`, cita);
};

export const obtenerAtenciones = async (clienteId) => (await axios.get(`${API}/atenciones`)).data;
export const registrarAtencion = async (atencion) => await axios.post(`${API}/atenciones`, atencion);


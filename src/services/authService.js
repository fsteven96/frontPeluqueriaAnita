import axios from 'axios';

const API_URL = 'https://peluqueriaanita-aqegegejepffavg3.canadacentral-01.azurewebsites.net/api/auth';

export const login = async (UsuarioNombre, PasswordU) => {
  const response = await axios.post(`${API_URL}/login`, {
    UsuarioNombre,
    PasswordU
  });
  return response.data;
};


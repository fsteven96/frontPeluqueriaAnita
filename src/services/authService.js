import axios from 'axios';

const API_URL = 'api-anita-peluqueria-fthph6f5ebd8f5bp.brazilsouth-01.azurewebsites.net/api/auth';

export const login = async (UsuarioNombre, PasswordU) => {
  const response = await axios.post(`${API_URL}/login`, {
    UsuarioNombre,
    PasswordU
  });
  return response.data;
};


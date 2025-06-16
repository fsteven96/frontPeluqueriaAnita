import axios from 'axios';

const API_URL = 'http://localhost:5232/api/auth';

export const login = async (UsuarioNombre, PasswordU) => {
  const response = await axios.post(`${API_URL}/login`, {
    UsuarioNombre,
    PasswordU
  });
  return response.data;
};


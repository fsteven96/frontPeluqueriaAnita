import axios from 'axios';

const API_URL = 'https://api-anita-peluqueria-fthph6f5ebd8f5bp.brazilsouth-01.azurewebsites.net/api';

export const login = async (Usuario, PasswordU) => {
  const response = await axios.post(`${API_URL}/login`, {
    Usuario,
    PasswordU
  });
  return response.data;
};


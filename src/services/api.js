import axios from 'axios';
import env from 'react-native-config';

const api = axios.create({
  baseURL: env.LISTEN_NOTES_API_BASE_URL,
  headers: { 'X-ListenAPI-Key': env.LISTEN_NOTES_API_TOKEN },
});

export default api;

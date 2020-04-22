import axios from 'axios';
import env from 'react-native-config';

export const api = axios.create({
  baseURL: env.LISTEN_NOTES_API_BASE_URL,
  headers: { 'X-ListenAPI-Key': env.LISTEN_NOTES_API_TOKEN },
});

export const apiFirebase = axios.create({
  baseURL: env.FIREBASE_API_BASE_URL,
});

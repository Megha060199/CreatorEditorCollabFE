import axios from 'axios';



console.log(import.meta.env.API_BASE_URL,'apibase')
const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}:${import.meta.env.VITE_PORT}`,
  headers: { 'Content-Type': 'application/json' }
});

console.log(client,'check-CLIENTT')

export default client;

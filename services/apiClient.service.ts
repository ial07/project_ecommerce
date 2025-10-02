// src/services/apiClient.ts
import axios from 'axios';
import https from "https";

// Anggap ini adalah API publik yang akan kita gunakan
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // ⛔ ignore self-signed cert
  }),
});

export default apiClient;

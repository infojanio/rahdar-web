// src/lib/axios.ts
import axios from "axios";

import { env } from "@/env";

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

// Interceptor para incluir token sempre antes da requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Interceptor adicionando token:", token);
  } else {
    console.warn("⚠️ Interceptor: token não encontrado.");
  }

  return config;
});

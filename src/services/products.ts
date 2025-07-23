import axios from "axios";

import { Product } from "@/types/product";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export async function getProducts(): Promise<Product[]> {
  const response = await api.get("/products");
  return response.data;
}

export async function getProductById(id: string): Promise<Product> {
  const response = await api.get(`/products/${id}`);
  return response.data;
}

export async function createProduct(data: Partial<Product>) {
  await api.post("/products", data);
}

export async function updateProduct(id: string, data: Partial<Product>) {
  await api.put(`/products/${id}`, data);
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`);
}

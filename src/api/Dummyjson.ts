
import type { Product } from '../types/models/Product'

export const API_BASE_URL = 'https://dummyjson.com'

export const fetchProducts = async (skip: number = 0, limit: number = 10) => {
  const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json() as Promise<{
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }>
}

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Product with id ${id} not found.`)
    }
    throw new Error('Network response was not ok')
  }
  return await response.json()
}
import type { Product, ProductInput } from '../types/product'

const BASE_URL = '/products'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const headers = options?.body ? { 'Content-Type': 'application/json' } : undefined
  const response = await fetch(url, { headers, ...options })
  const body = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(body?.message ?? 'Terjadi kesalahan pada server')
  }

  return body as T
}

export function getProducts() {
  return request<Product[]>(BASE_URL)
}

export function createProduct(input: ProductInput) {
  return request<Product>(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(input),
  })
}

export function updateProduct(id: number, input: ProductInput) {
  return request<Product>(BASE_URL, {
    method: 'PUT',
    body: JSON.stringify({ id, ...input }),
  })
}

export function deleteProduct(id: number) {
  return request<{ message: string; data: Product }>(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  })
}

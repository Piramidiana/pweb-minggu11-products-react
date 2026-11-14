export interface Product {
  id: number
  name: string
  price: number
  createdAt: string
  updatedAt: string
}

export interface ProductInput {
  name: string
  price: number
}
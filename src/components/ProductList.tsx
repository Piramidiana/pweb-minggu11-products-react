import type { Product } from '../types/product'
import ProductCard from './ProductCard'

interface ProductListProps {
  products: Product[]
  emptyMessage: string
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

function ProductList({ products, emptyMessage, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return <p className="state">{emptyMessage}</p>
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default ProductList
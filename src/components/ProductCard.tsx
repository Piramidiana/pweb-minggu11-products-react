import type { Product } from '../types/product'
import { formatPrice } from '../utils/format-price'

interface ProductCardProps {
  product: Product
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
}

function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <article className="product-card">
      <span className="product-id">ID: {product.id}</span>
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{formatPrice(product.price)}</p>
      <div className="product-actions">
        <button className="btn btn-outline" type="button" onClick={() => onEdit?.(product)}>
          Edit
        </button>
        <button className="btn btn-danger-outline" type="button" onClick={() => onDelete?.(product)}>
          Hapus
        </button>
      </div>
    </article>
  )
}

export default ProductCard
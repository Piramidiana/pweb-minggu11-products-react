import { useEffect, useState } from 'react'
import { getProducts } from './api/products'
import ProductList from './components/ProductList'
import type { Product } from './types/product'
import './App.css'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary" type="button">
          + Tambah Produk
        </button>
      </header>

      {loading && <p className="state">Memuat produk...</p>}
      {error && <p className="state state-error">{error}</p>}

      {!loading && !error && (
        <>
          <p className="count">{products.length} produk</p>
          <ProductList products={products} />
          <p className="footer-note">
            Menampilkan {products.length} dari {products.length} produk
          </p>
        </>
      )}
    </main>
  )
}

export default App
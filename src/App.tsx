import { useEffect, useState } from 'react'
import { getProducts } from './api/products'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import type { Product } from './types/product'
import './App.css'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const keyword = query.trim().toLowerCase()
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(keyword),
  )

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
          <div className="toolbar">
            <SearchBar value={query} onChange={setQuery} />
            <span className="count">{products.length} produk</span>
          </div>
          <ProductList
            products={filteredProducts}
            emptyMessage={products.length === 0 ? 'Belum ada produk.' : 'Produk tidak ditemukan.'}
          />
          <p className="footer-note">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      )}
    </main>
  )
}

export default App

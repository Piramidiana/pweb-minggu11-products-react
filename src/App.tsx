import { useEffect, useState } from 'react'
import { createProduct, getProducts, updateProduct } from './api/products'
import ProductFormModal from './components/ProductFormModal'
import ProductList from './components/ProductList'
import SearchBar from './components/SearchBar'
import type { Product, ProductInput } from './types/product'
import './App.css'

type ModalState = { type: 'add' } | { type: 'edit'; product: Product } | null

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [modal, setModal] = useState<ModalState>(null)

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

  function closeModal() {
    setModal(null)
  }

  async function handleCreate(input: ProductInput) {
    const created = await createProduct(input)
    setProducts((current) => [...current, created])
    closeModal()
  }

  async function handleUpdate(id: number, input: ProductInput) {
    const updated = await updateProduct(id, input)
    setProducts((current) => current.map((product) => (product.id === id ? updated : product)))
    closeModal()
  }

  return (
    <main className="page">
      <header className="page-header">
        <div>
          <h1>Manajemen Produk</h1>
          <p>Kelola daftar produk dan harga dalam satu tempat.</p>
        </div>
        <button className="btn btn-primary" type="button" onClick={() => setModal({ type: 'add' })}>
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
            onEdit={(product) => setModal({ type: 'edit', product })}
          />
          <p className="footer-note">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </>
      )}

      {modal?.type === 'add' && <ProductFormModal onSubmit={handleCreate} onClose={closeModal} />}
      {modal?.type === 'edit' && (
        <ProductFormModal
          product={modal.product}
          onSubmit={(input) => handleUpdate(modal.product.id, input)}
          onClose={closeModal}
        />
      )}
    </main>
  )
}

export default App

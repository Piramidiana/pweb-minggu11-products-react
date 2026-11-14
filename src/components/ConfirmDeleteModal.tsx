import { useState } from 'react'
import type { Product } from '../types/product'
import { formatPrice } from '../utils/format-price'
import Modal from './Modal'

interface ConfirmDeleteModalProps {
  product: Product
  onConfirm: () => Promise<void>
  onClose: () => void
}

function ConfirmDeleteModal({ product, onConfirm, onClose }: ConfirmDeleteModalProps) {
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')

  async function handleConfirm() {
    setDeleting(true)
    setError('')

    try {
      await onConfirm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal menghapus produk')
      setDeleting(false)
    }
  }

  return (
    <Modal title="Hapus Produk?" onClose={onClose}>
      <div className="delete-icon" aria-hidden="true">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M8 6V4h8v2" />
          <path d="M6 6l1 14h10l1-14" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
        </svg>
      </div>
      <h2 className="modal-title modal-title-center">Hapus Produk?</h2>
      <p className="modal-subtitle modal-subtitle-center">
        Produk yang dihapus tidak dapat dikembalikan.
      </p>

      <div className="delete-preview">
        <span className="product-id">ID: {product.id}</span>
        <strong className="delete-preview-name">{product.name}</strong>
        <span className="delete-preview-price">{formatPrice(product.price)}</span>
      </div>

      {error && <p className="form-error">{error}</p>}

      <div className="modal-actions">
        <button className="btn btn-outline" type="button" onClick={onClose} disabled={deleting}>
          Batal
        </button>
        <button className="btn btn-danger" type="button" onClick={handleConfirm} disabled={deleting}>
          {deleting ? 'Menghapus...' : 'Hapus Produk'}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDeleteModal

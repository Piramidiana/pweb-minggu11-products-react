import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Product, ProductInput } from '../types/product'
import Modal from './Modal'

interface ProductFormModalProps {
  product?: Product
  onSubmit: (input: ProductInput) => Promise<void>
  onClose: () => void
}

interface FormErrors {
  name?: string
  price?: string
}

function validate(name: string, price: string): FormErrors {
  const errors: FormErrors = {}
  const priceNumber = Number(price)

  if (name.trim() === '') {
    errors.name = 'Nama produk wajib diisi.'
  }

  if (price.trim() === '' || !Number.isInteger(priceNumber)) {
    errors.price = 'Harga harus berupa angka bulat.'
  } else if (priceNumber <= 0) {
    errors.price = 'Harga harus lebih dari 0.'
  }

  return errors
}

function ProductFormModal({ product, onSubmit, onClose }: ProductFormModalProps) {
  const isEdit = product !== undefined
  const title = isEdit ? 'Edit Produk' : 'Tambah Produk'

  const [name, setName] = useState(product?.name ?? '')
  const [price, setPrice] = useState(product ? String(product.price) : '')
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState('')
  const [saving, setSaving] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(name, price)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setSaving(true)
    setServerError('')

    try {
      await onSubmit({ name: name.trim(), price: Number(price) })
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Gagal menyimpan produk')
      setSaving(false)
    }
  }

  return (
    <Modal title={title} onClose={onClose}>
      <h2 className="modal-title">{title}</h2>
      <p className="modal-subtitle">
        {isEdit ? 'Perbarui informasi produk yang dipilih.' : 'Masukkan informasi produk baru.'}
      </p>
      {product && <p className="modal-id">ID: {product.id}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="product-name">Nama Produk</label>
          <input
            id="product-name"
            type="text"
            placeholder="Contoh: Pulpen"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
          {errors.name && <p className="field-hint field-error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="product-price">Harga (Rp)</label>
          <input
            id="product-price"
            type="text"
            inputMode="numeric"
            placeholder="Contoh: 5000"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <p className={errors.price ? 'field-hint field-error' : 'field-hint'}>
            {errors.price ?? 'Harga harus lebih dari 0.'}
          </p>
        </div>

        {serverError && <p className="form-error">{serverError}</p>}

        <div className="modal-actions">
          <button className="btn btn-outline" type="button" onClick={onClose} disabled={saving}>
            Batal
          </button>
          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? 'Menyimpan...' : isEdit ? 'Simpan Perubahan' : 'Simpan Produk'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default ProductFormModal

export function formatPrice(value: number) {
  return 'Rp' + new Intl.NumberFormat('id-ID').format(value)
}
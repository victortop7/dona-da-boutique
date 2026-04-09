import { CartItem, CheckoutForm } from '../types'
import { formatBRL } from './format'

const WHATSAPP_NUMBER = '5585985656226'

export function buildOrderMessage(items: CartItem[], form: CheckoutForm): string {
  const lines: string[] = []

  lines.push('Olá! Quero fazer um pedido na Dona da Boutique 🛍️')
  lines.push('')
  lines.push('*Meu Pedido:*')

  let total = 0
  for (const item of items) {
    const subtotal = item.product.price * item.quantity
    total += subtotal
    lines.push(
      `• ${item.quantity}x ${item.product.name} — ${item.selectedColor} / ${item.selectedSize} — ${formatBRL(subtotal)}`
    )
  }

  lines.push('')
  lines.push(`*Total: ${formatBRL(total)}*`)
  lines.push('')
  lines.push('*Meus Dados:*')
  lines.push(`Nome: ${form.name}`)
  lines.push(`Telefone: ${form.phone}`)
  if (form.email) lines.push(`E-mail: ${form.email}`)

  const addressParts = [form.address, form.number, form.complement].filter(Boolean).join(', ')
  if (addressParts) lines.push(`Endereço: ${addressParts}`)
  if (form.neighborhood) lines.push(`Bairro: ${form.neighborhood}`)
  if (form.city && form.state) lines.push(`Cidade/Estado: ${form.city}/${form.state}`)
  if (form.cep) lines.push(`CEP: ${form.cep}`)

  const paymentLabels: Record<string, string> = {
    pix: 'PIX',
    cartao: 'Cartão de Crédito',
    boleto: 'Boleto',
  }
  lines.push(`Forma de pagamento: ${paymentLabels[form.paymentMethod] ?? form.paymentMethod}`)

  return lines.join('\n')
}

export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
}

export function openWhatsAppDirect(message: string): void {
  const encoded = encodeURIComponent(message)
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank')
}

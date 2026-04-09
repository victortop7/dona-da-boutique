import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag, ChevronLeft, CreditCard, Barcode, Smartphone } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { CheckoutForm } from '../types'
import { formatBRL } from '../lib/format'
import { buildOrderMessage, openWhatsApp } from '../lib/whatsapp'

const INITIAL_FORM: CheckoutForm = {
  name: '',
  phone: '',
  email: '',
  cep: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  paymentMethod: 'pix',
}

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={48} className="text-blush mx-auto mb-4" />
          <p className="font-serif text-2xl text-gray-600 mb-2">Seu carrinho está vazio</p>
          <Link to="/catalogo" className="btn-primary text-sm mt-4 inline-block">Ver catálogo</Link>
        </div>
      </main>
    )
  }

  const set = (field: keyof CheckoutForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Partial<CheckoutForm> = {}
    if (!form.name.trim()) newErrors.name = 'Campo obrigatório'
    if (!form.phone.trim()) newErrors.phone = 'Campo obrigatório'
    if (!form.cep.trim()) newErrors.cep = 'Campo obrigatório'
    if (!form.address.trim()) newErrors.address = 'Campo obrigatório'
    if (!form.number.trim()) newErrors.number = 'Campo obrigatório'
    if (!form.city.trim()) newErrors.city = 'Campo obrigatório'
    if (!form.state.trim()) newErrors.state = 'Campo obrigatório'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const message = buildOrderMessage(items, form)
    openWhatsApp(message)
    clearCart()
    navigate('/?pedido=ok')
  }

  const shippingFree = totalPrice >= 299
  const pixDiscount = totalPrice * 0.05

  return (
    <main className="min-h-screen bg-nude">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm font-sans text-text-muted hover:text-primary transition-colors mb-4"
          >
            <ChevronLeft size={16} /> Continuar comprando
          </button>
          <h1 className="font-serif text-4xl font-light text-gray-800">Finalizar Pedido</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Personal data */}
            <div className="bg-white border border-border-soft p-6">
              <h2 className="font-serif text-xl font-medium text-gray-800 mb-5">Dados pessoais</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Nome completo *</label>
                  <input className="input-field" value={form.name} onChange={set('name')} placeholder="Seu nome" />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">WhatsApp *</label>
                  <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="(00) 00000-0000" />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label">E-mail</label>
                  <input className="input-field" type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-border-soft p-6">
              <h2 className="font-serif text-xl font-medium text-gray-800 mb-5">Endereço de entrega</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">CEP *</label>
                  <input className="input-field" value={form.cep} onChange={set('cep')} placeholder="00000-000" maxLength={9} />
                  {errors.cep && <p className="text-red-400 text-xs mt-1">{errors.cep}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Endereço (rua/av) *</label>
                  <input className="input-field" value={form.address} onChange={set('address')} placeholder="Rua / Avenida" />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <label className="label">Número *</label>
                  <input className="input-field" value={form.number} onChange={set('number')} placeholder="123" />
                  {errors.number && <p className="text-red-400 text-xs mt-1">{errors.number}</p>}
                </div>
                <div>
                  <label className="label">Complemento</label>
                  <input className="input-field" value={form.complement} onChange={set('complement')} placeholder="Apto, bloco..." />
                </div>
                <div>
                  <label className="label">Bairro</label>
                  <input className="input-field" value={form.neighborhood} onChange={set('neighborhood')} placeholder="Bairro" />
                </div>
                <div>
                  <label className="label">Cidade *</label>
                  <input className="input-field" value={form.city} onChange={set('city')} placeholder="Cidade" />
                  {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="label">Estado *</label>
                  <select className="input-field" value={form.state} onChange={set('state')}>
                    <option value="">Selecione</option>
                    {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white border border-border-soft p-6">
              <h2 className="font-serif text-xl font-medium text-gray-800 mb-5">Forma de pagamento</h2>
              <p className="text-xs font-sans text-text-muted mb-4">
                O pagamento será combinado via WhatsApp após o pedido.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: 'pix', label: 'PIX', icon: Smartphone, sub: '5% de desconto' },
                  { value: 'cartao', label: 'Cartão', icon: CreditCard, sub: 'Até 3x sem juros' },
                  { value: 'boleto', label: 'Boleto', icon: Barcode, sub: 'Vence em 3 dias' },
                ].map(({ value, label, icon: Icon, sub }) => (
                  <label
                    key={value}
                    className={`flex items-center gap-3 p-4 border cursor-pointer transition-all ${
                      form.paymentMethod === value
                        ? 'border-primary bg-blush'
                        : 'border-border-soft hover:border-primary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={value}
                      checked={form.paymentMethod === value}
                      onChange={set('paymentMethod')}
                      className="accent-primary"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Icon size={14} className="text-primary" />
                        <span className="text-sm font-sans font-medium text-gray-700">{label}</span>
                      </div>
                      <span className="text-xs font-sans text-text-muted">{sub}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full text-sm tracking-widest uppercase flex items-center justify-center gap-2 py-4"
            >
              <ShoppingBag size={18} />
              Confirmar pedido via WhatsApp
            </button>

            <p className="text-xs font-sans text-text-muted text-center">
              Ao confirmar, você será redirecionada ao WhatsApp para finalizar o pagamento com nossa equipe.
            </p>
          </form>

          {/* Order summary */}
          <aside className="space-y-4">
            <div className="bg-white border border-border-soft p-5 sticky top-24">
              <h2 className="font-serif text-lg font-medium text-gray-800 mb-4">
                Resumo do pedido
              </h2>

              {/* Items */}
              <div className="space-y-4 mb-5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-14 h-16 flex-shrink-0 bg-nude overflow-hidden">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-sans font-medium text-gray-700 leading-tight">{item.product.name}</p>
                      <p className="text-xs font-sans text-text-muted mt-0.5">
                        {item.selectedColor} · {item.selectedSize} · Qtd {item.quantity}
                      </p>
                      <p className="text-xs font-sans text-primary mt-1 font-medium">
                        {formatBRL(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border-soft pt-4 space-y-2">
                <div className="flex justify-between text-xs font-sans text-text-muted">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
                  <span>{formatBRL(totalPrice)}</span>
                </div>
                {form.paymentMethod === 'pix' && (
                  <div className="flex justify-between text-xs font-sans text-green-600">
                    <span>Desconto PIX (5%)</span>
                    <span>−{formatBRL(pixDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs font-sans text-text-muted">
                  <span>Frete</span>
                  <span className={shippingFree ? 'text-green-600' : ''}>
                    {shippingFree ? 'Grátis' : 'A calcular'}
                  </span>
                </div>
                <div className="flex justify-between font-serif text-lg font-medium text-gray-800 border-t border-border-soft pt-3 mt-3">
                  <span>Total</span>
                  <span className="text-primary">
                    {formatBRL(form.paymentMethod === 'pix' ? totalPrice - pixDiscount : totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

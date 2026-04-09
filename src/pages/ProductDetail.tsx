import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ShoppingBag, Truck, RefreshCw, MessageCircle } from 'lucide-react'
import { products } from '../data/products'
import { categoryLabels } from '../data/products'
import { formatBRL } from '../lib/format'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const product = products.find((p) => p.id === id)

  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [error, setError] = useState('')

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-serif text-3xl text-gray-400 mb-4">Produto não encontrado</p>
          <Link to="/catalogo" className="btn-primary text-sm">Ver catálogo</Link>
        </div>
      </main>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    if (!selectedColor) { setError('Selecione uma cor'); return }
    if (!selectedSize) { setError('Selecione um tamanho'); return }
    setError('')
    addItem(product, selectedColor, selectedSize, quantity)
  }

  const handleBuyWhatsApp = () => {
    const msg = `Olá! Tenho interesse no produto:\n\n*${product.name}*\nCor: ${selectedColor || 'a confirmar'}\nTamanho: ${selectedSize || 'a confirmar'}\nQuantidade: ${quantity}\n\nPreço: ${formatBRL(product.price * quantity)}\n\nPoderia me dar mais informações? 🛍️`
    window.open(`https://wa.me/5585985656226?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-xs font-sans text-text-muted">
          <Link to="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
          <span>/</span>
          <Link to={`/catalogo?categoria=${product.category}`} className="hover:text-primary transition-colors">
            {categoryLabels[product.category]}
          </Link>
          <span>/</span>
          <span className="text-gray-600">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-sm font-sans text-text-muted hover:text-primary transition-colors mb-6"
        >
          <ChevronLeft size={16} /> Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-[4/5] bg-nude overflow-hidden">
              <img
                src={product.images[activeImage] ?? product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-16 h-20 overflow-hidden border-2 transition-colors ${
                      activeImage === i ? 'border-primary' : 'border-border-soft'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-3">
              {product.isNew && (
                <span className="text-xs font-sans bg-primary text-white px-2.5 py-1 uppercase tracking-wider">
                  Novidade
                </span>
              )}
              <span className="text-xs font-sans bg-blush text-primary px-2.5 py-1 uppercase tracking-wider">
                {categoryLabels[product.category]}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-light text-gray-800 mb-2">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-1">
              <span className="font-serif text-3xl text-primary font-medium">
                {formatBRL(product.price)}
              </span>
            </div>
            <p className="text-sm font-sans text-text-muted mb-6">
              Em até 3x de {formatBRL(product.price / 3)} sem juros
              &nbsp;·&nbsp; ou no PIX com 5% de desconto
            </p>

            {/* Atacado hint */}
            <div className="bg-blush border border-primary/20 px-4 py-3 mb-6 text-sm font-sans text-primary">
              Lojista? Atacado a partir de 10 peças por{' '}
              <strong>{formatBRL(product.priceAtacado)}</strong> cada.{' '}
              <Link to="/atacado" className="underline underline-offset-2">Saiba mais</Link>
            </div>

            {/* Color */}
            <div className="mb-5">
              <label className="label">Cor {selectedColor && <span className="normal-case font-normal text-gray-600">— {selectedColor}</span>}</label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedColor(c); setError('') }}
                    title={c}
                    className={`px-3 py-1.5 text-xs font-sans border transition-all ${
                      selectedColor === c
                        ? 'border-primary text-primary bg-blush'
                        : 'border-border-soft text-text-muted hover:border-primary'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-5">
              <label className="label">Tamanho</label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSelectedSize(s); setError('') }}
                    className={`w-12 h-10 text-sm font-sans border transition-all ${
                      selectedSize === s
                        ? 'border-primary text-primary bg-blush font-medium'
                        : 'border-border-soft text-text-muted hover:border-primary'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mb-6">
              <label className="label">Quantidade</label>
              <div className="flex items-center border border-border-soft w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-2.5 text-text-muted hover:text-primary transition-colors"
                >
                  −
                </button>
                <span className="px-5 py-2.5 font-sans text-sm font-medium text-gray-700 border-x border-border-soft">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-4 py-2.5 text-text-muted hover:text-primary transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs font-sans mb-3">{error}</p>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm tracking-widest uppercase"
              >
                <ShoppingBag size={16} />
                Adicionar ao carrinho
              </button>
              <button
                onClick={handleBuyWhatsApp}
                className="flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-50 px-5 py-3 text-sm font-sans font-medium transition-colors"
              >
                <MessageCircle size={16} />
                Comprar via WhatsApp
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-border-soft pt-6">
              <h3 className="font-serif text-lg font-medium text-gray-700 mb-2">Descrição</h3>
              <p className="text-sm font-sans text-text-muted leading-relaxed">{product.description}</p>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              {[
                { icon: Truck, text: 'Frete grátis acima de R$ 299' },
                { icon: RefreshCw, text: 'Troca em até 30 dias' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs font-sans text-text-muted">
                  <Icon size={14} className="text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="font-serif text-3xl font-light text-gray-800 mb-8">
              Você também pode gostar
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

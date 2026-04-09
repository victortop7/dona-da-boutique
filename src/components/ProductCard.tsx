import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { Product } from '../types'
import { formatBRL } from '../lib/format'
import { useCart } from '../context/CartContext'

interface ProductCardProps {
  product: Product
  style?: React.CSSProperties
}

export default function ProductCard({ product, style }: ProductCardProps) {
  const { addItem } = useCart()

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    const defaultColor = product.colors[0]
    const defaultSize = product.sizes[0]
    addItem(product, defaultColor, defaultSize, 1)
  }

  return (
    <Link
      to={`/produto/${product.id}`}
      className="group block bg-white border border-border-soft hover:shadow-card transition-all duration-300"
      style={style}
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-nude">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-primary text-white text-xs font-sans px-2 py-0.5 tracking-wider uppercase">
              Novo
            </span>
          )}
        </div>

        {/* Quick add */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 bg-white text-primary border border-primary text-xs font-sans font-medium tracking-widest uppercase px-4 py-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-primary hover:text-white"
        >
          <ShoppingBag size={14} />
          Adicionar
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs font-sans text-text-muted uppercase tracking-widest mb-1">
          {categoryLabel(product.category)}
        </p>
        <h3 className="font-serif text-base font-medium text-gray-800 leading-tight mb-2">
          {product.name}
        </h3>

        {/* Colors preview */}
        <div className="flex gap-1 mb-3">
          {product.colors.slice(0, 4).map((c) => (
            <span
              key={c}
              title={c}
              className="w-3.5 h-3.5 rounded-full border border-border-soft"
              style={{ background: colorToHex(c) }}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-text-muted font-sans">+{product.colors.length - 4}</span>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg font-medium text-primary">{formatBRL(product.price)}</span>
          <span className="text-xs font-sans text-text-muted">
            ou 3x de {formatBRL(product.price / 3)}
          </span>
        </div>
      </div>
    </Link>
  )
}

function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    short: 'Short',
    body: 'Body',
    tshirt: 'T-Shirt',
    calca: 'Calça',
    conjunto: 'Conjunto',
    acessorio: 'Acessório',
  }
  return map[cat] ?? cat
}

function colorToHex(name: string): string {
  const map: Record<string, string> = {
    Preto: '#1a1a1a',
    Branco: '#ffffff',
    Rosa: '#f4a0b0',
    'Rosa Antigo': '#c4909a',
    'Rosa Claro': '#f8d0d8',
    Nude: '#e8cfc0',
    Caramelo: '#c4905a',
    Verde: '#6a9a7a',
    Cinza: '#909090',
    'Cinza Mescla': '#a0a0a0',
    Azul: '#607090',
    Marinho: '#202850',
    Vinho: '#802040',
    Amarelo: '#f0c040',
    Natural: '#d0b890',
    'Natural com Alça Rosa': '#e8c8b0',
  }
  return map[name] ?? '#e0d0d4'
}

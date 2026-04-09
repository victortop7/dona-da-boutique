import { Link } from 'react-router-dom'
import { ArrowRight, Truck, RefreshCw, ShieldCheck } from 'lucide-react'
import { products } from '../data/products'
import { Category } from '../types'
import ProductCard from '../components/ProductCard'

const categories: { key: Category; label: string; color: string }[] = [
  { key: 'short', label: 'Shorts', color: '#F2D4D8' },
  { key: 'body', label: 'Bodies', color: '#E8D4F0' },
  { key: 'tshirt', label: 'T-Shirts', color: '#D4EAF0' },
  { key: 'calca', label: 'Calças', color: '#D4F0E4' },
  { key: 'conjunto', label: 'Conjuntos', color: '#F0EAD4' },
  { key: 'acessorio', label: 'Acessórios', color: '#F0D4E8' },
]

const featured = products.filter((p) => p.featured).slice(0, 8)
const newArrivals = products.filter((p) => p.isNew).slice(0, 4)

export default function Home() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="bg-nude min-h-[72vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <p className="text-xs font-sans text-primary uppercase tracking-[0.3em] mb-4">
                Nova coleção disponível
              </p>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-gray-800 leading-tight mb-6">
                Elegância<br />
                <em className="text-primary not-italic">em cada peça</em>
              </h1>
              <p className="font-sans text-text-muted text-lg leading-relaxed mb-8 max-w-md">
                Moda feminina de qualidade para atacado e varejo. Shorts, bodies, conjuntos e muito mais — para você que tem estilo.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/catalogo" className="btn-primary text-sm tracking-widest uppercase">
                  Ver catálogo
                </Link>
                <Link to="/atacado" className="btn-outline text-sm tracking-widest uppercase">
                  Comprar no atacado
                </Link>
              </div>
            </div>

            {/* Hero image grid */}
            <div className="grid grid-cols-2 gap-3 h-[480px]">
              <div className="bg-blush rounded-sm overflow-hidden">
                <img
                  src="https://placehold.co/300x480/F2D4D8/C4909A?text=Coleção"
                  alt="Coleção"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-primary/10 rounded-sm overflow-hidden flex-1">
                  <img
                    src="https://placehold.co/300x230/EAD8DB/a67580?text=Novidade"
                    alt="Novidade"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-nude rounded-sm overflow-hidden flex-1">
                  <img
                    src="https://placehold.co/300x230/F9F1F0/C4909A?text=Atacado"
                    alt="Atacado"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VANTAGENS ────────────────────────────────────────────────── */}
      <section className="border-y border-border-soft bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Truck, text: 'Frete grátis acima de R$ 299' },
              { icon: RefreshCw, text: 'Troca em até 30 dias' },
              { icon: ShieldCheck, text: 'Compra 100% segura' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center justify-center gap-3">
                <Icon size={18} className="text-primary flex-shrink-0" />
                <span className="text-sm font-sans text-text-muted tracking-wide">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ───────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-sans text-primary uppercase tracking-[0.3em] mb-2">Explore</p>
            <h2 className="font-serif text-4xl font-light text-gray-800">Categorias</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(({ key, label, color }) => (
              <Link
                key={key}
                to={`/catalogo?categoria=${key}`}
                className="group flex flex-col items-center gap-3 p-4 border border-border-soft hover:border-primary hover:shadow-soft transition-all duration-200"
              >
                <div
                  className="w-16 h-16 flex items-center justify-center text-2xl"
                  style={{ background: color }}
                >
                  {categoryEmoji(key)}
                </div>
                <span className="text-xs font-sans text-text-muted uppercase tracking-widest group-hover:text-primary transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOVIDADES ────────────────────────────────────────────────── */}
      <section className="py-16 bg-nude">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-sans text-primary uppercase tracking-[0.3em] mb-2">Acabou de chegar</p>
              <h2 className="font-serif text-4xl font-light text-gray-800">Novidades</h2>
            </div>
            <Link
              to="/catalogo?novidades=true"
              className="hidden sm:flex items-center gap-1 text-sm font-sans text-primary hover:gap-2 transition-all"
            >
              Ver tudo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {newArrivals.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                style={{ animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div className="text-center mt-6 sm:hidden">
            <Link to="/catalogo?novidades=true" className="btn-ghost text-sm">
              Ver todas as novidades <ArrowRight size={14} className="inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── DESTAQUE ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-sans text-primary uppercase tracking-[0.3em] mb-2">Mais vendidos</p>
              <h2 className="font-serif text-4xl font-light text-gray-800">Em destaque</h2>
            </div>
            <Link
              to="/catalogo"
              className="hidden sm:flex items-center gap-1 text-sm font-sans text-primary hover:gap-2 transition-all"
            >
              Ver catálogo completo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {featured.map((p, i) => (
              <ProductCard
                key={p.id}
                product={p}
                style={{ animationDelay: `${i * 0.06}s` }}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/catalogo" className="btn-outline text-sm tracking-widest uppercase">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* ── BANNER ATACADO ───────────────────────────────────────────── */}
      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-sans text-white/70 uppercase tracking-[0.3em] mb-3">Para lojistas</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white mb-4">
            Compre no Atacado
          </h2>
          <p className="font-sans text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Mínimo de 10 peças. Preços especiais para revenda com os melhores produtos da Dona da Boutique.
          </p>
          <Link
            to="/atacado"
            className="inline-block bg-white text-primary font-sans font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-nude transition-colors"
          >
            Saiba mais sobre o atacado
          </Link>
        </div>
      </section>
    </main>
  )
}

function categoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    short: '🩳',
    body: '👙',
    tshirt: '👕',
    calca: '👖',
    conjunto: '✨',
    acessorio: '👜',
  }
  return map[cat] ?? '🛍️'
}

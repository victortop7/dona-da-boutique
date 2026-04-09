import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { products, categoryLabels } from '../data/products'
import { Category } from '../types'
import ProductCard from '../components/ProductCard'

const ALL_CATEGORIES: { key: Category | 'todos'; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'short', label: 'Shorts' },
  { key: 'body', label: 'Bodies' },
  { key: 'tshirt', label: 'T-Shirts' },
  { key: 'calca', label: 'Calças' },
  { key: 'conjunto', label: 'Conjuntos' },
  { key: 'acessorio', label: 'Acessórios' },
]

const SORT_OPTIONS = [
  { value: 'relevancia', label: 'Relevância' },
  { value: 'menor-preco', label: 'Menor preço' },
  { value: 'maior-preco', label: 'Maior preço' },
  { value: 'novidades', label: 'Novidades' },
]

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = (searchParams.get('categoria') as Category) ?? 'todos'
  const [activeCategory, setActiveCategory] = useState<Category | 'todos'>(initialCategory)
  const [sort, setSort] = useState('relevancia')
  const [search, setSearch] = useState('')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCategory !== 'todos') {
      list = list.filter((p) => p.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          categoryLabels[p.category]?.toLowerCase().includes(q)
      )
    }

    if (sort === 'menor-preco') list.sort((a, b) => a.price - b.price)
    else if (sort === 'maior-preco') list.sort((a, b) => b.price - a.price)
    else if (sort === 'novidades') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

    return list
  }, [activeCategory, sort, search])

  const handleCategoryClick = (cat: Category | 'todos') => {
    setActiveCategory(cat)
    if (cat !== 'todos') setSearchParams({ categoria: cat })
    else setSearchParams({})
    setMobileFilterOpen(false)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-nude border-b border-border-soft py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-sans text-primary uppercase tracking-[0.3em] mb-2">Loja</p>
          <h1 className="font-serif text-4xl font-light text-gray-800">Catálogo</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Search */}
          <input
            type="text"
            placeholder="Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field max-w-xs text-sm"
          />

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field text-sm py-2 pr-8 cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>

            {/* Mobile filter toggle */}
            <button
              className="lg:hidden flex items-center gap-2 text-sm font-sans text-text-muted border border-border-soft px-3 py-2 hover:border-primary hover:text-primary transition-colors"
              onClick={() => setMobileFilterOpen((o) => !o)}
            >
              <SlidersHorizontal size={15} />
              Filtrar
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs font-sans text-text-muted uppercase tracking-widest mb-4">Categorias</p>
              <ul className="space-y-1">
                {ALL_CATEGORIES.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      onClick={() => handleCategoryClick(key)}
                      className={`w-full text-left text-sm font-sans px-3 py-2 transition-colors ${
                        activeCategory === key
                          ? 'text-primary bg-blush font-medium'
                          : 'text-text-muted hover:text-primary hover:bg-nude'
                      }`}
                    >
                      {label}
                      <span className="ml-1 text-xs text-text-muted">
                        ({key === 'todos' ? products.length : products.filter((p) => p.category === key).length})
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Mobile filter */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl">Filtros</h3>
                <button onClick={() => setMobileFilterOpen(false)}><X size={20} /></button>
              </div>
              <p className="text-xs font-sans text-text-muted uppercase tracking-widest mb-4">Categorias</p>
              <ul className="space-y-2">
                {ALL_CATEGORIES.map(({ key, label }) => (
                  <li key={key}>
                    <button
                      onClick={() => handleCategoryClick(key)}
                      className={`w-full text-left text-sm font-sans px-3 py-3 border transition-colors ${
                        activeCategory === key
                          ? 'text-primary border-primary bg-blush'
                          : 'text-text-muted border-border-soft hover:border-primary'
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {/* Active filters */}
            {activeCategory !== 'todos' && (
              <div className="flex items-center gap-2 mb-5">
                <span className="text-xs font-sans text-text-muted">Filtrando por:</span>
                <span className="flex items-center gap-1 text-xs font-sans bg-blush text-primary px-3 py-1.5">
                  {categoryLabels[activeCategory]}
                  <button onClick={() => handleCategoryClick('todos')}>
                    <X size={12} />
                  </button>
                </span>
              </div>
            )}

            <p className="text-xs font-sans text-text-muted mb-6">
              {filtered.length} {filtered.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-gray-500 mb-2">Nenhum produto encontrado</p>
                <p className="text-sm font-sans text-text-muted">Tente outra categoria ou termo de busca</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((p, i) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    style={{ animationDelay: `${(i % 12) * 0.05}s` }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

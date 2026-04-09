import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/catalogo', label: 'Catálogo' },
  { to: '/atacado', label: 'Atacado' },
]

export default function Header() {
  const { totalItems, openDrawer } = useCart()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border-soft shadow-soft">
      {/* Announcement bar */}
      <div className="bg-primary text-white text-center py-2 px-4 text-xs font-sans tracking-widest uppercase">
        Frete grátis acima de R$ 299 &nbsp;·&nbsp; Atacado mínimo 10 peças
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-text-muted hover:text-primary transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <Logo className="h-20 w-auto" />
          </Link>

          {/* Nav — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-sans tracking-widest uppercase transition-colors duration-200 ${
                  location.pathname === link.to
                    ? 'text-primary border-b border-primary pb-0.5'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart button */}
          <button
            onClick={openDrawer}
            className="relative p-2 text-text-muted hover:text-primary transition-colors"
            aria-label="Carrinho"
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-sans font-medium">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-border-soft px-6 py-4 fade-in">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-sans tracking-widest uppercase py-1 transition-colors ${
                  location.pathname === link.to
                    ? 'text-primary'
                    : 'text-text-muted hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

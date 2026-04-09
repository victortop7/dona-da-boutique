import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Logo from './Logo'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-nude border-t border-border-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Logo className="h-20 w-auto mb-4" />
            <p className="text-sm font-sans text-text-muted leading-relaxed max-w-xs">
              Moda feminina com qualidade e elegância. Atendemos varejo e atacado com as melhores peças da temporada.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.instagram.com/donadaboutique/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border-soft hover:border-primary hover:text-primary text-text-muted transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/5585985656226"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border-soft hover:border-primary hover:text-primary text-text-muted transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-700 mb-4">Navegação</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Início' },
                { to: '/catalogo', label: 'Catálogo' },
                { to: '/atacado', label: 'Atacado' },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm font-sans text-text-muted hover:text-primary transition-colors tracking-wide"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-lg font-medium text-gray-700 mb-4">Contato</h4>
            <ul className="space-y-3 text-sm font-sans text-text-muted">
              <li>
                <a
                  href="https://wa.me/5585985656226"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  (85) 98565-6226
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/donadaboutique/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @donadaboutique
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs font-sans text-text-muted uppercase tracking-widest mb-2">
                Pagamentos aceitos
              </p>
              <div className="flex gap-2 flex-wrap">
                {['PIX', 'Crédito', 'Débito', 'Boleto'].map((m) => (
                  <span
                    key={m}
                    className="text-xs font-sans border border-border-soft px-2.5 py-1 text-text-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border-soft flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs font-sans text-text-muted">
            © {new Date().getFullYear()} Dona da Boutique. Todos os direitos reservados.
          </p>
          <p className="text-xs font-sans text-text-muted">
            Atacado · Varejo · Moda Feminina
          </p>
        </div>
      </div>
    </footer>
  )
}

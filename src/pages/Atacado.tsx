import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, MessageCircle, Package, Tag, Zap } from 'lucide-react'
import { products, categoryLabels } from '../data/products'
import { formatBRL } from '../lib/format'
import { openWhatsAppDirect } from '../lib/whatsapp'

const BENEFITS = [
  {
    icon: Tag,
    title: 'Preços especiais',
    desc: 'Até 35% abaixo do preço varejo para garantir sua margem de lucro.',
  },
  {
    icon: Package,
    title: 'Mínimo de 10 peças',
    desc: 'Pedido mínimo de 10 peças por coleção. Mix de cores e tamanhos disponível.',
  },
  {
    icon: Zap,
    title: 'Entrega ágil',
    desc: 'Envio para todo o Brasil via transportadora com rastreamento.',
  },
  {
    icon: CheckCircle,
    title: 'Qualidade garantida',
    desc: 'Tecidos selecionados e acabamento impecável em cada peça.',
  },
]

export default function Atacado() {
  const [form, setForm] = useState({ name: '', store: '', city: '', phone: '', interest: '' })
  const [sent, setSent] = useState(false)

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return

    const msg = [
      'Olá! Tenho interesse em comprar no atacado pela Dona da Boutique 🛍️',
      '',
      `*Nome:* ${form.name}`,
      form.store ? `*Loja/Empresa:* ${form.store}` : '',
      form.city ? `*Cidade:* ${form.city}` : '',
      `*WhatsApp:* ${form.phone}`,
      form.interest ? `*Interesse:* ${form.interest}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    openWhatsAppDirect(msg)
    setSent(true)
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-primary py-20 text-center px-4">
        <p className="text-xs font-sans text-white/70 uppercase tracking-[0.3em] mb-3">Para lojistas</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-light text-white mb-4">Atacado</h1>
        <p className="font-sans text-white/80 text-lg max-w-xl mx-auto mb-8">
          Revenda as melhores peças da Dona da Boutique com preços exclusivos para lojistas. Mínimo de 10 peças.
        </p>
        <a href="#contato" className="inline-block bg-white text-primary font-sans font-medium text-sm tracking-widest uppercase px-8 py-4 hover:bg-nude transition-colors">
          Quero comprar no atacado
        </a>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-nude">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-light text-gray-800">Por que comprar conosco?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-border-soft p-6 text-center">
                <div className="w-12 h-12 bg-blush flex items-center justify-center mx-auto mb-4">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium text-gray-800 mb-2">{title}</h3>
                <p className="text-xs font-sans text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-light text-gray-800">Como funciona</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Fale conosco', desc: 'Preencha o formulário abaixo ou nos chame no WhatsApp.' },
              { step: '02', title: 'Monte seu pedido', desc: 'Nossa equipe te apresenta o catálogo e você escolhe as peças. Mínimo de 10 peças.' },
              { step: '03', title: 'Receba e revenda', desc: 'Confirmado o pagamento, enviamos para todo o Brasil.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="font-serif text-5xl text-primary/20 font-light mb-2">{step}</div>
                <h3 className="font-serif text-xl font-medium text-gray-800 mb-2">{title}</h3>
                <p className="text-sm font-sans text-text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price table */}
      <section className="py-16 bg-nude">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-light text-gray-800 mb-2">Tabela de preços</h2>
            <p className="text-sm font-sans text-text-muted">Preços por unidade a partir de 10 peças</p>
          </div>
          <div className="bg-white border border-border-soft overflow-hidden">
            <table className="w-full">
              <thead className="bg-blush">
                <tr>
                  <th className="text-left text-xs font-sans text-text-muted uppercase tracking-widest px-5 py-4">Produto</th>
                  <th className="text-right text-xs font-sans text-text-muted uppercase tracking-widest px-5 py-4">Varejo</th>
                  <th className="text-right text-xs font-sans text-primary uppercase tracking-widest px-5 py-4">Atacado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-nude transition-colors">
                    <td className="px-5 py-4">
                      <p className="text-sm font-sans font-medium text-gray-700">{p.name}</p>
                      <p className="text-xs font-sans text-text-muted">{categoryLabels[p.category]}</p>
                    </td>
                    <td className="px-5 py-4 text-right text-sm font-sans text-text-muted line-through">
                      {formatBRL(p.price)}
                    </td>
                    <td className="px-5 py-4 text-right font-serif text-primary font-medium">
                      {formatBRL(p.priceAtacado)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section id="contato" className="py-16 bg-white">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-4xl font-light text-gray-800 mb-2">Quero comprar no atacado</h2>
            <p className="text-sm font-sans text-text-muted">Preencha abaixo e nossa equipe entra em contato.</p>
          </div>

          {sent ? (
            <div className="bg-blush border border-primary/20 p-8 text-center">
              <CheckCircle size={40} className="text-primary mx-auto mb-3" />
              <p className="font-serif text-2xl text-gray-800 mb-1">Mensagem enviada!</p>
              <p className="text-sm font-sans text-text-muted">
                Você foi redirecionada ao nosso WhatsApp. Nossa equipe vai te atender em breve.
              </p>
              <Link to="/" className="btn-primary text-sm mt-5 inline-block">Voltar ao início</Link>
            </div>
          ) : (
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="label">Nome *</label>
                <input className="input-field" value={form.name} onChange={set('name')} placeholder="Seu nome completo" required />
              </div>
              <div>
                <label className="label">Loja / Empresa</label>
                <input className="input-field" value={form.store} onChange={set('store')} placeholder="Nome da loja (opcional)" />
              </div>
              <div>
                <label className="label">Cidade / Estado</label>
                <input className="input-field" value={form.city} onChange={set('city')} placeholder="Ex: Fortaleza/CE" />
              </div>
              <div>
                <label className="label">WhatsApp *</label>
                <input className="input-field" value={form.phone} onChange={set('phone')} placeholder="(00) 00000-0000" required />
              </div>
              <div>
                <label className="label">Quais produtos te interessam?</label>
                <select className="input-field" value={form.interest} onChange={set('interest')}>
                  <option value="">Todos os produtos</option>
                  <option value="Shorts Alfaiataria">Shorts Alfaiataria</option>
                  <option value="Bodies Poliamida">Bodies Poliamida</option>
                  <option value="T-Shirts">T-Shirts</option>
                  <option value="Calças">Calças</option>
                  <option value="Conjuntos">Conjuntos</option>
                  <option value="Acessórios">Acessórios</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 text-sm tracking-widest uppercase py-4 mt-2"
              >
                <MessageCircle size={16} />
                Enviar mensagem no WhatsApp
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

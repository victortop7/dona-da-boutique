import { X, Trash2, ShoppingBag, Minus, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatBRL } from '../lib/format'

export default function CartDrawer() {
  const { items, drawerOpen, closeDrawer, removeItem, updateQty, totalPrice, totalItems } = useCart()

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-50 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border-soft">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="font-serif text-xl font-medium text-gray-800">
              Carrinho
              {totalItems > 0 && (
                <span className="ml-2 text-sm font-sans text-text-muted">({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>
              )}
            </h2>
          </div>
          <button onClick={closeDrawer} className="p-2 hover:text-primary text-text-muted transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={48} className="text-blush" />
              <div>
                <p className="font-serif text-xl text-gray-600 mb-1">Seu carrinho está vazio</p>
                <p className="text-sm font-sans text-text-muted">Adicione peças incríveis ao seu carrinho</p>
              </div>
              <button
                onClick={closeDrawer}
                className="btn-outline text-sm mt-2"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}-${idx}`} className="flex gap-4">
                  {/* Image */}
                  <div className="w-20 h-24 flex-shrink-0 bg-nude overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium text-gray-800 leading-tight mb-0.5">
                      {item.product.name}
                    </h4>
                    <p className="text-xs font-sans text-text-muted mb-2">
                      {item.selectedColor} · {item.selectedSize}
                    </p>
                    <p className="font-serif text-primary font-medium text-sm mb-3">
                      {formatBRL(item.product.price * item.quantity)}
                    </p>

                    {/* Qty + remove */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border-soft">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? updateQty(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)
                              : removeItem(item.product.id, item.selectedColor, item.selectedSize)
                          }
                          className="p-1.5 hover:text-primary text-text-muted transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm font-sans font-medium text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)
                          }
                          className="p-1.5 hover:text-primary text-text-muted transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                        className="p-1.5 hover:text-red-400 text-text-muted transition-colors"
                        aria-label="Remover"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-soft px-6 py-5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-sans text-sm text-text-muted">Subtotal</span>
              <span className="font-serif text-lg font-medium text-primary">{formatBRL(totalPrice)}</span>
            </div>
            <p className="text-xs font-sans text-text-muted">
              Frete calculado no checkout
            </p>
            <Link
              to="/checkout"
              onClick={closeDrawer}
              className="btn-primary w-full text-center block text-sm tracking-widest uppercase"
            >
              Finalizar compra
            </Link>
            <button
              onClick={closeDrawer}
              className="w-full text-center text-sm font-sans text-text-muted hover:text-primary transition-colors py-1"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}

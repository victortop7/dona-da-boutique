import { createContext, useContext, useEffect, useReducer, useState, ReactNode } from 'react'
import { CartItem, Product } from '../types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; item: CartItem }
  | { type: 'REMOVE'; productId: string; color: string; size: string }
  | { type: 'UPDATE_QTY'; productId: string; color: string; size: string; quantity: number }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.findIndex(
        (i) =>
          i.product.id === action.item.product.id &&
          i.selectedColor === action.item.selectedColor &&
          i.selectedSize === action.item.selectedSize
      )
      if (existing >= 0) {
        const updated = [...state.items]
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.item.quantity,
        }
        return { items: updated }
      }
      return { items: [...state.items, action.item] }
    }
    case 'REMOVE':
      return {
        items: state.items.filter(
          (i) =>
            !(
              i.product.id === action.productId &&
              i.selectedColor === action.color &&
              i.selectedSize === action.size
            )
        ),
      }
    case 'UPDATE_QTY': {
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId &&
          i.selectedColor === action.color &&
          i.selectedSize === action.size
            ? { ...i, quantity: action.quantity }
            : i
        ),
      }
    }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  drawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
  addItem: (product: Product, color: string, size: string, quantity?: number) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQty: (productId: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'dona-boutique-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? (JSON.parse(saved) as CartState) : { items: [] }
    } catch {
      return { items: [] }
    }
  })

  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addItem = (product: Product, color: string, size: string, quantity = 1) => {
    dispatch({ type: 'ADD', item: { product, quantity, selectedColor: color, selectedSize: size } })
    setDrawerOpen(true)
  }

  const removeItem = (productId: string, color: string, size: string) =>
    dispatch({ type: 'REMOVE', productId, color, size })

  const updateQty = (productId: string, color: string, size: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QTY', productId, color, size, quantity })

  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

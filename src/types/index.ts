export type Category = 'short' | 'body' | 'tshirt' | 'calca' | 'conjunto' | 'acessorio'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  priceAtacado: number
  description: string
  colors: string[]
  sizes: string[]
  images: string[]
  featured?: boolean
  isNew?: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  selectedColor: string
  selectedSize: string
}

export interface CheckoutForm {
  name: string
  phone: string
  email: string
  cep: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  paymentMethod: 'pix' | 'cartao' | 'boleto'
}

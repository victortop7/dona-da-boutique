import { MessageCircle } from 'lucide-react'

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/5585985656226?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Dona%20da%20Boutique%20%F0%9F%9B%8D%EF%B8%8F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  )
}

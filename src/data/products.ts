import { Product } from '../types'

const img = (_slug: string, color = 'F2D4D8', text = 'Produto') =>
  `https://placehold.co/480x600/${color}/a67580?text=${encodeURIComponent(text)}`

export const products: Product[] = [
  // ── SHORTS ALFAIATARIA ──────────────────────────────────────────────
  {
    id: 'short-alfaiataria-classico',
    name: 'Short Alfaiataria Clássico',
    category: 'short',
    price: 89.9,
    priceAtacado: 62.0,
    description:
      'Short alfaiataria de tecido fluido com bolsos laterais. Acabamento impecável e caimento sofisticado. Ideal para o dia a dia e ocasiões especiais.',
    colors: ['Preto', 'Nude', 'Rosa', 'Branco'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('short-classico-1', 'F2D4D8', 'Short Alfaiataria'), img('short-classico-2', 'EAD8DB', 'Short Alfaiataria')],
    featured: true,
    isNew: true,
  },
  {
    id: 'short-alfaiataria-cargo',
    name: 'Short Alfaiataria Cargo',
    category: 'short',
    price: 99.9,
    priceAtacado: 70.0,
    description:
      'Short alfaiataria estilo cargo com bolsos frontais e laterais. Tecido leve com queda perfeita. Peça versátil para looks modernos.',
    colors: ['Caramelo', 'Verde', 'Cinza', 'Preto'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('short-cargo-1', 'D4C4A0', 'Short Cargo'), img('short-cargo-2', 'C4D4A0', 'Short Cargo')],
    featured: true,
  },
  {
    id: 'short-alfaiataria-clochard',
    name: 'Short Alfaiataria Clochard',
    category: 'short',
    price: 94.9,
    priceAtacado: 66.0,
    description:
      'Short alfaiataria modelo clochard com elástico na cintura. Tecido fluido de alta qualidade com caimento impecável.',
    colors: ['Preto', 'Branco', 'Rosa Antigo'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('short-clochard', 'EDD8DC', 'Short Clochard')],
    isNew: true,
  },

  // ── BODIES POLIAMIDA ────────────────────────────────────────────────
  {
    id: 'body-ribana-manga-longa',
    name: 'Body Ribana Manga Longa',
    category: 'body',
    price: 59.9,
    priceAtacado: 40.0,
    description:
      'Body de poliamida com tecido ribana de alta qualidade. Manga longa, decote redondo e fecho com botões na parte inferior. Confortável e elegante.',
    colors: ['Preto', 'Branco', 'Rosa', 'Nude', 'Cinza'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('body-manga-longa', 'D8D0EC', 'Body Ribana'), img('body-manga-longa-2', 'D0D8EC', 'Body Ribana')],
    featured: true,
    isNew: true,
  },
  {
    id: 'body-decote-v',
    name: 'Body Poliamida Decote V',
    category: 'body',
    price: 49.9,
    priceAtacado: 34.0,
    description:
      'Body de poliamida com decote em V e alças finas. Tecido macio com leve toque acetinado. Perfeito para combinar com calças e saias.',
    colors: ['Preto', 'Nude', 'Branco', 'Rosa', 'Vinho'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('body-decote-v', 'F0D4D8', 'Body Decote V')],
    featured: true,
  },
  {
    id: 'body-cropped-basico',
    name: 'Body Cropped Básico',
    category: 'body',
    price: 44.9,
    priceAtacado: 30.0,
    description:
      'Body cropped de poliamida liso. Corte básico e versátil para montar looks do dia a dia com calças, shorts e saias.',
    colors: ['Preto', 'Branco', 'Cinza', 'Rosa', 'Verde'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('body-cropped', 'D4ECD4', 'Body Cropped')],
  },

  // ── T-SHIRTS ────────────────────────────────────────────────────────
  {
    id: 'tshirt-oversized-basica',
    name: 'T-Shirt Oversized Básica',
    category: 'tshirt',
    price: 69.9,
    priceAtacado: 48.0,
    description:
      'Camiseta oversized em malha de algodão premium. Corte amplo e moderno com barra reta. Essencial no guarda-roupa feminino.',
    colors: ['Branco', 'Preto', 'Cinza Mescla', 'Rosa Claro', 'Nude'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('tshirt-oversized', 'F4F0EC', 'T-Shirt Oversized'), img('tshirt-oversized-2', 'ECF0F4', 'T-Shirt Oversized')],
    featured: true,
    isNew: true,
  },
  {
    id: 'tshirt-cropped-franzida',
    name: 'T-Shirt Cropped Franzida',
    category: 'tshirt',
    price: 59.9,
    priceAtacado: 42.0,
    description:
      'Camiseta cropped com franzido lateral e amarração. Malha canelada de excelente qualidade. Look moderno e descontraído.',
    colors: ['Branco', 'Preto', 'Rosa', 'Amarelo'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('tshirt-cropped', 'F4ECD4', 'T-Shirt Cropped')],
    featured: true,
  },
  {
    id: 'tshirt-estampada',
    name: 'T-Shirt Manga Curta Estampada',
    category: 'tshirt',
    price: 74.9,
    priceAtacado: 52.0,
    description:
      'Camiseta manga curta com estampa exclusiva Dona da Boutique. Malha de algodão suave com caimento relaxado.',
    colors: ['Branco', 'Rosa Claro'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('tshirt-estampada', 'F8E8EC', 'T-Shirt Estampada')],
    isNew: true,
  },

  // ── CALÇAS ──────────────────────────────────────────────────────────
  {
    id: 'calca-alfaiataria-wide-leg',
    name: 'Calça Alfaiataria Wide Leg',
    category: 'calca',
    price: 139.9,
    priceAtacado: 98.0,
    description:
      'Calça wide leg de alfaiataria com tecido fluido de alta qualidade. Cintura alta com fecho de botão. O modelo mais elegante da coleção.',
    colors: ['Preto', 'Caramelo', 'Branco', 'Verde', 'Cinza'],
    sizes: ['34', '36', '38', '40', '42', '44'],
    images: [img('calca-wide-leg', 'D0D8D4', 'Calça Wide Leg'), img('calca-wide-leg-2', 'D8D0D4', 'Calça Wide Leg')],
    featured: true,
    isNew: true,
  },
  {
    id: 'calca-flare-classica',
    name: 'Calça Flare Clássica',
    category: 'calca',
    price: 129.9,
    priceAtacado: 90.0,
    description:
      'Calça flare de alfaiataria com abertura na barra. Cintura alta e modelagem justa no quadril. Elegante e confortável.',
    colors: ['Preto', 'Nude', 'Marinho'],
    sizes: ['34', '36', '38', '40', '42', '44'],
    images: [img('calca-flare', 'D4D8EC', 'Calça Flare')],
    featured: true,
  },
  {
    id: 'calca-jogger-alfaiataria',
    name: 'Calça Jogger Alfaiataria',
    category: 'calca',
    price: 119.9,
    priceAtacado: 84.0,
    description:
      'Calça jogger de alfaiataria com elástico na cintura e tornozelo. Confortável com o refinamento da alfaiataria.',
    colors: ['Preto', 'Cinza', 'Caramelo'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('calca-jogger', 'D4D0C8', 'Calça Jogger')],
    isNew: true,
  },

  // ── CONJUNTOS ───────────────────────────────────────────────────────
  {
    id: 'conjunto-short-blusa',
    name: 'Conjunto Short + Blusa Cropped',
    category: 'conjunto',
    price: 159.9,
    priceAtacado: 112.0,
    description:
      'Conjunto de short alfaiataria com blusa cropped de manga longa. Tecido fluido de alta qualidade. Coordenado elegante para qualquer ocasião.',
    colors: ['Preto', 'Rosa Antigo', 'Caramelo'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('conjunto-short-blusa', 'ECD4DC', 'Conjunto Short'), img('conjunto-short-blusa-2', 'DCD4EC', 'Conjunto Short')],
    featured: true,
    isNew: true,
  },
  {
    id: 'conjunto-calca-top',
    name: 'Conjunto Calça Wide + Top',
    category: 'conjunto',
    price: 189.9,
    priceAtacado: 134.0,
    description:
      'Conjunto de calça wide leg com top de alças em tecido coordenado. Look completo e sofisticado para destacar sua elegância.',
    colors: ['Preto', 'Nude', 'Verde'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('conjunto-calca-top', 'D4ECD4', 'Conjunto Calça')],
    featured: true,
  },
  {
    id: 'conjunto-body-calca',
    name: 'Conjunto Body + Calça Flare',
    category: 'conjunto',
    price: 179.9,
    priceAtacado: 126.0,
    description:
      'Conjunto de body poliamida com calça flare de alfaiataria. Combinação perfeita de conforto e elegância.',
    colors: ['Preto', 'Caramelo'],
    sizes: ['P', 'M', 'G', 'GG'],
    images: [img('conjunto-body-calca', 'DCD8D0', 'Conjunto Body')],
    isNew: true,
  },

  // ── ACESSÓRIOS ──────────────────────────────────────────────────────
  {
    id: 'cinto-trancado',
    name: 'Cinto Trançado',
    category: 'acessorio',
    price: 39.9,
    priceAtacado: 26.0,
    description:
      'Cinto trançado em material vegano de alta qualidade. Fivela dourada. Detalhe perfeito para dar personalidade ao look.',
    colors: ['Preto', 'Caramelo', 'Nude', 'Branco'],
    sizes: ['Único'],
    images: [img('cinto-trancado', 'DCC8A8', 'Cinto Trançado')],
    featured: true,
  },
  {
    id: 'bolsa-palha',
    name: 'Bolsa Palha Estruturada',
    category: 'acessorio',
    price: 89.9,
    priceAtacado: 62.0,
    description:
      'Bolsa de palha estruturada com alça de mão e tiracolo removível. Forro interno e fechamento com botão magnético.',
    colors: ['Natural', 'Natural com Alça Rosa'],
    sizes: ['Único'],
    images: [img('bolsa-palha', 'ECD8C0', 'Bolsa Palha')],
    isNew: true,
  },
  {
    id: 'scrunchie-veludo',
    name: 'Scrunchie de Veludo',
    category: 'acessorio',
    price: 19.9,
    priceAtacado: 12.0,
    description:
      'Elástico de cabelo scrunchie em veludo macio. Prático e delicado, combina com qualquer look.',
    colors: ['Rosa', 'Preto', 'Nude', 'Vinho', 'Verde'],
    sizes: ['Único'],
    images: [img('scrunchie', 'ECD4DC', 'Scrunchie')],
  },
]

export const categoryLabels: Record<string, string> = {
  short: 'Shorts',
  body: 'Bodies',
  tshirt: 'T-Shirts',
  calca: 'Calças',
  conjunto: 'Conjuntos',
  acessorio: 'Acessórios',
}

export const categoryEmoji: Record<string, string> = {
  short: '👖',
  body: '👙',
  tshirt: '👕',
  calca: '🩱',
  conjunto: '✨',
  acessorio: '👜',
}

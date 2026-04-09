/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C4909A',
          light: '#D4A8B0',
          dark: '#A67580',
        },
        blush: '#F2D4D8',
        nude: '#F9F1F0',
        'border-soft': '#EAD8DB',
        'text-muted': '#8A7578',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px rgba(196, 144, 154, 0.12)',
        card: '0 4px 30px rgba(196, 144, 154, 0.15)',
      },
    },
  },
  plugins: [],
}

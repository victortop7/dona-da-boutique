interface LogoProps {
  className?: string
  variant?: 'dark' | 'light'
}

export default function Logo({ className = '', variant = 'dark' }: LogoProps) {
  // Versão light: logo sobre fundo escuro (ex: banner atacado)
  // A logo PNG tem fundo transparente, mas o ícone é rosa
  // Em fundo escuro/colorido usamos filter brightness para clarear
  const style =
    variant === 'light'
      ? { filter: 'brightness(0) invert(1)' }
      : { filter: 'saturate(3) brightness(0.7) contrast(1.3)' }

  return (
    <img
      src="/dona-da-boutique/logo/logo-dona-boutique.png"
      alt="Dona da Boutique"
      className={className}
      style={style}
      draggable={false}
    />
  )
}

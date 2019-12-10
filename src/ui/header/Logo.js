import Link from 'src/components/Link'
import theme from 'src/ui/theme'
import ButtonLink from 'src/components/ButtonLink'

import logoImg from 'static/svgs/logo.svg'
import brandImg from 'static/svgs/brand.svg'

const Logo = ({ sticky, variant }) => {
  const secondary = variant === 'secondary'
  return (
    <ButtonLink href="/" title="Ir para a página inicial">
      {sticky ? (
        <img
          css={{
            width: 130,
            opacity: +sticky,
            transition: 'all .3s',
          }}
          src={brandImg}
          alt="Vida Natural"
        />
      ) : (
        <img
          css={{
            filter: secondary ? 'invert(0.95)' : null,
            margin: sticky ? theme.spacing() : theme.spacing(2),
            opacity: sticky ? 0 : 1,
            transform: sticky ? 'translateX(14px)' : null,
            transition: 'all .3s',
            width: sticky ? 40 : 80,
          }}
          src={logoImg}
          alt="Vida Natural"
        />
      )}
    </ButtonLink>
  )
}

export default Logo

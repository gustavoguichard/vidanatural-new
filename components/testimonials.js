import { memo } from 'react'
import take from 'lodash/take'
import { Box, Container, Grid } from '@material-ui/core'

import theme from 'lib/theme'

import CTAButton from 'components/cta-button'
import Img from 'components/img'
import Testimonial from 'components/short-testimonial'

import sloganImg from 'public/static/svgs/slogan.svg'

const Testimonials = ({ testimonials: items, show = 3 }) => {
  const testimonials = take(items, show)
  return testimonials.length ? (
    <Box
      css={{
        paddingBottom: theme.spacing(8),
        paddingTop: theme.spacing(8),
        borderBottom: '10px solid white',
      }}
    >
      <Container maxWidth="lg">
        <Box mx={2} mb={2} p={3} textAlign="center">
          <Img
            className="responsive"
            css={{
              height: 70,
              width: 350,
              marginBottom: theme.spacing(2),
              filter: 'brightness(0.2)',
            }}
            src={sloganImg}
            alt="Eu uso cosmética consciente"
          />
        </Box>
        <Grid container spacing={4} justify="center" alignItems="stretch">
          {testimonials.map((testimonial) => (
            <Grid key={testimonial.uid} sm={6} md={4} item>
              <Testimonial {...testimonial} />
            </Grid>
          ))}
        </Grid>
        <CTAButton
          href="/eu-uso-cosmetica-consciente"
          css={{ marginTop: theme.spacing(4) }}
        >
          Mais depoimentos
        </CTAButton>
      </Container>
    </Box>
  ) : null
}

export default memo(Testimonials)

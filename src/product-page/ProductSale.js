import { useInView } from 'react-intersection-observer'
import Certifications from 'src/components/Certifications'
import Ingredients from 'src/components/Ingredients'
import ProductCTA from 'src/product-page/ProductCTA'
import { Paper, Container, Grid, Box, Typography } from '@material-ui/core'
import theme from 'src/ui/theme'

const wrapperCss = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    order: -1,
  },
}

const ProductSale = ({ product, isMobile }) => {
  const [ref, visible] = useInView({ threshold: 0, triggerOnce: false })
  return (
    <>
      {isMobile && (
        <Paper
          elevation={5}
          css={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: 0,
            position: 'fixed',
            bottom: visible ? -100 : 0,
            left: 0,
            right: 0,
            zIndex: 200,
            padding: '.5rem',
            transition: 'all .45s ease-in-out',
          }}
        >
          <ProductCTA size="large" product={product} />
        </Paper>
      )}
      <Grid container justify="center">
        <Grid item xs={12} md={10}>
          <Grid spacing={6} justify="center" container>
            <Grid item xs={12} sm={6} md={4} css={wrapperCss}>
              <img width="400" src={product.image_url} />
            </Grid>
            <Grid
              css={{ display: 'flex', justifyContent: 'center' }}
              item
              xs={12}
              sm={6}
              md={6}
            >
              <Box>
                <ProductCTA ref={ref} product={product} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        justify="center"
        css={{ backgroundColor: theme.palette.common.white }}
      >
        <Container>
          <Grid item xs={12} md={10}>
            <Box pt={8} pb={8}>
              <Typography variant="h3">Ingredientes</Typography>
              <Typography
                variant="body1"
                css={{
                  marginTop: theme.spacing(1),
                  marginBottom: theme.spacing(2),
                }}
              >
                Esse produto é feito de{' '}
                <strong>ingredientes seguros que você conhece</strong>, se tiver
                alguma dúvida, clique no link de cada um para obter informações
                sobre o nível de segurança no site da EWG (Environmental Working
                Group - em inglês).
              </Typography>
              <Ingredients product={product} />
            </Box>
          </Grid>
        </Container>
      </Grid>
      <Box css={{ width: '100%' }}>
        <Certifications css={{ '& img': { filter: 'brightness(0.35)' } }} />
      </Box>
    </>
  )
}

export default ProductSale

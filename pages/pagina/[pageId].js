import get from 'lodash/get'
import { Grid, Typography } from '@material-ui/core'
import ErrorPage from 'pages/404'
import Layout from 'src/ui/Layout'
import Hero from 'src/components/Hero'
import PaperContent from 'src/ui/PaperContent'
import theme from 'src/ui/theme'
import api from 'utils/api'

const ContentPage = ({ page }) =>
  get(page, 'id') ? (
    <Layout title={page.title} seo={{ description: page.description }}>
      <Hero size="small" background="/static/images/capa-pb.jpg">
        <Typography variant="h2">{page.title}</Typography>
        <Typography variant="body1" css={{ margin: theme.spacing(3) }}>
          {page.description}
        </Typography>
      </Hero>
      <PaperContent>
        <Grid container justify="center">
          <Grid item xs={12} md={7}>
            <div dangerouslySetInnerHTML={{ __html: page.body }} />
          </Grid>
        </Grid>
      </PaperContent>
    </Layout>
  ) : (
    <ErrorPage />
  )

export async function getStaticPaths() {
  return {
    paths: ['termos-e-condicoes'].map((pageId) => ({
      params: { pageId },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const { pageId } = params
  const page = await api.listPage(pageId)
  return { props: { page } }
}

export default ContentPage

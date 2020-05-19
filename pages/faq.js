import { Box, Typography } from '@material-ui/core'
import SinglePageLayout from 'src/ui/SinglePageLayout'

import api from 'lib/api'
import theme from 'lib/theme'

import FaqItem from 'components/faq-item'
import Img from 'components/img'

const FaqPage = ({ items }) => {
  return (
    <SinglePageLayout
      title="Dúvidas Frequentes"
      containerProps={{ css: { textAlign: 'center' } }}
    >
      <Typography variant="h2">Dúvidas Frequentes</Typography>
      <Box py={4} textAlign="left">
        {items.map((item) => (
          <FaqItem key={`item-${item.id}`} {...item} />
        ))}
      </Box>
      <Img
        css={{
          maxWidth: '100%',
          width: 250,
          margin: theme.spacing(4, 0),
        }}
        src="/static/svgs/faq.svg"
        alt="Dúvidas frequentes"
      />
    </SinglePageLayout>
  )
}

export async function getStaticProps() {
  const items = await api.cms.allByTypeAndTags('faq_item', ['institucional'], {
    orderings: '[my.faq_item.question]',
  })
  return { props: { items } }
}

export default FaqPage

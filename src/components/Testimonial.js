import ReactMarkdown from 'react-markdown'
import compact from 'lodash/compact'
import { Avatar, Box, Paper, Typography } from '@material-ui/core'
import { GoQuote } from 'react-icons/go'
import { nl2Br } from 'utils/helpers'
import theme from 'src/ui/theme'

const Testimonial = ({ name, size, role, picture, location, content }) =>
  name ? (
    <Paper
      css={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        padding: theme.spacing(4),
        paddingBottom: theme.spacing(2.5),
        marginBottom: theme.spacing(5),
        textAlign: 'left',
        textShadow: 'none',
      }}
    >
      <Typography
        css={{ color: theme.palette.primary.light, overflowY: 'auto' }}
        align="left"
        component="div"
        variant="body2"
      >
        <GoQuote css={{ position: 'absolute', fontSize: '0.8rem' }} />
        <ReactMarkdown
          css={{
            textIndent: '1.15rem',
            '&::first-letter': {
              fontSize: '1.25rem',
            },
          }}
          escapeHtml={false}
          source={nl2Br(content)}
        />
      </Typography>
      <Box display="flex">
        <Box flex={1} mr={2}>
          <Typography
            variant="body2"
            css={{ lineHeight: 1.35, fontSize: '.85rem' }}
          >
            <strong>{name}</strong>
            <br />
            {role}
            {role && <br />}
            {location}
          </Typography>
        </Box>
        <Avatar
          css={{
            alignSelf: 'flex-end',
            border: '4px solid white',
            width: 80,
            right: -10,
            height: 80,
            marginBottom: -50,
          }}
          alt={name}
          src={`/static/images/testimonials/thumbs/${picture}.jpg`}
        />
      </Box>
    </Paper>
  ) : null

export default Testimonial

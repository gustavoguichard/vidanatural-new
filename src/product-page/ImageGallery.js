import { useState } from 'react'
import { Box, CircularProgress, Typography } from '@material-ui/core'
import { getResizedImg } from 'utils/api'
import SwipeableViews from 'react-swipeable-views'
import theme from 'src/ui/theme'

const ImageGallery = ({ product, isLarge }) => {
  const [index, setIndex] = useState(0)

  return (
    <Box display="flex" flexDirection={isLarge ? 'row' : 'column'}>
      <Box
        position="relative"
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        css={{ width: '100%', minHeight: 300 }}
      >
        <CircularProgress
          css={{
            alignSelf: 'center',
            position: 'absolute',
          }}
        />
        <SwipeableViews
          index={index}
          onChangeIndex={setIndex}
          enableMouseEvents
        >
          {product.images.map((img, i) => (
            <div key={`img-${i}`}>
              <img
                className="responsive"
                css={{
                  objectFit: 'contain',
                  position: 'relative',
                  zIndex: 2,
                }}
                src={getResizedImg(img.url, 600)}
              />
              <img
                className="responsive"
                css={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                }}
                src={getResizedImg(img.url, 100)}
              />
            </div>
          ))}
        </SwipeableViews>
      </Box>
      {isLarge || (
        <Typography
          variant="h2"
          css={{
            textAlign: 'center',
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
          }}
        >
          {product.fullName || product.name}
        </Typography>
      )}
      <Box
        css={{ order: isLarge ? -1 : 0 }}
        display="flex"
        flexDirection={isLarge ? 'column' : 'row'}
        justifyContent="center"
      >
        {product.images.map((img, i) => (
          <img
            key={i}
            onClick={() => setIndex(i)}
            css={{
              boxShadow:
                i === index
                  ? `0 0 0 2px ${theme.palette.common.black}`
                  : `0 0 0 0 black`,
              margin: theme.spacing(),
              cursor: 'pointer',
              transition: 'all .6s',
            }}
            src={getResizedImg(img.url, 100)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default ImageGallery

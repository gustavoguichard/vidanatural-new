const withPlugins = require('next-compose-plugins')
const purgeCss = require('next-purgecss')
const optimizedImages = require('next-optimized-images')
const sourceMaps = require('@zeit/next-source-maps')

const nextConfig = {
  purgeCss: {
    whitelist: () => ['MuiPaper-root', 'MuiPaper-rounded', 'MuiFormLabel-root'],
  },
}
module.exports = withPlugins(
  [[optimizedImages, { optimizeImagesInDev: true }], purgeCss, sourceMaps],
  nextConfig,
)

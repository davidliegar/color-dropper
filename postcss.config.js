import postcssPresetEnv from 'postcss-preset-env'
import postcssGlobalData from '@csstools/postcss-global-data'

export default {
  plugins: [
    postcssGlobalData({
      files: [
        'src/styles/media-queries.css'
      ]
    }),
    postcssPresetEnv({
      stage: 0
    })
  ]
}
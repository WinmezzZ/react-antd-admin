const { override, addLessLoader, addWebpackAlias, fixBabelImports } = require('customize-cra')
const path = require('path')
const darkThemeVars = require('antd/dist/dark-theme')

const resolve = dir => path.join(__dirname, '.', dir)

const rewiredSourceMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

module.exports = override(
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      hack: `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
      ...darkThemeVars,
      '@primary-color': '#13c2c2',
      '@dark-color': '#141414',
      '@font-color': 'rgba(256, 256, 256, 0.85)'
    }
  }),
  addWebpackAlias({
    '~': resolve('src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  rewiredSourceMap()
)

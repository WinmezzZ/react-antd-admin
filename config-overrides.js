const { override, addLessLoader, addWebpackAlias, useEslintRc, fixBabelImports } = require('customize-cra')
const path = require('path')
const darkTheme = require('@ant-design/dark-theme').default

const resolve = dir => path.join(__dirname, '.', dir)

const rewiredSourceMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

module.exports = override(
  useEslintRc(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      ...darkTheme,
      '@primary-color': '#13c2c2',
      '@dark-color': '#141414'
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

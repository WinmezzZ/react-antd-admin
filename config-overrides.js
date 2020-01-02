const {
  override,
  addLessLoader,
  addWebpackAlias,
  useEslintRc,
  fixBabelImports
} = require('customize-cra')
var path = require('path')
var AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

const rewiredSourceMap = () => config => {
  config.devtool =
    config.mode === 'development' ? 'cheap-module-source-map' : false
  return config
}

const rewiredDayJs = () => config => {
  config.plugins = [...config.plugins, new AntdDayjsWebpackPlugin()]
  return config
}

module.exports = override(
  useEslintRc(),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { '@primary-color': '#1DA57A' }
  }),
  addWebpackAlias({
    '~': path.resolve(__dirname, '..', 'src')
  }),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  rewiredSourceMap(),
  rewiredDayJs()
)

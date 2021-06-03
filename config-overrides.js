const { override, addLessLoader, addBabelPreset } = require('customize-cra');

const rewiredSourceMap = () => config => {
  config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  return config;
};

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  addLessLoader({
    modifyVars: {
      '@primary-color': '#13c2c2'
    },
    javascriptEnabled: true
  }),
  // new BundleAnalyzerPlugin(),
  rewiredSourceMap()
);

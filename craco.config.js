const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop']
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#13c2c2' },
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};

const CracoEsbuildPlugin = require('craco-esbuild');
const CracoLessPlugin = require('craco-less');

module.exports = {
  babel: {
    presets: ['@emotion/babel-preset-css-prop']
  },
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        enableSvgr: true
      }
    },
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

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src',
  resolve: {
    alias: {
      // '~': path.join(__dirname, 'src'),
    },
  },
  server: {
    port: 8889,
    proxy: {
      '/api': {
        target: `http://localhost:${process.env.PORT}/api`,
        // changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      // ....
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    vitePluginImp({
      libList: [
        // {
        //   libName: 'antd',
        //   style: name => `antd/es/${name}/style/index.css`,
        // },
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false,
          style: () => {
            return false;
          },
        },
      ],
    }),
  ],
});

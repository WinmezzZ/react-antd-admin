import react from '@vitejs/plugin-react-swc';
import path from 'path';
import UnoCSS from 'unocss/vite';
import { defineConfig, loadEnv } from 'vite';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
      },
    },
    server: {
      port: 8889,
      proxy: {
        '/api': {
          target: `http://localhost:8889/api`,
          // changeOrigin: true,
          // rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      }),
      mockDevServerPlugin({
        include: ['{mock,src}/**/*.mock.{js,ts,cjs,mjs,json,json5}'],
        prefix: '^/api/',
        reload: true,
      }),
      UnoCSS(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
          // ...svgr options (https://react-svgr.com/docs/options/)
        },
      }),
      /** 需要分析打包时打开注释 */
      // (async () => (await import('rollup-plugin-visualizer')).visualizer())(),
    ],
    build: {
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          chunkFileNames: chunkInfo => {
            if (
              chunkInfo.name === 'index' &&
              chunkInfo.facadeModuleId?.includes('/src/pages/') &&
              chunkInfo.isDynamicEntry
            ) {
              const paths = chunkInfo.facadeModuleId.split('/');
              const name = paths[paths.length - 2];

              return `assets/${name}-[hash].js`;
            }

            return 'assets/[name]-[hash].js';
          },
          manualChunks: {
            commonChunk: ['react', 'react-router-dom', 'react-dom', '@ant-design/icons', 'swr'],
            rechartsChunk: ['recharts'],
          },
        },
      },
    },
  };
});

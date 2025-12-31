import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            base: null,
            includeAbsolute: false,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/js'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_CRM_URL,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ''), // Uncomment if your backend doesn't expect /api prefix
        },
      },
    },
  };
});
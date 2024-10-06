// import react from '@vitejs/plugin-react-swc'
import path from "path"
import { defineConfig,  } from 'vite'
import viteReact from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default defineConfig(() => {
  // const env = loadEnv(mode, process.cwd(), '')
  return {

    plugins: [
      TanStackRouterVite({
        // experimental: {
        //   enableCodeSplitting: true,
        // },
      }),
      viteReact(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
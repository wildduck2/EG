// import react from '@vitejs/plugin-react-swc'
import path from "path";
import { defineConfig, loadEnv } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.BACKEND__BASE_URL": JSON.stringify(env.BACKEND__BASE_URL),
    },
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
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});

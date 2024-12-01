import path from "path";
import { defineConfig, loadEnv } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      "process.env.BACKEND__BASE_URL": JSON.stringify(env.BACKEND__BASE_URL),
      "process.env.BACKEND__BASE_UPLOAD_URL": JSON.stringify(
        env.BACKEND__BASE_UPLOAD_URL,
      ),
    },
    plugins: [
      ViteImageOptimizer({}),

      tsconfigPaths(),
      TanStackRouterVite({
        // Enable experimental code-splitting in TanStack Router, if supported
        autoCodeSplitting: true,
      }),
      viteReact(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          // Separate large dependencies like React and TanStack Router
          manualChunks: {
            react: ["react", "react-dom"],
            tanstack: ["@tanstack/react-router", "@tanstack/react-query"],
            // Include other common libraries as needed
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Suppress warnings if necessary
    },
  };
});

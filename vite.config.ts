import path from "path";
import { defineConfig, loadEnv } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import fs from "fs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // server: {
    //   https: {
    //     key: fs.readFileSync("./public/localhost-key.pem"),
    //     cert: fs.readFileSync("./public/localhost-cert.pem"),
    //   },
    // },
    define: {
      "process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY": JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      ),
      "process.env.NEXT_PUBLIC_SUPABASE_URL": JSON.stringify(
        env.NEXT_PUBLIC_SUPABASE_URL,
      ),
      "process.env.SERVICE_ROLE": JSON.stringify(env.SERVICE_ROLE),
      "process.env.BACKEND__BASE_URL": JSON.stringify(env.BACKEND__BASE_URL),
      "process.env.BACKEND__BASE_UPLOAD_URL": JSON.stringify(
        env.BACKEND__BASE_UPLOAD_URL,
      ),
    },
    plugins: [
      ViteImageOptimizer({}),
      // VitePWA(manifestForPlugin),
      tsconfigPaths(),
      TanStackRouterVite({
        // Enable experimental code-splitting in TanStack Router, if supported
        //
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

const manifestForPlugin: Partial<VitePWAOptions> = {
  // registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.png"],
  registerType: "autoUpdate",
  workbox: {
    cleanupOutdatedCaches: true,
  },
  manifest: {
    name: "البضاعه",
    short_name: "البضاعه",
    description:
      "Explore a wide variety of products on our comprehensive goods platform. Find what you need at competitive prices.",
    icons: [
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon",
      },
      {
        src: "./icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "./icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "icon",
      },
      {
        src: "./icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait",
  },
};

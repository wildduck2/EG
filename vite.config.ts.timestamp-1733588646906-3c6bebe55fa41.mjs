// vite.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///home/wildduck/EG/node_modules/.pnpm/vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0/node_modules/vite/dist/node/index.js";
import { ViteImageOptimizer } from "file:///home/wildduck/EG/node_modules/.pnpm/vite-plugin-image-optimizer@1.1.8_vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0_/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import tsconfigPaths from "file:///home/wildduck/EG/node_modules/.pnpm/vite-tsconfig-paths@5.1.3_typescript@5.6.2_vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0_/node_modules/vite-tsconfig-paths/dist/index.js";
import viteReact from "file:///home/wildduck/EG/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///home/wildduck/EG/node_modules/.pnpm/@tanstack+router-plugin@1.58.4_vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
import { VitePWA } from "file:///home/wildduck/EG/node_modules/.pnpm/vite-plugin-pwa@0.21.1_vite@5.4.7_@types+node@22.6.1_sass-embedded@1.79.4_terser@5.37.0__work_wc5r5r4p6t3krnqivoo6ap2d2a/node_modules/vite-plugin-pwa/dist/index.js";
import fs from "fs";
var __vite_injected_original_dirname = "/home/wildduck/EG";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    server: {
      https: {
        key: fs.readFileSync("./public/localhost-key.pem"),
        cert: fs.readFileSync("./public/localhost-cert.pem")
      }
    },
    define: {
      "process.env.BACKEND__BASE_URL": JSON.stringify(env.BACKEND__BASE_URL),
      "process.env.BACKEND__BASE_UPLOAD_URL": JSON.stringify(
        env.BACKEND__BASE_UPLOAD_URL
      )
    },
    plugins: [
      ViteImageOptimizer({}),
      VitePWA(manifestForPlugin),
      tsconfigPaths(),
      TanStackRouterVite({
        // Enable experimental code-splitting in TanStack Router, if supported
        //
        autoCodeSplitting: true
      }),
      viteReact()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    build: {
      rollupOptions: {
        output: {
          // Separate large dependencies like React and TanStack Router
          manualChunks: {
            react: ["react", "react-dom"],
            tanstack: ["@tanstack/react-router", "@tanstack/react-query"]
            // Include other common libraries as needed
          }
        }
      },
      chunkSizeWarningLimit: 1e3
      // Suppress warnings if necessary
    }
  };
});
var manifestForPlugin = {
  // registerType: "prompt",
  includeAssets: ["favicon.ico", "apple-touc-icon.png", "masked-icon.png"],
  registerType: "autoUpdate",
  workbox: {
    cleanupOutdatedCaches: true
  },
  manifest: {
    name: "Weather app",
    short_name: "Weather app",
    description: "An app that can show the weather forecast for your city.",
    icons: [
      {
        src: "./icon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "./icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "favicon"
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "apple touch icon"
      },
      {
        src: "./icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "any"
      },
      {
        src: "./icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "icon"
      },
      {
        src: "./icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any maskable"
      }
    ],
    theme_color: "#181818",
    background_color: "#e8eac2",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93aWxkZHVjay9FR1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd2lsZGR1Y2svRUcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd2lsZGR1Y2svRUcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXJcIjtcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gXCJ2aXRlLXRzY29uZmlnLXBhdGhzXCI7XG5pbXBvcnQgdml0ZVJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGVcIjtcbmltcG9ydCB7IFZpdGVQV0EsIFZpdGVQV0FPcHRpb25zIH0gZnJvbSBcInZpdGUtcGx1Z2luLXB3YVwiO1xuaW1wb3J0IGZzIGZyb20gXCJmc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgXCJcIik7XG5cbiAgcmV0dXJuIHtcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIGh0dHBzOiB7XG4gICAgICAgIGtleTogZnMucmVhZEZpbGVTeW5jKFwiLi9wdWJsaWMvbG9jYWxob3N0LWtleS5wZW1cIiksXG4gICAgICAgIGNlcnQ6IGZzLnJlYWRGaWxlU3luYyhcIi4vcHVibGljL2xvY2FsaG9zdC1jZXJ0LnBlbVwiKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIFwicHJvY2Vzcy5lbnYuQkFDS0VORF9fQkFTRV9VUkxcIjogSlNPTi5zdHJpbmdpZnkoZW52LkJBQ0tFTkRfX0JBU0VfVVJMKSxcbiAgICAgIFwicHJvY2Vzcy5lbnYuQkFDS0VORF9fQkFTRV9VUExPQURfVVJMXCI6IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICBlbnYuQkFDS0VORF9fQkFTRV9VUExPQURfVVJMLFxuICAgICAgKSxcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIFZpdGVJbWFnZU9wdGltaXplcih7fSksXG4gICAgICBWaXRlUFdBKG1hbmlmZXN0Rm9yUGx1Z2luKSxcbiAgICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgICAgIFRhblN0YWNrUm91dGVyVml0ZSh7XG4gICAgICAgIC8vIEVuYWJsZSBleHBlcmltZW50YWwgY29kZS1zcGxpdHRpbmcgaW4gVGFuU3RhY2sgUm91dGVyLCBpZiBzdXBwb3J0ZWRcbiAgICAgICAgLy9cbiAgICAgICAgYXV0b0NvZGVTcGxpdHRpbmc6IHRydWUsXG4gICAgICB9KSxcbiAgICAgIHZpdGVSZWFjdCgpLFxuICAgIF0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgLy8gU2VwYXJhdGUgbGFyZ2UgZGVwZW5kZW5jaWVzIGxpa2UgUmVhY3QgYW5kIFRhblN0YWNrIFJvdXRlclxuICAgICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgICAgcmVhY3Q6IFtcInJlYWN0XCIsIFwicmVhY3QtZG9tXCJdLFxuICAgICAgICAgICAgdGFuc3RhY2s6IFtcIkB0YW5zdGFjay9yZWFjdC1yb3V0ZXJcIiwgXCJAdGFuc3RhY2svcmVhY3QtcXVlcnlcIl0sXG4gICAgICAgICAgICAvLyBJbmNsdWRlIG90aGVyIGNvbW1vbiBsaWJyYXJpZXMgYXMgbmVlZGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIFN1cHByZXNzIHdhcm5pbmdzIGlmIG5lY2Vzc2FyeVxuICAgIH0sXG4gIH07XG59KTtcblxuY29uc3QgbWFuaWZlc3RGb3JQbHVnaW46IFBhcnRpYWw8Vml0ZVBXQU9wdGlvbnM+ID0ge1xuICAvLyByZWdpc3RlclR5cGU6IFwicHJvbXB0XCIsXG4gIGluY2x1ZGVBc3NldHM6IFtcImZhdmljb24uaWNvXCIsIFwiYXBwbGUtdG91Yy1pY29uLnBuZ1wiLCBcIm1hc2tlZC1pY29uLnBuZ1wiXSxcbiAgcmVnaXN0ZXJUeXBlOiBcImF1dG9VcGRhdGVcIixcbiAgd29ya2JveDoge1xuICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgfSxcbiAgbWFuaWZlc3Q6IHtcbiAgICBuYW1lOiBcIldlYXRoZXIgYXBwXCIsXG4gICAgc2hvcnRfbmFtZTogXCJXZWF0aGVyIGFwcFwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFuIGFwcCB0aGF0IGNhbiBzaG93IHRoZSB3ZWF0aGVyIGZvcmVjYXN0IGZvciB5b3VyIGNpdHkuXCIsXG4gICAgaWNvbnM6IFtcbiAgICAgIHtcbiAgICAgICAgc3JjOiBcIi4vaWNvbi0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiLi9pY29uLTUxMng1MTIucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgcHVycG9zZTogXCJmYXZpY29uXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiL2FwcGxlLXRvdWNoLWljb24ucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjE4MHgxODBcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgcHVycG9zZTogXCJhcHBsZSB0b3VjaCBpY29uXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzcmM6IFwiLi9pY29uLTE0NHgxNDQucG5nXCIsXG4gICAgICAgIHNpemVzOiBcIjE0NHgxNDRcIixcbiAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgcHVycG9zZTogXCJhbnlcIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNyYzogXCIuL2ljb24tMjU2eDI1Ni5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiMjU2eDI1NlwiLFxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICBwdXJwb3NlOiBcImljb25cIixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHNyYzogXCIuL2ljb24tMzg0eDM4NC5wbmdcIixcbiAgICAgICAgc2l6ZXM6IFwiMzg0eDM4NFwiLFxuICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICBwdXJwb3NlOiBcImFueSBtYXNrYWJsZVwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIHRoZW1lX2NvbG9yOiBcIiMxODE4MThcIixcbiAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiNlOGVhYzJcIixcbiAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcbiAgICBzY29wZTogXCIvXCIsXG4gICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICBvcmllbnRhdGlvbjogXCJwb3J0cmFpdFwiLFxuICB9LFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcU8sT0FBTyxVQUFV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

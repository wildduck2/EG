// vite.config.ts
import path from "path";
import { defineConfig } from "file:///mnt/d/Projects/goods-main/goods-main/node_modules/.pnpm/vite@5.4.7_@types+node@22.6.1/node_modules/vite/dist/node/index.js";
import viteReact from "file:///mnt/d/Projects/goods-main/goods-main/node_modules/.pnpm/@vitejs+plugin-react@4.3.1_vite@5.4.7_@types+node@22.6.1_/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { TanStackRouterVite } from "file:///mnt/d/Projects/goods-main/goods-main/node_modules/.pnpm/@tanstack+router-plugin@1.58.4_vite@5.4.7_@types+node@22.6.1_/node_modules/@tanstack/router-plugin/dist/esm/vite.js";
var __vite_injected_original_dirname = "/mnt/d/Projects/goods-main/goods-main";
var vite_config_default = defineConfig(() => {
  return {
    plugins: [
      TanStackRouterVite({
        // experimental: {
        //   enableCodeSplitting: true,
        // },
      }),
      viteReact()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2QvUHJvamVjdHMvZ29vZHMtbWFpbi9nb29kcy1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvbW50L2QvUHJvamVjdHMvZ29vZHMtbWFpbi9nb29kcy1tYWluL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9tbnQvZC9Qcm9qZWN0cy9nb29kcy1tYWluL2dvb2RzLW1haW4vdml0ZS5jb25maWcudHNcIjsvLyBpbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCAgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZpdGVSZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFRhblN0YWNrUm91dGVyVml0ZSB9IGZyb20gJ0B0YW5zdGFjay9yb3V0ZXItcGx1Z2luL3ZpdGUnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoKSA9PiB7XG4gIC8vIGNvbnN0IGVudiA9IGxvYWRFbnYobW9kZSwgcHJvY2Vzcy5jd2QoKSwgJycpXG4gIHJldHVybiB7XG5cbiAgICBwbHVnaW5zOiBbXG4gICAgICBUYW5TdGFja1JvdXRlclZpdGUoe1xuICAgICAgICAvLyBleHBlcmltZW50YWw6IHtcbiAgICAgICAgLy8gICBlbmFibGVDb2RlU3BsaXR0aW5nOiB0cnVlLFxuICAgICAgICAvLyB9LFxuICAgICAgfSksXG4gICAgICB2aXRlUmVhY3QoKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLE9BQU8sVUFBVTtBQUNqQixTQUFTLG9CQUFzQjtBQUMvQixPQUFPLGVBQWU7QUFDdEIsU0FBUywwQkFBMEI7QUFKbkMsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhLE1BQU07QUFFaEMsU0FBTztBQUFBLElBRUwsU0FBUztBQUFBLE1BQ1AsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFJbkIsQ0FBQztBQUFBLE1BQ0QsVUFBVTtBQUFBLElBQ1o7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUN0QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    PkgConfig(),
    OptimizationPersist(),
    vue(),
    vueJsx(),
    createStyleImportPlugin({
      resolves: [
        ElementPlusResolve()
      ]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })],
  // 引入第三方的配置
  base: '/admin/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`,
      },
    },
  },
  server: {
    host: '0.0.0.0'
  }
})


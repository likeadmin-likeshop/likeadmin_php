import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/admin/',
    server: {
        host: '0.0.0.0'
    },
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            imports: ['vue', 'vue-router'],
            resolvers: [ElementPlusResolver()],
            eslintrc: {
                enabled: true
            }
        }),
        Components({
            directoryAsNamespace: true,
            resolvers: [ElementPlusResolver()]
        }),
        createStyleImportPlugin({
            resolves: [ElementPlusResolve()]
        }),
        createSvgIconsPlugin({
            // 配置路劲在你的src里的svg存放文件
            iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
            symbolId: 'local-icon-[dir]-[name]'
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})

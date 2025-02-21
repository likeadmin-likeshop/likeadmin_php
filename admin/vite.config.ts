import * as fs from 'node:fs'
import * as path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
// import legacyPlugin from '@vitejs/plugin-legacy'
// https://vitejs.dev/config/

function getElementPlusStylePaths() {
    const componentsDir = path.resolve(
        __dirname,
        'node_modules',
        'element-plus',
        'es',
        'components'
    )
    const componentDirs = fs.readdirSync(componentsDir)

    const stylePaths: string[] = []

    // 遍历每个组件文件夹，检查是否有 `style/css` 文件
    componentDirs.forEach((dir) => {
        const stylePath = path.join(componentsDir, dir, 'style', 'index.mjs')
        if (fs.existsSync(stylePath)) {
            stylePaths.push(`element-plus/es/components/${dir}/style/css`)
        }
    })

    return stylePaths
}

export default defineConfig({
    base: '/admin/',
    server: {
        host: '0.0.0.0',
        hmr: true,
        open: true
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
            iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
            symbolId: 'local-icon-[dir]-[name]'
        }),
        vueSetupExtend()
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler'
            }
        }
    },
    optimizeDeps: {
        // 确保不重复包含这些依赖
        include: ['@wangeditor/editor-for-vue', 'vue-echarts', ...getElementPlusStylePaths()]
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString()
                    }
                }
            }
        }
    },
    define: {
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_HYDRATION__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
})

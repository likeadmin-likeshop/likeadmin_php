import path from 'path'
import dts from 'vite-plugin-dts'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'
import { fbPath, outputPath, packPath, rootPath, tsconfigPath } from './path'
import type { InlineConfig } from 'vite'

const entryFile = path.resolve(fbPath, 'src/index.ts')
export const config: InlineConfig = {
  mode: 'production',
  plugins: [
    vue(),
    vueJsx(),
    dts({
      root: rootPath,
      entryRoot: packPath,
      outputDir: path.resolve(outputPath, 'types'),
      tsConfigFilePath: tsconfigPath,
      compilerOptions: {
        emitDeclarationOnly: true,
        skipLibCheck: true,
        noImplicitAny: false
      }
    })
  ],
  build: {
    outDir: path.resolve(outputPath, 'dist'),
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
    lib: {
      entry: entryFile,
      formats: ['es']
    },
    rollupOptions: {
      input: entryFile,
      output: [
        {
          format: 'esm',
          entryFileNames: '[name].esm.js'
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs.js'
        }
      ]
    }
  }
}

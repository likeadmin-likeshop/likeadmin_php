import path from 'path'

const cwd = process.cwd()
export const rootPath = path.resolve(cwd, '../')
export const packPath = path.resolve(rootPath, 'packages')
export const fbPath = path.resolve(packPath, 'form-builder')
export const buildPath = cwd

export const tsconfigPath = path.resolve(rootPath, 'tsconfig.json')

export const outputPath = path.resolve(rootPath, 'bundle')

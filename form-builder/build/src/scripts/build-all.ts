import path from 'path'
import fs from 'fs-extra'
import { build } from 'vite'
import { fbPath, outputPath, viteBuildConfig } from '../configs'

export async function buildAll() {
  await fs.emptyDir(outputPath)
  await build(viteBuildConfig)
  await fs.copy(
    path.resolve(fbPath, 'package.json'),
    path.resolve(outputPath, 'package.json')
  )
}

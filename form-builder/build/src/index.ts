#!/usr/bin/env node

import path from 'path'
import { Command } from 'commander'
import fs from 'fs-extra'
import { buildPath } from './configs'
import { buildAll } from './scripts'
const program = new Command()

const packageFile = fs.readFileSync(
  path.resolve(buildPath, 'package.json'),
  'utf8'
)
const packageJson = JSON.parse(packageFile)

program.version(packageJson.version).name(packageJson.name).usage()

program.command('build:all').action(async () => {
  await buildAll()
})

program.parse(process.argv)

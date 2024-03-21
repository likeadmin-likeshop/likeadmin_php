import path from 'path'
import fsExtra from 'fs-extra'
import dotenv from 'dotenv'
const { existsSync, remove, copy } = fsExtra
const cwd = process.cwd()
dotenv.config()

const isSSR = Boolean(process.env.NUXT_SSR)
//打包发布路径，可能会覆盖重要文件，请谨慎改动
const releaseRelativePath = '../server/public/pc'
const distRelativePath = isSSR ? '' : './.output/public'
const distPath = path.resolve(cwd, distRelativePath)
const distSSRFilter = ['.output', 'public', 'static', 'package.json', 'package-lock.json']
const distNotSSRFilter = ['']
const distFilter = joinPath(isSSR ? distSSRFilter : distNotSSRFilter)

function joinPath(target, res = []) {
    target.forEach((src) => {
        res.push(path.join(distPath, src))
    })
    return res
}

const releasePath = path.resolve(cwd, releaseRelativePath)

async function build() {
    if (existsSync(releasePath)) {
        await remove(releasePath)
    }
    console.log(`文件正在复制 ==> ${releaseRelativePath}`)
    try {
        await copyFile(distPath, releasePath)
    } catch (error) {
        console.log(`\n ${error}`)
    }
    console.log(`文件已复制 ==> ${releaseRelativePath}`)
}

function copyFile(sourceDir, targetDir) {
    return new Promise((resolve, reject) => {
        copy(
            sourceDir,
            targetDir,
            {
                filter(src) {
                    if (src === distPath) return true
                    return distFilter.some((item) => src.includes(item))
                }
            },
            (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            }
        )
    })
}

build()

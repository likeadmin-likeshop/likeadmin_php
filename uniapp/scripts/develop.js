const { spawn } = require('child_process')
const readline = require('readline')

class DevelopClientScript {
    constructor() {
        if (DevelopClientScript.instance) {
            return DevelopClientScript.instance
        }
        DevelopClientScript.instance = this
    }

    promptUser(question) {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            })
            rl.question(question, (res) => {
                resolve(res)
                rl.close()
            })
        })
    }

    async runClient() {
        console.error('请选择你需要运行的客户端（回复数字后回车）')
        console.error('0.取消')
        console.error('1.微信小程序')
        console.error('2.公众号或者H5')
        const runClientRes = await this.promptUser('请输入运行的客户端：')
        switch (runClientRes) {
            case '0':
                break
            case '1':
                await this.runNpmScript('dev:mp-weixin')
                break
            case '2':
                await this.runNpmScript('dev:h5')
                break
            default:
                await this.runClient()
                break
        }
    }

    runNpmScript(scriptName) {
        return new Promise((resolve, reject) => {
            const isWindows = process.platform === 'win32'
            const command = isWindows ? 'cmd.exe' : 'npm'
            const args = isWindows
                ? ['/c', 'npm', 'run', scriptName]
                : ['run', scriptName]

            const runProcess = spawn(command, args)

            runProcess.stdout.on('data', (data) => {
                console.log(data.toString())
            })

            runProcess.stderr.on('data', (data) => {
                console.error(data.toString())
            })

            runProcess.on('close', (code) => {
                if (code !== 0) {
                    reject(
                        new Error(
                            `运行错误，请查看以下报错信息寻找解决方法: ${error.message}`
                        )
                    )
                } else {
                    resolve()
                }
            })
        })
    }

    async run(targetVersion) {
        const currentVersion = process.versions.node

        if (currentVersion < targetVersion) {
            throw new Error(
                `你的当前node版本为(${currentVersion})，需要安装目标版本为 ${targetVersion} 以上！！`
            )
        }

        await this.runClient()
    }

    static getInstance() {
        if (!DevelopClientScript.instance) {
            DevelopClientScript.instance = new DevelopClientScript()
        }
        return DevelopClientScript.instance
    }
}

;(async () => {
    const develop = DevelopClientScript.getInstance()
    try {
        await develop.run('16.16.0')
    } catch (error) {
        console.error(error.message)
    }
})()

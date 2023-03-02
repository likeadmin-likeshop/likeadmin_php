import { PayWayEnum } from '.'

export class Pay {
    private static modules = new Map()
    static inject(name: string, module: any) {
        this.modules.set(name, module)
    }
    constructor() {
        //动态注入支付方式
        for (const [name, module] of Pay.modules.entries()) {
            module.init(name, this)
        }
    }

    //调用支付
    async payment(payWay: PayWayEnum, options: any) {
        try {
            //@ts-ignore
            const module = this[PayWayEnum[payWay]]
            if (!module) {
                throw new Error(`can not find pay way ${payWay}`)
            }
            return await module.run(options)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

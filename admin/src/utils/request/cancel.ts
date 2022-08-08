import axios, { type AxiosRequestConfig, type Canceler } from 'axios'

const cancelerMap = new Map<string, Canceler>()

export class AxiosCancel {
    private static instance?: AxiosCancel

    static createInstance() {
        return this.instance ?? (this.instance = new AxiosCancel())
    }
    add(config: AxiosRequestConfig) {
        this.remove(config)
        const url = this.getUrKey(config)
        config.cancelToken =
            config.cancelToken ??
            new axios.CancelToken((cancel) => {
                if (!cancelerMap.has(url)) {
                    cancelerMap.set(url, cancel)
                }
            })
    }
    remove(config: AxiosRequestConfig) {
        const url = this.getUrKey(config)
        if (cancelerMap.has(url)) {
            const cancel = cancelerMap.get(url)
            cancel && cancel(url)
            cancelerMap.delete(url)
        }
    }

    private getUrKey(config: AxiosRequestConfig) {
        return `${config.method}-${config.url}`
    }
}

const axiosCancel = AxiosCancel.createInstance()

export default axiosCancel

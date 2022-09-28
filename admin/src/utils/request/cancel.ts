import axios, { type AxiosRequestConfig, type Canceler } from 'axios'

const cancelerMap = new Map<string, Canceler>()

export class AxiosCancel {
    private static instance?: AxiosCancel

    static createInstance() {
        return this.instance ?? (this.instance = new AxiosCancel())
    }
    add(config: AxiosRequestConfig) {
        const url = config.url!
        this.remove(url)
        config.cancelToken = new axios.CancelToken((cancel) => {
            if (!cancelerMap.has(url)) {
                cancelerMap.set(url, cancel)
            }
        })
    }
    remove(url: string) {
        if (cancelerMap.has(url)) {
            const cancel = cancelerMap.get(url)
            cancel && cancel(url)
            cancelerMap.delete(url)
        }
    }
}

const axiosCancel = AxiosCancel.createInstance()

export default axiosCancel

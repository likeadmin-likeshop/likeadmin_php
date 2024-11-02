import { reactive, toRaw } from 'vue'

import { getDictData } from '@/api/app'

interface Options {
    [propName: string]: {
        api: PromiseFun
        params?: Record<string, any>
        transformData?(data: any): any
    }
}

// {
//     dict: {
//         api: dictData,
//         params: { name: 'user' },
//         transformData(data: any) {
//             return data.list
//         }
//     }
// }

export function useDictOptions<T = any>(options: Options) {
    const optionsData: any = reactive({})
    const optionsKey = Object.keys(options)
    const apiLists = optionsKey.map((key) => {
        const value = options[key]
        optionsData[key] = []
        return () => value.api(toRaw(value.params) || {})
    })

    const refresh = async () => {
        const res = await Promise.allSettled<Promise<any>>(apiLists.map((api) => api()))
        res.forEach((item, index) => {
            const key = optionsKey[index]
            if (item.status == 'fulfilled') {
                const { transformData } = options[key]
                const data = transformData ? transformData(item.value) : item.value
                optionsData[key] = data
            }
        })
    }
    refresh()
    return {
        optionsData: optionsData as T,
        refresh
    }
}

// useDictData<{
//     dict: any[]
// }>(['dict'])

export function useDictData<T = any>(dict: string) {
    const dictData: any = reactive({})
    const refresh = async () => {
        const data = await getDictData({
            type: dict
        })
        Object.assign(dictData, data)
    }
    refresh()

    return {
        dictData: dictData as T,
        refresh
    }
}

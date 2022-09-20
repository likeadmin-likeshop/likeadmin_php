import { dictDataLists } from '@/api/setting/dict'
import { reactive, toRaw } from 'vue'

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

// useDictOptions<{
//     dict: any[]
// }>({
//     dict: dictData
// })

export function useDictData<T = any>(dict: string[]) {
    const options: Options = {}
    for (const type of dict) {
        options[type] = {
            api: dictDataLists,
            params: {
                dictType: type
            }
        }
    }
    const { optionsData } = useDictOptions<T>(options)
    return {
        dictData: optionsData
    }
}

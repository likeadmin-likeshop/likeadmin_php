import { getSelectData, getDictData } from '@/api/app'
import { reactive, toRaw } from 'vue'

interface Options {
    [propName: string]: {
        params?: Record<string, any>
        transformData?(data: any): any
    }
}

// {
//     dict: {
//         params: { name: 'user' },
//         transformData(data: any) {
//             return data.list
//         }
//     }
// }

export function useDictOptions<T = any>(options: Options) {
    const optionsData: any = reactive({})
    const optionsKey = Object.keys(options)

    const refresh = async () => {
        const res = await Promise.allSettled<Promise<any>>(
            optionsKey.map((key) =>
                getSelectData({
                    type: key,
                    ...(toRaw(options[key].params) ?? {})
                })
            )
        )
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

import {
    apiFileCateAdd,
    apiFileCateDelete,
    apiFileCateEdit,
    apiFileCateLists,
    apiFileDelete,
    apiFileList,
    apiFileMove,
} from "@/api/app"
import { usePages } from "@/core/hooks/pages"
import { ElMessage } from "element-plus"
import { computed, inject, reactive, ref, Ref } from "vue"



// 左侧分组的钩子函数
export function useCate(typeValue: Ref<any>) {
    // 分组列表
    const cateLists: Ref<any[]> = ref([])
    // 选中的分组id
    const cateId = ref("")
    // 添加分组
    const handleAddCate = (val: string) => {
        apiFileCateAdd({
            type: typeValue.value,
            pid: 0,
            name: val,
        }).then(() => {
            getCateLists()
        })
    }
    // 编辑分组
    const handleEditCate = (val: string, id: number) => {
        apiFileCateEdit({
            id,
            name: val,
        }).then(() => {
            getCateLists()
        })
    }
    // 删除分组
    const handleDeleteCate = (id: number) => {
        apiFileCateDelete({
            id,
        }).then(() => {
            getCateLists()
        })
    }
    // 获取分组列表
    const getCateLists = () => {
        return new Promise((resolve, reject) => {
            apiFileCateLists({
                type: typeValue.value,
                page_type: 1,
            }).then((res: any) => {
                const item: any[] = [
                    {
                        name: "全部",
                        id: "",
                    },
                    {
                        name: "未分组",
                        id: 0,
                    },
                ]
                cateLists.value = res?.lists
                cateLists.value.unshift(...item)
                resolve(cateLists)
            })
        })
    }
    return {
        cateId,
        cateLists,
        handleAddCate,
        handleEditCate,
        handleDeleteCate,
        getCateLists,
    }
}


// 处理文件的钩子函数
export function useFile(cateId: Ref<string>, type: Ref<any>, limit: Ref<number>) {
    const moveId = ref(0)
    const select: Ref<any[]> = ref([])
    const fileParams = reactive({
        name: "",
        type: type,
        cid: cateId,
    })
    const { pager, requestApi, resetPage } = usePages({
        callback: apiFileList,
        params: fileParams
    })
  

    const selectStatus = computed(
        () => (id: number) => select.value.find((item: any) => item.id == id)
    )

    const getFileList = () => {
        requestApi()
    }
    const refresh = () => {
        resetPage()
    }
    const batchFileDelete = (id?: number[]) => {
        let ids = id ? id : select.value.map((item: any) => item.id)
        apiFileDelete({
            ids,
        }).then((res) => {
            getFileList()
            clearSelect()
        })
    }
    const batchFileMove = () => {
        let ids = select.value.map((item: any) => item.id)
        apiFileMove({
            ids,
            cid: moveId.value,
        }).then((res) => {
            moveId.value = 0
            getFileList()
            clearSelect()
        })
    }

    const selectFile = (item: any) => {
        let index = select.value.findIndex((items: any) => items.id == item.id)
        if (index != -1) {
            select.value.splice(index, 1)
            return
        }
        if (select.value.length == limit.value) {
            if (limit.value == 1) {
                select.value = []
                select.value.push(item)
                return
            }
            ElMessage.warning("已达到选择上限")
            return
        }
        select.value.push(item)
    }
    const clearSelect = () => {
        select.value = []
    }
    const cancelSelete = (id: number) => {
        select.value = select.value.filter((item) => item.id != id)
    }
    return {
        moveId,
        pager,
        fileParams,
        select,
        getFileList,
        refresh,
        batchFileDelete,
        batchFileMove,
        selectFile,
        selectStatus,
        clearSelect,
        cancelSelete
    }
}

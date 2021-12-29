import {
    fileCateAdd,
    fileCateDelete,
    fileCateEdit,
    fileCateLists,
    fileDelete,
    fileList,
    fileMove,
} from "@/api/app";
import { usePages } from "@/hooks/pages";
import { ElMessage } from "element-plus";
import { computed, inject, reactive, ref, Ref } from "vue";

export function useCate(typeValue: Ref<any>) {
    const cateLists: Ref<any[]> = ref([]);
    const cateId = ref("");
    const handleAddCate = (val: string) => {
        fileCateAdd({
            type: typeValue.value,
            pid: 0,
            name: val,
        }).then(() => {
            getCateLists();
        });
    };
    const handleEditCate = (val: string, id: number) => {
        fileCateEdit({
            id,
            name: val,
        }).then(() => {
            getCateLists();
        });
    };
    const handleDeleteCate = (id: number) => {
        fileCateDelete({
            id,
        }).then(() => {
            getCateLists();
        });
    };
    const getCateLists = () => {
        fileCateLists({
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
            ];
            cateLists.value = res?.lists;
            cateLists.value.unshift(...item);
        });
    };
    return {
        cateId,
        cateLists,
        handleAddCate,
        handleEditCate,
        handleDeleteCate,
        getCateLists,
    };
}

export function useFile(cateId: Ref<string>, type: Ref<any>) {
    const { pager, requestApi } = usePages();
    const moveId = ref(0);
    const limit = inject("limit")
    const select: Ref<any> = ref([]);
    const fileParams = reactive({
        name: "",
        type,
        cid: cateId,
    });

    const selectStatus = computed(
        () => (id: number) => select.value.find((item: any) => item.id == id)
    );

    const getFileList = () => {
        requestApi(fileList, fileParams);
    };
    const batchFileDelete = (id: number[]) => {
        let ids = id ? id : select.value.map((item: any) => item.id);
        fileDelete({
            ids,
        }).then((res) => {
            getFileList();
        });
    };
    const batchFileMove = () => {
        let ids = select.value.map((item: any) => item.id);
        fileMove({
            ids,
            cid: moveId.value,
        }).then((res) => {
            moveId.value = 0;
            getFileList();
        });
    };

    const selectFile = (item: any) => {
        console.log(limit)
        let index = select.value.findIndex((items: any) => items.id == item.id);
        if (index != -1) {
            select.value.splice(index, 1);
            return;
        }
        if (select.value.length == limit) {
            if (limit == 1) {
                select.value = [];
                select.value.push(item);
                return;
            }
            ElMessage.warning("已达到选择上限");
            return;
        }
        select.value.push(item);
    };
    return {
        moveId,
        pager,
        fileParams,
        select,
        getFileList,
        batchFileDelete,
        batchFileMove,
        selectFile,
        selectStatus
    };
}

import { reactive } from "vue";

export function usePages(page = 1, size = 15) {
    const pager = reactive({
        page,
        size,
        loading: false,
        count: 0,
        lists: [] as any [],
    });

    const requestApi = (callback: any, params?: object): Promise<any> => {
        // 禁止并发请求
        if (pager.loading) return Promise.reject();
        else pager.loading = true;

        return callback({
            page_no: pager.page,
            page_size: pager.size,
            ...params,
        })
            .then((res: any) => {
                pager.count = res?.count;
                pager.lists = res?.lists;
                return Promise.resolve(res);
            })
            .catch((err: any) => {
                return Promise.reject(err);
            })
            .finally(() => {
                pager.loading = false;
            });
    };

    return {
        pager,
        requestApi,
    };
}

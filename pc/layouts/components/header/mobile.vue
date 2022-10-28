<template>
    <div>
        <ElMenuItem :index="menuItem.path" @click="showMobilePopup = true">
            <template #title>
                <span>
                    {{ menuItem.name }}
                </span>
            </template>
        </ElMenuItem>
        <ClientOnly>
            <ElDialog
                v-model="showMobilePopup"
                @close="showMobilePopup = false"
                :width="700"
            >
                <div class="text-center text-tx-primary">
                    <div class="text-4xl font-medium">移动端演示</div>
                    <div class="flex my-[40px] justify-around">
                        <div v-if="oa">
                            <img :src="oa" class="w-[180px] h-[180px]" alt="" />
                            <div class="mt-2.5">微信公众号演示</div>
                        </div>
                        <div v-if="mnp">
                            <img
                                :src="mnp"
                                class="w-[180px] h-[180px]"
                                alt=""
                            />
                            <div class="mt-2.5">微信小程序演示</div>
                        </div>
                        <div
                            v-if="!mnp && !oa"
                            class="w-[180px] h-[180px] flex items-center justify-center"
                        >
                            暂无演示
                        </div>
                    </div>
                </div>
            </ElDialog>
        </ClientOnly>
    </div>
</template>
<script lang="ts" setup>
import { ElMenuItem, ElDialog } from 'element-plus'
import { useAppStore } from '~~/stores/app'
defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    }
})
const appStore = useAppStore()
const mnp = computed(() => appStore.getQrcodeConfig.mnp)
const oa = computed(() => appStore.getQrcodeConfig.oa)
const showMobilePopup = ref(false)
</script>

<style lang="scss" scoped></style>

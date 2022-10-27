<template>
    <template v-if="!menuItem?.hidden">
        <NuxtLink
            v-if="!hasShowChild"
            :to="routePath"
            class="flex items-center w-full"
            :custom="menuItem.type == 'custom'"
            :external="isExternal(routePath)"
            :target="isExternal(routePath) ? '_blank' : ''"
        >
            <ElMenuItem class="w-full" :index="routePath">
                <template #title>
                    <span>
                        {{ menuItem.name }}
                    </span>
                </template>
            </ElMenuItem>
        </NuxtLink>
        <ElSubMenu v-else :index="routePath" :popper-offset="12">
            <template #title>
                <!-- <Icon
                v-if="menuItem.icon"
                class="menu-item-icon"
                :size="16"
                :name="menuItem.icon"
            /> -->
                <span>{{ menuItem.name }}</span>
            </template>
            <MenuItem
                v-for="item in menuItem.children"
                :key="resolvePath(item.path)"
                :menu-item="item"
                :route-path="resolvePath(item.path)"
            />
        </ElSubMenu>
    </template>
</template>

<script lang="ts" setup>
import { ElMenuItem, ElSubMenu } from 'element-plus'
import { getNormalPath } from '@/utils/util'
import { isExternal } from '@/utils/validate'
const props = defineProps({
    menuItem: {
        type: Object,
        default: () => ({})
    },
    routePath: {
        type: String,
        required: true
    }
})
const hasShowChild = computed(() => {
    const children = props.menuItem.children ?? []
    return !!children.filter((item: any) => !item?.hidden).length
})
const resolvePath = (path: string) => {
    if (isExternal(path)) {
        return path
    }
    const newPath = getNormalPath(`${props.routePath}/${path}`)
    return newPath
}
</script>
<style lang="scss" scoped></style>

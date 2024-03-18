<template>
    <div class="link flex">
        <el-menu
            :default-active="activeMenu"
            class="w-[160px] min-h-[350px] link-menu"
            :default-openeds="[MenuTypeEnum.SHOP_PAGES, MenuTypeEnum.APPTOOL, MenuTypeEnum.OTHER_LINK]"
            @select="handleSelect"
        >
            <el-sub-menu
                v-for="(item, index) in menus"
                :index="item.type"
                :key="index"
            >
                <template #title>
                    <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                    v-for="(sitem, sindex) in item.children"
                    :index="sitem.type"
                    :key="sindex"
                    style="min-width: 160px"
                >
                    <span>{{ sitem.name }}</span>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
        <div class="flex-1 pl-4">
            <shop-pages v-model="activeLink" v-if="LinkTypeEnum.SHOP_PAGES == activeMenu"/>
            <article-list v-model="activeLink" v-if="LinkTypeEnum.ARTICLE_LIST == activeMenu"/>
            <custom-link v-model="activeLink" v-if="LinkTypeEnum.CUSTOM_LINK == activeMenu"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {PropType} from 'vue'
import {LinkTypeEnum, MenuTypeEnum, type Link} from '.'
import ShopPages from './shop-pages.vue'
import CustomLink from './custom-link.vue'
import ArticleList from './article-list.vue'

const props = defineProps({
    modelValue: {
        type: Object as PropType<Link>,
        required: true
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
}>()

const menus = ref([
    {
        name: '商城页面',
        type: MenuTypeEnum.SHOP_PAGES,
        children: [
            {
                name: '基础页面',
                type: LinkTypeEnum.SHOP_PAGES,
                link: {}
            }
        ]
    },
    {
        name: '应用工具',
        type: MenuTypeEnum.APPTOOL,
        children: [
            {
                name: '文章资讯',
                type: LinkTypeEnum.ARTICLE_LIST,
                link: {}
            }
        ]
    },
    {
        name: '其他',
        type: MenuTypeEnum.OTHER_LINK,
        children: [
            {
                name: "自定义链接",
                type: LinkTypeEnum.CUSTOM_LINK,
                link: {},
            },
        ],
    }
])

const activeLink = computed({
    get() {
        let linkStoreage: any = {};
        menus.value.forEach((item) => {
            const res = item.children.find((citem) => citem.type == activeMenu.value);
            if (res) linkStoreage = res;
        });
        return linkStoreage.link;
    },
    set(value) {
        menus.value.forEach((item) => {
            item.children.forEach((citem) => {
                if (citem.type == activeMenu.value) {
                    citem.link = value;
                }
            });
        });
    },
});

const activeMenu = ref<string>(LinkTypeEnum.SHOP_PAGES)

const handleSelect = (index: string) => {
    activeMenu.value = index
}

watch(activeLink, (value) => {
    if (!value.type) return
    emit('update:modelValue', value)
}, {deep: true})

watch(
    () => props.modelValue,
    (value) => {
        activeMenu.value = value.type
        activeLink.value = value
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss" scoped>
.link-menu {
    --el-menu-item-height: 40px;

    :deep(.el-menu-item) {
        border-color: transparent;

        &.is-active {
            border-right-width: 2px;
            border-color: var(--el-color-primary);
            background-color: var(--el-color-primary-light-9);
        }
    }
}
</style>

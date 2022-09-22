<script lang="ts" setup>
import oaMenuForm from './oa-menu-form.vue'

const emit = defineEmits<{
    (event: 'add', value: any): void
    (event: 'edit', value: any): void
}>()

const props = withDefaults(
    defineProps<{
        modular: string
        subItem?: any
    }>(),
    {
        modular: 'edit',
        subItem: {}
    }
)

const menuFormEditRef = shallowRef()
const menuFromPopupRef = shallowRef()

const form = {
    name: '',
    type: 'view',
    url: '',
    appid: '',
    pagepath: ''
}

watchEffect(() => {
    if (Object.keys(props.subItem).length != 0) {
        for (const key in form) {
            //@ts-ignore
            form[key] = props.subItem[key]
        }
    }
})

const handleRules = async () => {
    await menuFormEditRef.value.menuFormRef.validate()
    if (props.modular === 'edit') {
        emit('edit', { ...form })
    } else {
        emit('add', { ...form })
    }
    menuFromPopupRef.value.close()
    menuFormEditRef.value.menuFormRef.resetFields()
}
</script>

<template>
    <popup
        ref="menuFromPopupRef"
        async
        :clickModalClose="false"
        :title="`${modular === 'add' ? '新增' : '编辑'}子菜单`"
        @confirm="handleRules"
    >
        <oa-menu-form
            ref="menuFormEditRef"
            modular="secondary"
            v-model:name="form.name"
            v-model:visitType="form.type"
            v-model:url="form.url"
            v-model:appId="form.appid"
            v-model:pagePath="form.pagepath"
        ></oa-menu-form>
        <template #trigger>
            <slot></slot>
        </template>
    </popup>
</template>

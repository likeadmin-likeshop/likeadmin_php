<template>
    <div class="border border-br flex flex-col" :style="styles">
        <toolbar
            class="border-b border-br"
            :editor="editorRef"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <w-editor
            class="overflow-y-auto flex-1"
            v-model="valueHtml"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="handleCreated"
        />
        <material-picker
            ref="materialPickerRef"
            :limit="-1"
            hidden-upload
            @change="imageSelectChange"
        />
    </div>
</template>
<script setup lang="ts">
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor as WEditor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import MaterialPicker from '@/components/material/picker.vue'
import { addUnit } from '@/utils/util'
import type { CSSProperties } from 'vue'

const props = withDefaults(
    defineProps<{
        modelValue?: string
        mode?: 'default' | 'simple'
        height?: string | number
        width?: string | number
        toolbarConfig?: Partial<IToolbarConfig>
    }>(),
    {
        modelValue: '',
        mode: 'simple',
        height: '100%',
        width: 'auto',
        toolbarConfig: () => ({
            excludeKeys: ['fullScreen']
        })
    }
)

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void
}>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const materialPickerRef = shallowRef<InstanceType<typeof MaterialPicker>>()

let insertImageFn: any

const editorConfig: Partial<IEditorConfig> = {
    MENU_CONF: {
        uploadImage: {
            customBrowseAndUpload(insertFn: any) {
                console.log(insertFn)
                materialPickerRef.value?.showPopup(-1)
                insertImageFn = insertFn
            }
        }
    }
}

const styles = computed<CSSProperties>(() => ({
    height: addUnit(props.height),
    width: addUnit(props.width)
}))
const valueHtml = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})

const imageSelectChange = (image: string[]) => {
    image.forEach((url) => {
        insertImageFn(url)
    })
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
</script>

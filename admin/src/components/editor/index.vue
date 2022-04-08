<template>
  <div
    class="tinymce-boxz"
    :style="{
      'max-width': width + 'px',
      'max-height': height + 'px'
    }"
  >
    <!-- tinymce-vue -->
    <Editor v-model="content" :api-key="tiny.apiKey" :init="tiny.init" />

    <!-- 文件管理器 -->
    <material-select
      :hiddenUpload="true"
      :type="tinymce.type"
      ref="materialRef"
      @change="handleMaterialFile"
    ></material-select>
  </div>
</template>

<script lang="ts" setup>
import Editor from "@tinymce/tinymce-vue";
import { reactive, ref, withDefaults, computed } from "vue";
import materialSelect from '@/components/material-select/index.vue'

/** Props Start **/
const props = withDefaults(defineProps<{
  modelValue?: string
  width?: string
  height?: string
}>(), {
  modelValue: '',
  width: '1000',
  height: '1000'
})

/** Props End **/

/** Emit Start **/
const emit = defineEmits(['update:modelValue'])
/** Emit End **/

/** Computed Start **/
let content = computed({
  get: () => {
    return props.modelValue || ''
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})
/** Computed End **/

/** Data Start **/
const materialRef = ref<InstanceType<typeof materialSelect> | null>(null)

const tinymce = ref<any>({
  callback: null,//回调函数
  type: 'image' //选择文件类型 /image：图片/video：视频
})

// 富文本基础配置
const tiny = reactive({
  apiKey: "mejzqiqf65aswd278mtojz1w7g3zysvdhg3sjen77zf7f6e9",
  init: {
    language: "zh_CN", //语言类型
    placeholder: "在这里输入文字", //textarea中的提示信息
    min_width: props.width,
    min_height: props.height,
    height: props.height, //注：引入autoresize插件时，此属性失效
    resize: "both", //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    branding: false, //tiny技术支持信息是否显
    font_formats:
      "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
    plugins:
      "preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave", //插件配置 axupimgs indent2em
    toolbar: [
      "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
      "styleselect formatselect fontselect fontsizeselect |  table image axupimgs media charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter",
    ], //工具栏配置，设为false则隐藏
    paste_data_images: true, //图片是否可粘贴
    file_picker_types: "file image media",
	convert_urls : false, // false-保持图片域名完整性
    // 文件上传处理函数
    file_picker_callback: (callback: any, value: any, meta: any) => {
      if (meta.filetype == "image") {
        tinymce.value.type = 'image';
      } else if (meta.filetype == "media") {
        tinymce.value.type = 'video';
      } else {
        tinymce.value.type = 'file';
      }
      // 打开资源管理器
      materialRef.value.showPopup(1)
      // 保存回调到全局
      tinymce.value.callback = callback
    }
  }
})
/** Data End **/

/** Methods Start **/
// 确认选择文件时
const handleMaterialFile = (event: Event) => {
  tinymce.value.callback(event);
  materialRef.value.fileList = []
}
/** Methods End **/
</script>
<style scoped>
.tinymce-boxz > textarea {
  display: none;
}
</style>
<style>
/* 隐藏apikey没有绑定当前域名的提示 */
.tox-notifications-container .tox-notification--warning {
  display: none !important;
}

.tox.tox-tinymce {
  max-width: 100%;
}
</style>
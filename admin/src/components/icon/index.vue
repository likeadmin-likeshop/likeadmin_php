<script lang="ts">
import { ElIcon } from 'element-plus'
import { createVNode, defineComponent, h, resolveComponent } from 'vue'

import { EL_ICON_PREFIX, LOCAL_ICON_PREFIX } from './index'
import svgIcon from './svg-icon.vue'

export default defineComponent({
    name: 'Icon',
    props: {
        name: {
            type: String,
            required: true
        },
        size: {
            type: [String, Number],
            default: '14px'
        },
        color: {
            type: String,
            default: 'inherit'
        }
    },
    setup(props) {
        return () => {
            if (props.name.indexOf(EL_ICON_PREFIX) === 0) {
                // el-icon
                return createVNode(
                    ElIcon,
                    {
                        size: props.size,
                        color: props.color
                    },
                    {
                        default: () =>
                            createVNode(resolveComponent(props.name.replace(EL_ICON_PREFIX, '')))
                    }
                )
            }
            if (props.name.indexOf(LOCAL_ICON_PREFIX) === 0) {
                // 本地icon
                return h(
                    'i',
                    {
                        class: ['local-icon']
                    },
                    createVNode(svgIcon, { ...props })
                )
            }
            // 如果name不符合预期的前缀，返回null
            return null
        }
    }
})
</script>

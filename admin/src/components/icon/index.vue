<script lang="ts">
import { createVNode, resolveComponent, defineComponent, computed, CSSProperties } from 'vue'
import { addUnit } from '@/utils/util'
import { ElIcon } from 'element-plus'
export default defineComponent({
	name: 'Icon',
	props: {
		name: {
			type: String,
			required: true
		},
		size: {
			type: [String, Number],
			default: '16px'
		},
		color: {
			type: String,
			default: 'inherit'
		}
	},
	setup(props) {
		const styles = computed<CSSProperties>(() => {
			return {
				fontSize: addUnit(props.size),
				color: props.color
			}
		})
		if (props.name.indexOf('el-icon-') === 0) {
			// el-icon
			return () =>
				createVNode(
					ElIcon,
					{
						color: props.color,
						size: props.size
					},
					() => [createVNode(resolveComponent(props.name.slice(8)))]
				)
		}
		// 本地icon
		return () =>
			createVNode('i', {
				class: [props.name, 'local-icon'],
				style: styles.value
			})
	}
})
</script>

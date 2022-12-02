<script lang="tsx">
import { defineComponent, h } from 'vue'
import type Area from '../area'
import type { PropType } from 'vue'
export default defineComponent({
  props: {
    area: {
      type: Object as PropType<Area>
    }
  },
  setup(props) {
    return () => (
      <div class="main-area">
        {props.area.container.items.map((item) =>
          h(item.content, item.contentProps)
        )}
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.main-area {
  flex: 1;
  min-height: 0;
  background-color: var(--el-page-color);
  box-shadow: var(--el-box-shadow);
  display: flex;
  flex-direction: column;
  padding: 10px;
}
</style>

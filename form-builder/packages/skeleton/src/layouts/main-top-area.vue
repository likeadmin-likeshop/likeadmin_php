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
    const left: any[] = []
    const right: any[] = []
    props.area.container.items.slice().forEach((item) => {
      const content = (
        <div key={`main-top-area-${item.name}`}>
          {h(item.content, item.contentProps)}
        </div>
      )
      if (item.align === 'left') {
        left.push(content)
      } else {
        right.push(content)
      }
    })
    return () => (
      <div class="main-top-area">
        <div class="main-top-area-left">{left}</div>
        <div class="main-top-area-right">{right}</div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.main-top-area {
  height: var(--main-top-area-height);
  display: flex;
  align-items: center;
  background-color: var(--el-bg-color);
  border-bottom: 1px solid var(--el-border-color);
  box-sizing: border-box;
  &-left {
    display: flex;
    align-items: center;
    flex: 1;
  }

  &-right {
    display: flex;
    align-items: center;
    > * {
      margin-left: 4px;
      margin-right: 4px;
    }
  }
}
</style>

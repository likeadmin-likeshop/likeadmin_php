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
    const center: any[] = []
    const right: any[] = []
    props.area.container.items.slice().forEach((item) => {
      const content = (
        <div key={`top-area-${item.name}`}>
          {h(item.content, item.contentProps)}
        </div>
      )
      if (item.align === 'center') {
        center.push(content)
      } else if (item.align === 'left') {
        left.push(content)
      } else {
        right.push(content)
      }
    })
    return () => (
      <div class="top-area">
        <div class="top-area-left">{left}</div>
        <div class="top-area-center">{center}</div>
        <div class="top-area-right">{right}</div>
      </div>
    )
  }
})
</script>

<style lang="scss" scoped>
.top-area {
  height: 100%;
  display: flex;
  align-items: center;
  &-left {
    display: flex;
    align-items: center;
  }

  &-center {
    flex: 1;
    display: flex;
    justify-content: center;
    margin: 0 8px;
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

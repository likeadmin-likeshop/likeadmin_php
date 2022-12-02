export default {
  name: 'button',
  category: '基础字段',
  title: '按钮',
  icon: 'button',
  props: [
    {
      title: '常见属性',
      type: 'group',
      items: [
        {
          name: 'type',
          propType: {
            type: 'oneOf',
            value: ['primary', 'danger', 'link', 'text']
          },
          setter: {
            name: 'SelectSetter',
            props: {
              options: [
                {
                  title: '主按钮',
                  value: 'primary'
                },
                {
                  title: '危险按钮',
                  value: 'danger'
                },
                {
                  title: '链接按钮',
                  value: 'link'
                },
                {
                  title: '类文本按钮',
                  value: 'text'
                }
              ]
            }
          }
        },
        {
          name: 'size',
          propType: {
            type: 'oneOf',
            value: ['default', 'large', 'small']
          },
          setter: {
            name: 'SelectSetter',
            props: {
              options: [
                {
                  title: '大',
                  value: 'default'
                },
                {
                  title: '默认',
                  value: 'large'
                },
                {
                  title: '小',
                  value: 'small'
                }
              ]
            }
          }
        },
        {
          name: 'display',
          title: { label: '是否禁用', tip: 'disabled | 是否为禁用状态' },
          propType: {
            type: 'oneOf',
            value: ['block', 'inline']
          },
          setter: {
            name: 'RadioGroupSetter',
            props: {
              options: [
                {
                  title: '块',
                  value: 'block'
                },
                {
                  title: '行内',
                  value: 'inline'
                }
              ]
            }
          }
        },
        {
          name: 'disabled',
          title: { label: '是否禁用', tip: 'disabled | 是否为禁用状态' },
          propType: 'bool',
          setter: 'BoolSetter',
          defaultValue: false
        },
        {
          name: 'customClass',
          title: { label: '自定义CSS样式', tip: '' },
          propType: 'string',
          setter: 'classSetter'
        },
        {
          name: 'plain',
          title: { label: '是否为朴素按钮' },
          propType: 'boolean',
          setter: 'BoolSetter'
        },
        {
          name: 'text',
          title: { label: '是否为文字按钮' },
          propType: 'boolean',
          setter: 'BoolSetter'
        },
        {
          name: 'round',
          title: { label: '是否为圆角按钮' },
          propType: 'boolean',
          setter: 'BoolSetter'
        }
      ]
    },
    {
      title: '事件属性',
      type: 'group',
      items: [
        {
          name: 'onCreated',
          title: { label: 'onCreated', tip: 'disabled | 是否为禁用状态' },
          setter: 'codeSetter'
        }
      ]
    }
  ]
}

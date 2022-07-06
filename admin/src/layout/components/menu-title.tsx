import Icon from '@/components/icon/index.vue'

interface Props {
  icon: string
  title: string
}
export default function MenuTitle(props: Props) {
  const { icon, title } = props
  return (
    <>
      {icon && <Icon name={icon} />}
      <span>{title}</span>
    </>
  )
}

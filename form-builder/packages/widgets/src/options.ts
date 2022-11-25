export interface Category {
  name: string
  title: string
  widgets?: Record<string, any>[]
}

export class Material {
  materials: Category[]
  constructor() {
    this.materials = []
  }
  addCategory(category: Category) {
    this.materials.push(category)
  }
  addWidget(widget: Record<string, any>) {
    try {
      if (!widget.category) {
        throw Error(`widget ${widget.type} must has category property`)
      }
      const currentCategory = this.materials.find(
        (category) => category.name === widget.category
      )
      if (!currentCategory) {
        throw Error(`${widget.category} is has not found，must be addCategory`)
      }
      if (!currentCategory.widgets) {
        currentCategory.widgets = []
      }
      currentCategory.widgets?.push(widget)
    } catch (error) {
      console.error(error)
    }
  }
}

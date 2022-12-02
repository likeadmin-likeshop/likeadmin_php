import { h } from 'vue'
import { isString } from '@form-builder/shared'

export interface SetterConfig {
  name: string
  props?: Record<string, any>
}

export class Setter {
  constructor(private name: string, private props?: Record<string, any>) {}
  render() {
    return h(this.name, this.props)
  }
}

export function createSetter(setterConfig: SetterConfig | string) {
  return new S()
}

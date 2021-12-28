import { Variables } from "@/styles/export.scss";

/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// 声明vue上的属性
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $variables: Variables;
  }
}

declare module "vue3-draggable" {
  const d: any;
  export default d;
}

declare module "nprogress" {
  export function configure(options: any): void;
  export function start(): void;
  export function done(): void;
}

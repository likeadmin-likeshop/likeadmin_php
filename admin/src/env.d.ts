/// <reference types="vite/client" />

declare module '*.vue' {
    import { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vuedraggable/src/vuedraggable' {
    const d: any
    export default d
}

declare module 'nprogress' {
    export function configure(options: any): void
    export function start(): void
    export function done(): void
}

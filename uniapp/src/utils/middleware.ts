export class MiddleWare {
    private middleware = new Map()
    private nextIterator = this.middleware.values()
    use(fn: any) {
        if (typeof fn !== 'function') {
            throw 'middleware must be a function'
        }
        this.middleware.set(fn, fn)
        return this
    }
    private next(params?: any): any {
        const middleware = this.nextIterator.next().value
        if (middleware) {
            middleware.call(this, this.next.bind(this), params)
        }
    }
    run() {
        this.nextIterator = this.middleware.values()
        this.next()
    }
}

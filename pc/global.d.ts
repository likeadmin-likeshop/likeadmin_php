/// <reference types="vite/client" />
import { Request } from '@/utils/http/request'
declare global {
    const $request: Request
}

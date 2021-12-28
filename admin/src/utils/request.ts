'use strict'

import axios from 'axios'
import { version } from '@/config/app'
const config = {
    baseURL: `${process.env.VUE_APP_BASE_URL}/adminapi`,
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    headers: {
        'content-type': 'application/json',
        version
    },
}

const request = axios.create(config)

request.interceptors.request.use(
    (config) => {
        console.log(config)
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Add a response interceptor
request.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default request

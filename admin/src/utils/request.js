'use strict'

import axios from 'axios'

let config = {
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 60 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
}

const request = axios.create(config)

request.interceptors.request.use(
    (config) => {
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

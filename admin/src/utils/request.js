"use strict";

import axios from "axios";

let config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 60 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
};

const request = axios.create(config);

request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);


export default request;

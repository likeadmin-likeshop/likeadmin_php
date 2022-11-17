globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, createError, createApp, createRouter, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createRouter as createRouter$1 } from 'radix3';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { hash } from 'ohash';
import { parseURL, withQuery, withLeadingSlash, withoutTrailingSlash, joinURL } from 'ufo';
import { createStorage } from 'unstorage';
import { promises } from 'fs';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'url';

const _runtimeConfig = {"app":{"baseURL":"/pc/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routes":{},"envPrefix":"NUXT_"},"public":{"version":"1.4.1","apiPrefix":"/api","client":"4","baseUrl":"/pc/","ssr":"1","apiUrl":""}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject(obj[key])) {
      if (isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config;
function deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  }
  return Object.freeze(object);
}

const globalTiming = globalThis.__timing__ || {
  start: () => 0,
  end: () => 0,
  metrics: []
};
function timingMiddleware(_req, res, next) {
  const start = globalTiming.start();
  const _end = res.end;
  res.end = (data, encoding, callback) => {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!res.headersSent) {
      res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(res, data, encoding, callback);
  };
  next();
}

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

const useStorage = () => storage;

storage.mount('/assets', assets$1);

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl;
    const _resolve = async () => {
      if (!pending[key]) {
        entry.value = void 0;
        entry.integrity = void 0;
        entry.mtime = void 0;
        entry.expires = void 0;
        pending[key] = Promise.resolve(resolver());
      }
      entry.value = await pending[key];
      entry.mtime = Date.now();
      entry.integrity = integrity;
      delete pending[key];
      useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return Promise.resolve(entry);
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const key = (opts.getKey || getKey)(...args);
    const entry = await get(key, () => fn(...args));
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length ? hash(args, {}) : "";
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: (event) => {
      const url = event.req.originalUrl || event.req.url;
      const friendlyName = decodeURI(parseURL(url).pathname).replace(/[^a-zA-Z0-9]/g, "").substring(0, 16);
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    group: opts.group || "nitro/handlers",
    integrity: [
      opts.integrity,
      handler
    ]
  };
  const _cachedHandler = cachedFunction(async (incomingEvent) => {
    const reqProxy = cloneWithProxy(incomingEvent.req, { headers: {} });
    const resHeaders = {};
    const resProxy = cloneWithProxy(incomingEvent.res, {
      statusCode: 200,
      getHeader(name) {
        return resHeaders[name];
      },
      setHeader(name, value) {
        resHeaders[name] = value;
        return this;
      },
      getHeaderNames() {
        return Object.keys(resHeaders);
      },
      hasHeader(name) {
        return name in resHeaders;
      },
      removeHeader(name) {
        delete resHeaders[name];
      },
      getHeaders() {
        return resHeaders;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event);
    const headers = event.res.getHeaders();
    headers.Etag = `W/"${hash(body)}"`;
    headers["Last-Modified"] = new Date().toUTCString();
    const cacheControl = [];
    if (opts.swr) {
      if (opts.maxAge) {
        cacheControl.push(`s-maxage=${opts.maxAge}`);
      }
      if (opts.staleMaxAge) {
        cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
      } else {
        cacheControl.push("stale-while-revalidate");
      }
    } else if (opts.maxAge) {
      cacheControl.push(`max-age=${opts.maxAge}`);
    }
    if (cacheControl.length) {
      headers["Cache-Control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["Last-Modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.res.statusCode = response.code;
    for (const name in response.headers) {
      event.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const plugins = [
  
];

function hasReqHeader(req, header, includes) {
  const value = req.headers[header];
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event.req, "accept", "application/json") || hasReqHeader(event.req, "user-agent", "curl/") || hasReqHeader(event.req, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
}
function normalizeError(error) {
  const cwd = process.cwd();
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Route Not Found" : "Internal Server Error");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  event.res.statusCode = errorObject.statusCode;
  event.res.statusMessage = errorObject.statusMessage;
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    event.res.setHeader("Content-Type", "application/json");
    event.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.req.url?.startsWith("/__nuxt_error");
  let html = !isErrorPage ? await $fetch(withQuery("/__nuxt_error", errorObject)).catch(() => null) : null;
  if (!html) {
    const { template } = await import('../error-500.mjs');
    html = template(errorObject);
  }
  event.res.setHeader("Content-Type", "text/html;charset=UTF-8");
  event.res.end(html);
});

const assets = {
  "/robots.txt": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"18-xHzPGknCTMWEJDCqdccu9JEpJBI\"",
    "mtime": "2022-11-17T06:51:32.466Z",
    "size": 24,
    "path": "../public/robots.txt"
  },
  "/_nuxt/_getTag.ad46567c.js": {
    "type": "application/javascript",
    "etag": "\"5aa-vyow9UfJarR/ddih/A33jQTD98w\"",
    "mtime": "2022-11-17T06:51:32.460Z",
    "size": 1450,
    "path": "../public/_nuxt/_getTag.ad46567c.js"
  },
  "/_nuxt/_id_.3952c4e2.js": {
    "type": "application/javascript",
    "etag": "\"1542-h1cOl+5DjBn9xgKxHXzTazgwtv4\"",
    "mtime": "2022-11-17T06:51:32.459Z",
    "size": 5442,
    "path": "../public/_nuxt/_id_.3952c4e2.js"
  },
  "/_nuxt/_plugin-vue_export-helper.a1a6add7.js": {
    "type": "application/javascript",
    "etag": "\"5b-eFCz/UrraTh721pgAl0VxBNR1es\"",
    "mtime": "2022-11-17T06:51:32.457Z",
    "size": 91,
    "path": "../public/_nuxt/_plugin-vue_export-helper.a1a6add7.js"
  },
  "/_nuxt/_type_.460ec3d0.js": {
    "type": "application/javascript",
    "etag": "\"22e-QWn/ushyOu4hLcfjlIhmhfcIEvo\"",
    "mtime": "2022-11-17T06:51:32.453Z",
    "size": 558,
    "path": "../public/_nuxt/_type_.460ec3d0.js"
  },
  "/_nuxt/asyncData.e3b5afa8.js": {
    "type": "application/javascript",
    "etag": "\"920-XrDNFy18OFXSR+vRQhCstbAuZJg\"",
    "mtime": "2022-11-17T06:51:32.450Z",
    "size": 2336,
    "path": "../public/_nuxt/asyncData.e3b5afa8.js"
  },
  "/_nuxt/blank.b15c52da.js": {
    "type": "application/javascript",
    "etag": "\"10a-cHOL5tKrLacjQ5EPljJfZSreZI4\"",
    "mtime": "2022-11-17T06:51:32.447Z",
    "size": 266,
    "path": "../public/_nuxt/blank.b15c52da.js"
  },
  "/_nuxt/card.vue_vue_type_script_setup_true_lang.6665ff2d.js": {
    "type": "application/javascript",
    "etag": "\"8b6-wRTFPeZr/LZSp/o0ZzPNhEOGsfE\"",
    "mtime": "2022-11-17T06:51:32.443Z",
    "size": 2230,
    "path": "../public/_nuxt/card.vue_vue_type_script_setup_true_lang.6665ff2d.js"
  },
  "/_nuxt/collection.480afdd6.js": {
    "type": "application/javascript",
    "etag": "\"8fc-z6zAUkN4vACLCTD6jD6xDe9i2mE\"",
    "mtime": "2022-11-17T06:51:32.440Z",
    "size": 2300,
    "path": "../public/_nuxt/collection.480afdd6.js"
  },
  "/_nuxt/debounce.2b982d70.js": {
    "type": "application/javascript",
    "etag": "\"5f1-wc2UCg66XB4HX1v6scRmjcOjMkc\"",
    "mtime": "2022-11-17T06:51:32.439Z",
    "size": 1521,
    "path": "../public/_nuxt/debounce.2b982d70.js"
  },
  "/_nuxt/default.0a338cfc.js": {
    "type": "application/javascript",
    "etag": "\"10aea-FnoAmh3tILXSbHTyevs9FbX6abI\"",
    "mtime": "2022-11-17T06:51:32.437Z",
    "size": 68330,
    "path": "../public/_nuxt/default.0a338cfc.js"
  },
  "/_nuxt/default.9ebe9ad9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"680-VJ3Iry68E2gBs5UL+uyNB+LYglg\"",
    "mtime": "2022-11-17T06:51:32.435Z",
    "size": 1664,
    "path": "../public/_nuxt/default.9ebe9ad9.css"
  },
  "/_nuxt/dropdown.6cab61a6.js": {
    "type": "application/javascript",
    "etag": "\"df7-XzSlx1djChpLUkKQV/8cisl20HY\"",
    "mtime": "2022-11-17T06:51:32.431Z",
    "size": 3575,
    "path": "../public/_nuxt/dropdown.6cab61a6.js"
  },
  "/_nuxt/empty_news.35f4c0a6.png": {
    "type": "image/png",
    "etag": "\"6d08-ExmRIolcQvcCw75SEVFQ19vyZXE\"",
    "mtime": "2022-11-17T06:51:32.429Z",
    "size": 27912,
    "path": "../public/_nuxt/empty_news.35f4c0a6.png"
  },
  "/_nuxt/empty_news.6816e804.js": {
    "type": "application/javascript",
    "etag": "\"38e0-+8jr4Mj+px7rsMhYL4oqXE4Yf74\"",
    "mtime": "2022-11-17T06:51:32.426Z",
    "size": 14560,
    "path": "../public/_nuxt/empty_news.6816e804.js"
  },
  "/_nuxt/entry.5522eb0f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5453a-1G0k+IpGh2SuD97LDgfkbH6jk0U\"",
    "mtime": "2022-11-17T06:51:32.421Z",
    "size": 345402,
    "path": "../public/_nuxt/entry.5522eb0f.css"
  },
  "/_nuxt/entry.8b8df3a8.js": {
    "type": "application/javascript",
    "etag": "\"7391c-MW8PLmMvSSPmS27JXw+4Ca/9PEI\"",
    "mtime": "2022-11-17T06:51:32.418Z",
    "size": 473372,
    "path": "../public/_nuxt/entry.8b8df3a8.js"
  },
  "/_nuxt/error-404.18ced855.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-F8gJ3uSz6Dg2HRyb374Ax3RegKE\"",
    "mtime": "2022-11-17T06:51:32.414Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.18ced855.css"
  },
  "/_nuxt/error-404.cf37f794.js": {
    "type": "application/javascript",
    "etag": "\"8e4-34DSmHdF8V/sc681wkzKIJEry6w\"",
    "mtime": "2022-11-17T06:51:32.412Z",
    "size": 2276,
    "path": "../public/_nuxt/error-404.cf37f794.js"
  },
  "/_nuxt/error-500.4b09c668.js": {
    "type": "application/javascript",
    "etag": "\"78c-e97JxqywSxzLcM9jA0B3V2TX9ZI\"",
    "mtime": "2022-11-17T06:51:32.411Z",
    "size": 1932,
    "path": "../public/_nuxt/error-500.4b09c668.js"
  },
  "/_nuxt/error-500.e60962de.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-VhleGjkSRH7z4cQDJV3dxcboMhU\"",
    "mtime": "2022-11-17T06:51:32.409Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.e60962de.css"
  },
  "/_nuxt/error-component.b613f25e.js": {
    "type": "application/javascript",
    "etag": "\"4b5-eaM6p5S0bScNATIp9HlnhCSkfBQ\"",
    "mtime": "2022-11-17T06:51:32.407Z",
    "size": 1205,
    "path": "../public/_nuxt/error-component.b613f25e.js"
  },
  "/_nuxt/icon_wx.7943fed9.png": {
    "type": "image/png",
    "etag": "\"109e-/UFxljBGxjj/goDjtpaSphZXChA\"",
    "mtime": "2022-11-17T06:51:32.405Z",
    "size": 4254,
    "path": "../public/_nuxt/icon_wx.7943fed9.png"
  },
  "/_nuxt/index.02370a6e.js": {
    "type": "application/javascript",
    "etag": "\"2320-b+SPpEs2+2qnN1niacP3KkpLXx8\"",
    "mtime": "2022-11-17T06:51:32.404Z",
    "size": 8992,
    "path": "../public/_nuxt/index.02370a6e.js"
  },
  "/_nuxt/index.02ffb5cd.js": {
    "type": "application/javascript",
    "etag": "\"7463-2iv1HrPWzSNv2WZD2UPJZd19IMQ\"",
    "mtime": "2022-11-17T06:51:32.401Z",
    "size": 29795,
    "path": "../public/_nuxt/index.02ffb5cd.js"
  },
  "/_nuxt/index.07a5e666.js": {
    "type": "application/javascript",
    "etag": "\"875e-5Z48bDiGZ2OyH8jrZ9s4gB10x/I\"",
    "mtime": "2022-11-17T06:51:32.399Z",
    "size": 34654,
    "path": "../public/_nuxt/index.07a5e666.js"
  },
  "/_nuxt/index.2a7613f0.js": {
    "type": "application/javascript",
    "etag": "\"8c0-ntDbuddGcCucWiQyrhF+eZ5Yko8\"",
    "mtime": "2022-11-17T06:51:32.396Z",
    "size": 2240,
    "path": "../public/_nuxt/index.2a7613f0.js"
  },
  "/_nuxt/index.53ba9abb.js": {
    "type": "application/javascript",
    "etag": "\"1b94-PNDkR8zwc6XwYrOcWsbClXXxXPI\"",
    "mtime": "2022-11-17T06:51:32.394Z",
    "size": 7060,
    "path": "../public/_nuxt/index.53ba9abb.js"
  },
  "/_nuxt/index.670c8f2c.js": {
    "type": "application/javascript",
    "etag": "\"7d4-CSGskUVLVFPzMd7Or4uYvc9DwyY\"",
    "mtime": "2022-11-17T06:51:32.391Z",
    "size": 2004,
    "path": "../public/_nuxt/index.670c8f2c.js"
  },
  "/_nuxt/index.870b8815.js": {
    "type": "application/javascript",
    "etag": "\"ab6f-hbMRs7PeDUrhxc/SbYt88xjPh1s\"",
    "mtime": "2022-11-17T06:51:32.388Z",
    "size": 43887,
    "path": "../public/_nuxt/index.870b8815.js"
  },
  "/_nuxt/index.d09a4a3d.js": {
    "type": "application/javascript",
    "etag": "\"2b6d-LR4Elh7/iEZmN4Gw6nX9pUHj5Bs\"",
    "mtime": "2022-11-17T06:51:32.387Z",
    "size": 11117,
    "path": "../public/_nuxt/index.d09a4a3d.js"
  },
  "/_nuxt/index.vue_vue_type_script_setup_true_lang.f49be492.js": {
    "type": "application/javascript",
    "etag": "\"350-f6w3wlLjfsXfKO8PQOcncaj0VSo\"",
    "mtime": "2022-11-17T06:51:32.385Z",
    "size": 848,
    "path": "../public/_nuxt/index.vue_vue_type_script_setup_true_lang.f49be492.js"
  },
  "/_nuxt/info.04ba6d45.js": {
    "type": "application/javascript",
    "etag": "\"689e-rfkklwQ3d3BogbfW+sQ7pLb6aEw\"",
    "mtime": "2022-11-17T06:51:32.383Z",
    "size": 26782,
    "path": "../public/_nuxt/info.04ba6d45.js"
  },
  "/_nuxt/info.39f27bd1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26b-/xrGMzJjpft6Qr5MSAVfMpfKXrE\"",
    "mtime": "2022-11-17T06:51:32.380Z",
    "size": 619,
    "path": "../public/_nuxt/info.39f27bd1.css"
  },
  "/_nuxt/items.vue_vue_type_script_setup_true_lang.eb2e5895.js": {
    "type": "application/javascript",
    "etag": "\"a1d-osLHNKOcbahnkyJBF62iruG5grs\"",
    "mtime": "2022-11-17T06:51:32.378Z",
    "size": 2589,
    "path": "../public/_nuxt/items.vue_vue_type_script_setup_true_lang.eb2e5895.js"
  },
  "/_nuxt/news.50c5a1de.js": {
    "type": "application/javascript",
    "etag": "\"20e-eDC3NcXuJp0cg/oVkjM1DGodnWQ\"",
    "mtime": "2022-11-17T06:51:32.377Z",
    "size": 526,
    "path": "../public/_nuxt/news.50c5a1de.js"
  },
  "/_nuxt/placeholder.1ccc50b9.png": {
    "type": "image/png",
    "etag": "\"1011-ocrS7lxNn/qTI2ZvC7D7p5BJj78\"",
    "mtime": "2022-11-17T06:51:32.375Z",
    "size": 4113,
    "path": "../public/_nuxt/placeholder.1ccc50b9.png"
  },
  "/_nuxt/security.46d6daae.js": {
    "type": "application/javascript",
    "etag": "\"1046-ArWkrzRktMRmUvOi2dRO8BEhgt4\"",
    "mtime": "2022-11-17T06:51:32.373Z",
    "size": 4166,
    "path": "../public/_nuxt/security.46d6daae.js"
  },
  "/_nuxt/security.5713af30.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e6-GMwQn+BO18XG2EShhDp+kyD+ssc\"",
    "mtime": "2022-11-17T06:51:32.371Z",
    "size": 230,
    "path": "../public/_nuxt/security.5713af30.css"
  },
  "/_nuxt/useLockFn.cd461047.js": {
    "type": "application/javascript",
    "etag": "\"df-1CbbeJee35W1QsQzF0gTGCZHUEw\"",
    "mtime": "2022-11-17T06:51:32.369Z",
    "size": 223,
    "path": "../public/_nuxt/useLockFn.cd461047.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = [];

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base of publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = ["HEAD", "GET"];
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler(async (event) => {
  if (event.req.method && !METHODS.includes(event.req.method)) {
    return;
  }
  let id = decodeURIComponent(withLeadingSlash(withoutTrailingSlash(parseURL(event.req.url).pathname)));
  let asset;
  const encodingHeader = String(event.req.headers["accept-encoding"] || "");
  const encodings = encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort().concat([""]);
  if (encodings.length > 1) {
    event.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.res.statusCode = 304;
    event.res.end("Not Modified (etag)");
    return;
  }
  const ifModifiedSinceH = event.req.headers["if-modified-since"];
  if (ifModifiedSinceH && asset.mtime) {
    if (new Date(ifModifiedSinceH) >= new Date(asset.mtime)) {
      event.res.statusCode = 304;
      event.res.end("Not Modified (mtime)");
      return;
    }
  }
  if (asset.type) {
    event.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag) {
    event.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime) {
    event.res.setHeader("Last-Modified", asset.mtime);
  }
  if (asset.encoding) {
    event.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size) {
    event.res.setHeader("Content-Length", asset.size);
  }
  const contents = await readAsset(id);
  event.res.end(contents);
});

const _lazy_eGeyjy = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_eGeyjy, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_eGeyjy, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  h3App.use(config.app.baseURL, timingMiddleware);
  const router = createRouter();
  const routerOptions = createRouter$1({ routes: config.nitro.routes });
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    const referenceRoute = h.route.replace(/:\w+|\*\*/g, "_");
    const routeOptions = routerOptions.lookup(referenceRoute) || {};
    if (routeOptions.swr) {
      handler = cachedEventHandler(handler, {
        group: "nitro/routes"
      });
    }
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(h3App.nodeHandler);
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({ fetch: localFetch, Headers, defaults: { baseURL: config.app.baseURL } });
  globalThis.$fetch = $fetch;
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, nitroApp.h3App.nodeHandler) : new Server$1(nitroApp.h3App.nodeHandler);
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on("unhandledRejection", (err) => console.error("[nitro] [dev] [unhandledRejection] " + err));
  process.on("uncaughtException", (err) => console.error("[nitro] [dev] [uncaughtException] " + err));
}
const nodeServer = {};

export { useRuntimeConfig as a, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map

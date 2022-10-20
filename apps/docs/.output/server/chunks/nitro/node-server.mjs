globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'http';
import { Server } from 'https';
import destr from 'destr';
import { withoutTrailingSlash, getQuery as getQuery$1, parseURL, withQuery, withLeadingSlash, joinURL, isRelative } from 'ufo';
import { createRouter as createRouter$1, toRouteMatcher } from 'radix3';
import { parse as parse$2 } from 'cookie-es';
import { createFetch as createFetch$1, Headers } from 'ohmyfetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase, kebabCase, pascalCase, camelCase } from 'scule';
import { hash } from 'ohash';
import { createStorage, prefixStorage } from 'unstorage';
import overlay from 'unstorage/drivers/overlay';
import memory$1 from 'unstorage/drivers/memory';
import defu from 'defu';
import { promises } from 'fs';
import { dirname, resolve, extname, join } from 'pathe';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import { toString } from 'mdast-util-to-string';
import { preprocess } from 'micromark/lib/preprocess.js';
import { postprocess } from 'micromark/lib/postprocess.js';
import { stringifyPosition } from 'unist-util-stringify-position';
import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { push, splice } from 'micromark-util-chunked';
import { resolveAll } from 'micromark-util-resolve-all';
import remarkEmoji from 'remark-emoji';
import rehypeSlug from 'rehype-slug';
import remarkSqueezeParagraphs from 'remark-squeeze-paragraphs';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { all } from 'mdast-util-to-hast';
import { detab } from 'detab';
import { u } from 'unist-builder';
import { encode } from 'mdurl';
import { position } from 'unist-util-position';
import htmlTags from 'html-tags';
import slugify from 'slugify';
import { visit } from 'unist-util-visit';
import { getHighlighter, BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki-es';
import consola from 'unenv/runtime/npm/consola';

class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = void 0;
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if ("stack" in input) {
    try {
      Object.defineProperty(err, "stack", { get() {
        return input.stack;
      } });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.res.writableEnded) {
    return;
  }
  const h3Error = isError(error) ? error : createError(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.res.writableEnded) {
    return;
  }
  const _code = parseInt(h3Error.statusCode);
  if (_code) {
    event.res.statusCode = _code;
  }
  if (h3Error.statusMessage) {
    event.res.statusMessage = h3Error.statusMessage;
  }
  event.res.setHeader("content-type", MIMES.json);
  event.res.end(JSON.stringify(responseBody, null, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.req.url || "");
}
function getMethod(event, defaultMethod = "GET") {
  return (event.req.method || defaultMethod).toUpperCase();
}
function isMethod(event, expected, allowHead) {
  const method = getMethod(event);
  if (allowHead && method === "HEAD") {
    return true;
  }
  if (typeof expected === "string") {
    if (method === expected) {
      return true;
    }
  } else if (expected.includes(method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected, allowHead)) {
    throw createError({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.req.headers) {
    const val = event.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf-8") {
  assertMethod(event, PayloadMethods);
  if (RawBodySymbol in event.req) {
    const promise2 = Promise.resolve(event.req[RawBodySymbol]);
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if ("body" in event.req) {
    return Promise.resolve(event.req.body);
  }
  if (!parseInt(event.req.headers["content-length"] || "")) {
    return Promise.resolve(void 0);
  }
  const promise = event.req[RawBodySymbol] = new Promise((resolve, reject) => {
    const bodyData = [];
    event.req.on("error", (err) => {
      reject(err);
    }).on("data", (chunk) => {
      bodyData.push(chunk);
    }).on("end", () => {
      resolve(Buffer.concat(bodyData));
    });
  });
  return encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
}
async function readBody(event) {
  if (ParsedBodySymbol in event.req) {
    return event.req[ParsedBodySymbol];
  }
  const body = await readRawBody(event);
  if (event.req.headers["content-type"] === "application/x-www-form-urlencoded") {
    const parsedForm = Object.fromEntries(new URLSearchParams(body));
    return parsedForm;
  }
  const json = destr(body);
  event.req[ParsedBodySymbol] = json;
  return json;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public"].concat(opts.cacheControls || []);
  let cacheMatched = false;
  if (opts.maxAge !== void 0) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.req.headers["if-modified-since"];
    event.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince) {
      if (new Date(ifModifiedSince) >= opts.modifiedTime) {
        cacheMatched = true;
      }
    }
  }
  if (opts.etag) {
    event.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.res.statusCode = 304;
    event.res.end();
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("content-type")) {
    event.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.res.statusCode = code;
  event.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function setResponseHeaders(event, headers) {
  Object.entries(headers).forEach(([name, value]) => event.res.setHeader(name, value));
}
const setHeaders = setResponseHeaders;
function appendResponseHeader(event, name, value) {
  let current = event.res.getHeader(name);
  if (!current) {
    event.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.res.setHeader(name, current.concat(value));
}
const appendHeader = appendResponseHeader;
function isStream(data) {
  return data && typeof data === "object" && typeof data.pipe === "function" && typeof data.on === "function";
}
function sendStream(event, data) {
  return new Promise((resolve, reject) => {
    data.pipe(event.res);
    data.on("end", () => resolve(void 0));
    data.on("error", (error) => reject(createError(error)));
  });
}
const noop = () => {
};
function writeEarlyHints(event, hints, cb = noop) {
  if (!event.res.socket) {
    cb();
    return;
  }
  if (typeof hints === "string" || Array.isArray(hints)) {
    hints = { link: hints };
  }
  if (hints.link) {
    hints.link = Array.isArray(hints.link) ? hints.link : hints.link.split(",");
  }
  const headers = Object.entries(hints).map((e) => [e[0].toLowerCase(), e[1]]);
  if (!headers.length) {
    cb();
    return;
  }
  let hint = "HTTP/1.1 103 Early Hints";
  if (hints.link) {
    hint += `\r
Link: ${hints.link.join(", ")}`;
  }
  for (const [header, value] of headers) {
    if (header === "link") {
      continue;
    }
    hint += `\r
${header}: ${value}`;
  }
  event.res.socket.write(`${hint}\r
\r
`, "utf-8", cb);
}

function parseCookies(event) {
  return parse$2(event.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}

class H3Headers {
  constructor(init) {
    if (!init) {
      this._headers = {};
    } else if (Array.isArray(init)) {
      this._headers = Object.fromEntries(init.map(([key, value]) => [key.toLowerCase(), value]));
    } else if (init && "append" in init) {
      this._headers = Object.fromEntries([...init.entries()]);
    } else {
      this._headers = Object.fromEntries(Object.entries(init).map(([key, value]) => [key.toLowerCase(), value]));
    }
  }
  append(name, value) {
    const _name = name.toLowerCase();
    this.set(_name, [this.get(_name), value].filter(Boolean).join(", "));
  }
  delete(name) {
    delete this._headers[name.toLowerCase()];
  }
  get(name) {
    return this._headers[name.toLowerCase()];
  }
  has(name) {
    return name.toLowerCase() in this._headers;
  }
  set(name, value) {
    this._headers[name.toLowerCase()] = String(value);
  }
  forEach(callbackfn) {
    Object.entries(this._headers).forEach(([key, value]) => callbackfn(value, key, this));
  }
}

class H3Response {
  constructor(body = null, init = {}) {
    this.body = null;
    this.type = "default";
    this.bodyUsed = false;
    this.headers = new H3Headers(init.headers);
    this.status = init.status ?? 200;
    this.statusText = init.statusText || "";
    this.redirected = !!init.status && [301, 302, 307, 308].includes(init.status);
    this._body = body;
    this.url = "";
    this.ok = this.status < 300 && this.status > 199;
  }
  clone() {
    return new H3Response(this.body, {
      headers: this.headers,
      status: this.status,
      statusText: this.statusText
    });
  }
  arrayBuffer() {
    return Promise.resolve(this._body);
  }
  blob() {
    return Promise.resolve(this._body);
  }
  formData() {
    return Promise.resolve(this._body);
  }
  json() {
    return Promise.resolve(this._body);
  }
  text() {
    return Promise.resolve(this._body);
  }
}

class H3Event {
  constructor(req, res) {
    this["__is_event__"] = true;
    this.context = {};
    this.req = req;
    this.res = res;
  }
  respondWith(r) {
    Promise.resolve(r).then((_response) => {
      if (this.res.writableEnded) {
        return;
      }
      const response = _response instanceof H3Response ? _response : new H3Response(_response);
      response.headers.forEach((value, key) => {
        this.res.setHeader(key, value);
      });
      if (response.status) {
        this.res.statusCode = response.status;
      }
      if (response.statusText) {
        this.res.statusMessage = response.statusText;
      }
      if (response.redirected) {
        this.res.setHeader("location", response.url);
      }
      if (!response._body) {
        return this.res.end();
      }
      if (typeof response._body === "string" || "buffer" in response._body || "byteLength" in response._body) {
        return this.res.end(response._body);
      }
      if (!response.headers.has("content-type")) {
        response.headers.set("content-type", MIMES.json);
      }
      this.res.end(JSON.stringify(response._body));
    });
  }
}
function createEvent(req, res) {
  return new H3Event(req, res);
}

function defineEventHandler(handler) {
  handler.__is_handler__ = true;
  return handler;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return "__is_handler__" in input;
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler = r.default || r;
        if (typeof handler !== "function") {
          throw new TypeError("Invalid lazy handler result. It should be a function:", handler);
        }
        _resolved = toEventHandler(r.default || r);
        return _resolved;
      });
    }
    return _promise;
  };
  return eventHandler((event) => {
    if (_resolved) {
      return _resolved(event);
    }
    return resolveHandler().then((handler) => handler(event));
  });
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const app = {
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    handler,
    stack,
    options
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    arg1.forEach((i) => use(app, i, arg2, arg3));
  } else if (Array.isArray(arg2)) {
    arg2.forEach((i) => use(app, arg1, i, arg3));
  } else if (typeof arg1 === "string") {
    app.stack.push(normalizeLayer({ ...arg3, route: arg1, handler: arg2 }));
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, route: "/", handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : void 0;
  return eventHandler(async (event) => {
    event.req.originalUrl = event.req.originalUrl || event.req.url || "/";
    const reqUrl = event.req.url || "/";
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!reqUrl.startsWith(layer.route)) {
          continue;
        }
        event.req.url = reqUrl.slice(layer.route.length) || "/";
      } else {
        event.req.url = reqUrl;
      }
      if (layer.match && !layer.match(event.req.url, event)) {
        continue;
      }
      const val = await layer.handler(event);
      if (event.res.writableEnded) {
        return;
      }
      const type = typeof val;
      if (type === "string") {
        return send(event, val, MIMES.html);
      } else if (isStream(val)) {
        return sendStream(event, val);
      } else if (val === null) {
        event.res.statusCode = 204;
        return send(event);
      } else if (type === "object" || type === "boolean" || type === "number") {
        if (val.buffer) {
          return send(event, val);
        } else if (val instanceof Error) {
          throw createError(val);
        } else {
          return send(event, JSON.stringify(val, null, spacing), MIMES.json);
        }
      }
    }
    if (!event.res.writableEnded) {
      throw createError({
        statusCode: 404,
        statusMessage: `Cannot find any route matching ${event.req.url || "/"}.`
      });
    }
  });
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, null, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      if (app.options.onError) {
        await app.options.onError(error, event);
      } else {
        if (error.unhandled || error.fatal) {
          console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
        }
        await sendError(event, error, !!app.options.debug);
      }
    }
  };
  return toNodeHandle;
}

const RouterMethods = ["connect", "delete", "get", "head", "options", "post", "put", "trace", "patch"];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      method.forEach((m) => addRoute(path, handler, m));
    } else {
      route.handlers[method] = toEventHandler(handler, null, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  router.handler = eventHandler((event) => {
    const path = new URL(event.req.url || "/", "http://localhost").pathname;
    const matched = _router.lookup(path);
    if (!matched) {
      if (opts.preemtive) {
        throw createError({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${event.req.url || "/"}.`
        });
      } else {
        return;
      }
    }
    const method = (event.req.method || "get").toLowerCase();
    const handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      throw createError({
        statusCode: 405,
        name: "Method Not Allowed",
        statusMessage: `Method ${method} is not allowed on this route.`
      });
    }
    const params = matched.params || {};
    event.context.params = params;
    return handler(event);
  });
  return router;
}

const _runtimeConfig = {"app":{"baseURL":"/","buildAssetsDir":"/_nuxt/","cdnURL":""},"nitro":{"routeRules":{"/__nuxt_error":{"cache":false}},"envPrefix":"NUXT_"},"public":{"content":{"clientDB":{"isSPA":false,"integrity":1666293693421},"navigation":{"fields":["icon","titleTemplate","layout"]},"base":"_content","tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"highlight":{"theme":"one-dark-pro","preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"],"apiURL":"/api/_content/highlight"},"wsUrl":"","documentDriven":{"page":true,"navigation":true,"surround":true,"globals":{},"layoutFallbacks":["theme"],"injectPage":true},"anchorLinks":{"depth":4,"exclude":[1]}}},"content":{"cacheVersion":2,"cacheIntegrity":"LjtMKRtVhB","transformers":["/Users/gaetansenn/Development/dewib/librairies/ui/node_modules/@nuxt/content/dist/runtime/transformers/shiki.mjs"],"base":"_content","watch":{"ws":{"port":4000,"hostname":"localhost","showURL":false}},"sources":{},"ignores":["\\.","-"],"locales":[],"highlight":{"theme":"one-dark-pro","preload":["json","js","ts","html","css","vue","diff","shell","markdown","yaml","bash","ini"],"apiURL":"/api/_content/highlight"},"markdown":{"tags":{"p":"prose-p","a":"prose-a","blockquote":"prose-blockquote","code-inline":"prose-code-inline","code":"prose-code","em":"prose-em","h1":"prose-h1","h2":"prose-h2","h3":"prose-h3","h4":"prose-h4","h5":"prose-h5","h6":"prose-h6","hr":"prose-hr","img":"prose-img","ul":"prose-ul","ol":"prose-ol","li":"prose-li","strong":"prose-strong","table":"prose-table","thead":"prose-thead","tbody":"prose-tbody","td":"prose-td","th":"prose-th","tr":"prose-tr"},"anchorLinks":{"depth":4,"exclude":[1]},"remarkPlugins":{},"rehypePlugins":{}},"yaml":{},"csv":{"delimeter":",","json":true},"navigation":{"fields":["icon","titleTemplate","layout"]},"documentDriven":true,"experimental":{"clientDB":false}}};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _runtimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const getEnv = (key) => {
  const envKey = snakeCase(key).toUpperCase();
  return destr(process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]);
};
function isObject$1(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function overrideConfig(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey);
    if (isObject$1(obj[key])) {
      if (isObject$1(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      overrideConfig(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
}
overrideConfig(_runtimeConfig);
const config$1 = deepFreeze(_runtimeConfig);
const useRuntimeConfig = () => config$1;
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
const timingMiddleware = eventHandler((event) => {
  const start = globalTiming.start();
  const _end = event.res.end;
  event.res.end = function(chunk, encoding, cb) {
    const metrics = [["Generate", globalTiming.end(start)], ...globalTiming.metrics];
    const serverTiming = metrics.map((m) => `-;dur=${m[1]};desc="${encodeURIComponent(m[0])}"`).join(", ");
    if (!event.res.headersSent) {
      event.res.setHeader("Server-Timing", serverTiming);
    }
    _end.call(event.res, chunk, encoding, cb);
    return this;
  }.bind(event.res);
});

const _assets = {
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('../raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"20e-BQ95e3QlDFZejedR0ftJ7i7EYAc\"","mtime":"2022-10-20T19:21:43.320Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('../raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"283-36DcnT6OwhdvImWFj4RFVg+UBAY\"","mtime":"2022-10-20T19:21:43.320Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:0.index.md"]: {
    import: () => import('../raw/0.index.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"208e-EgtwK+4A19HMx5Vonx3dd/l0OWg\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:1.get-started.md"]: {
    import: () => import('../raw/1.get-started.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2d1d-vNMWEoDtECXZSSvuHqtY5sYLrIg\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:1.features.md"]: {
    import: () => import('../raw/1.features.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"102d-GDSDB4eCSqSrzTXw7p42SUZLnZo\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:2.configuration.md"]: {
    import: () => import('../raw/2.configuration.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"13610-pipNjT8uK2B4jytbEviCajKQRJ8\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:3.content-creation.md"]: {
    import: () => import('../raw/3.content-creation.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1e4c-oxZk20hF8usBq/eVr+W+QycDhJA\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:4.front-matter.md"]: {
    import: () => import('../raw/4.front-matter.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5192-zKbMzw0dldLfTGX1t2oUObXAMbo\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:2.guide:_dir.yml"]: {
    import: () => import('../raw/_dir.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"11b-248kClCt9PRLPMI0yY5EfJN4g84\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.api:1.components.md"]: {
    import: () => import('../raw/1.components.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1b053-LVvPPKvMWhGx/vNOIIPddR8dLWg\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.api:2.composables.md"]: {
    import: () => import('../raw/2.composables.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"72da-uECijh0Rr+p+BB02XEa9uOyRB6s\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.api:3.layouts.md"]: {
    import: () => import('../raw/3.layouts.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"308e-6sSXqbTkrBU82dJgfeMrbaxkwds\"","mtime":"2022-10-20T19:21:43.321Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:3.api:_dir.yml"]: {
    import: () => import('../raw/_dir2.mjs').then(r => r.default || r),
    meta: {"type":"text/yaml; charset=utf-8","etag":"\"113-/p6lG2/Q5k6AY/VqgvfNhbRnFUc\"","mtime":"2022-10-20T19:21:43.321Z"}
  }
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

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memory$1(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(createRouter$1({ routes: config.nitro.routeRules }));
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(event, routeRules.redirect.to, routeRules.redirect.statusCode);
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(path);
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

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
  const validate = opts.validate || (() => true);
  async function get(key, resolver) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
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
      if (validate(entry)) {
        useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
      }
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
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
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
    let _resSendBody;
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
      },
      end(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      write(chunk, arg2, arg3) {
        if (typeof chunk === "string") {
          _resSendBody = chunk;
        }
        if (typeof arg2 === "function") {
          arg2();
        }
        if (typeof arg3 === "function") {
          arg3();
        }
        return this;
      },
      writeHead(statusCode, headers2) {
        this.statusCode = statusCode;
        if (headers2) {
          for (const header in headers2) {
            this.setHeader(header, headers2[header]);
          }
        }
        return this;
      }
    });
    const event = createEvent(reqProxy, resProxy);
    event.context = incomingEvent.context;
    const body = await handler(event) || _resSendBody;
    const headers = event.res.getHeaders();
    headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
    headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || new Date().toUTCString();
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
      headers["cache-control"] = cacheControl.join(", ");
    }
    const cacheEntry = {
      code: event.res.statusCode,
      headers,
      body
    };
    return cacheEntry;
  }, _opts);
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.res.headersSent || event.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
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

const nitro = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext, { event }) => {
    const content = event?.pinceauContent || "";
    htmlContext.head.push(`<style id="pinceau">${content}</style>`);
  });
});

const script = "const w=window,de=document.documentElement,knownColorSchemes=[\"dark\",\"light\"],preference=window.localStorage.getItem(\"nuxt-color-mode\")||\"system\";let value=preference===\"system\"?getColorScheme():preference;const forcedColorMode=de.getAttribute(\"data-color-mode-forced\");forcedColorMode&&(value=forcedColorMode),addColorScheme(value),w[\"__NUXT_COLOR_MODE__\"]={preference,value,getColorScheme,addColorScheme,removeColorScheme};function addColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.add(o):de.className+=\" \"+o,t&&de.setAttribute(\"data-\"+t,e)}function removeColorScheme(e){const o=\"\"+e+\"\",t=\"theme\";de.classList?de.classList.remove(o):de.className=de.className.replace(new RegExp(o,\"g\"),\"\"),t&&de.removeAttribute(\"data-\"+t)}function prefersColorScheme(e){return w.matchMedia(\"(prefers-color-scheme\"+e+\")\")}function getColorScheme(){if(w.matchMedia&&prefersColorScheme(\"\").media!==\"not all\"){for(const e of knownColorSchemes)if(prefersColorScheme(\":\"+e).matches)return e}return\"light\"}\n";

const _D5VPbWv2S0 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

const plugins = [
  nitro,
_D5VPbWv2S0
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || event.req.url?.endsWith(".json") || event.req.url?.includes("/api/");
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
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
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
  event.res.statusCode = errorObject.statusCode !== 200 && errorObject.statusCode || 500;
  if (errorObject.statusMessage) {
    event.res.statusMessage = errorObject.statusMessage;
  }
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
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"3c2e-NdIOb/y2LIhsyDoZpNu8MDDd7xQ\"",
    "mtime": "2022-10-20T19:21:40.145Z",
    "size": 15406,
    "path": "../public/favicon.ico"
  },
  "/logo-dark.svg": {
    "type": "image/svg+xml",
    "etag": "\"164c-3F8Bwoi68eBPIZG0mkuaefRdURE\"",
    "mtime": "2022-10-20T19:21:40.145Z",
    "size": 5708,
    "path": "../public/logo-dark.svg"
  },
  "/logo-light.svg": {
    "type": "image/svg+xml",
    "etag": "\"1644-VOBXF7PfEceR/ehsihacR5t2hxE\"",
    "mtime": "2022-10-20T19:21:40.145Z",
    "size": 5700,
    "path": "../public/logo-light.svg"
  },
  "/social-card-preview.png": {
    "type": "image/png",
    "etag": "\"35909-5J+erS2uZP14tVeg7C5PFt8OTKM\"",
    "mtime": "2022-10-20T19:21:40.145Z",
    "size": 219401,
    "path": "../public/social-card-preview.png"
  },
  "/_nuxt/Alert.965d095a.js": {
    "type": "application/javascript",
    "etag": "\"5a-UtjfKyIFNdextwawgtF0IVDAK9c\"",
    "mtime": "2022-10-20T19:21:40.144Z",
    "size": 90,
    "path": "../public/_nuxt/Alert.965d095a.js"
  },
  "/_nuxt/AppContainer.8822ccb3.js": {
    "type": "application/javascript",
    "etag": "\"5b-KZhnTooYREY9/GHf9rnY94dDWTo\"",
    "mtime": "2022-10-20T19:21:40.144Z",
    "size": 91,
    "path": "../public/_nuxt/AppContainer.8822ccb3.js"
  },
  "/_nuxt/AppFooter.6a9292a4.js": {
    "type": "application/javascript",
    "etag": "\"5b-JGKsM1cqPZ13327ReXHtxSsqzoI\"",
    "mtime": "2022-10-20T19:21:40.144Z",
    "size": 91,
    "path": "../public/_nuxt/AppFooter.6a9292a4.js"
  },
  "/_nuxt/AppLayout.14af6d1c.js": {
    "type": "application/javascript",
    "etag": "\"5b-7eMdwANSFSvNrQ9icHISattmI4Y\"",
    "mtime": "2022-10-20T19:21:40.144Z",
    "size": 91,
    "path": "../public/_nuxt/AppLayout.14af6d1c.js"
  },
  "/_nuxt/AppSearch.8a5938bc.js": {
    "type": "application/javascript",
    "etag": "\"5b-ZyHBzwelnNuRO8Sjx0RzjjksA2U\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 91,
    "path": "../public/_nuxt/AppSearch.8a5938bc.js"
  },
  "/_nuxt/ArticleHero.ef59f03d.js": {
    "type": "application/javascript",
    "etag": "\"6bf-AiPe/Wb8dm7Q2/HAYUSzdY0yFEw\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 1727,
    "path": "../public/_nuxt/ArticleHero.ef59f03d.js"
  },
  "/_nuxt/Badge.2d83ff1b.js": {
    "type": "application/javascript",
    "etag": "\"be-V5+BSA8DQUTTcNvvJKZwp8HbeIQ\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 190,
    "path": "../public/_nuxt/Badge.2d83ff1b.js"
  },
  "/_nuxt/Badge.vue_vue_type_script_setup_true_lang.2d178dce.js": {
    "type": "application/javascript",
    "etag": "\"1db-pOtrJAg/33sOHFeTo/isNyfdBW4\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 475,
    "path": "../public/_nuxt/Badge.vue_vue_type_script_setup_true_lang.2d178dce.js"
  },
  "/_nuxt/BlockHero.44451960.js": {
    "type": "application/javascript",
    "etag": "\"795-hC1Yadj0oICGGzTt4SmfaybBSQE\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 1941,
    "path": "../public/_nuxt/BlockHero.44451960.js"
  },
  "/_nuxt/ButtonLink.882025a8.js": {
    "type": "application/javascript",
    "etag": "\"315-rPQ/W9EJOslZ11O8oJMH+0Rj8zQ\"",
    "mtime": "2022-10-20T19:21:40.143Z",
    "size": 789,
    "path": "../public/_nuxt/ButtonLink.882025a8.js"
  },
  "/_nuxt/Callout.00827a0b.js": {
    "type": "application/javascript",
    "etag": "\"c2-IswzTNn4pCuCg+aJwIn4yAzg2u4\"",
    "mtime": "2022-10-20T19:21:40.142Z",
    "size": 194,
    "path": "../public/_nuxt/Callout.00827a0b.js"
  },
  "/_nuxt/Callout.vue_vue_type_script_setup_true_lang.e4a95658.js": {
    "type": "application/javascript",
    "etag": "\"3a1-T1KBwjaHEEOYgP5BRtSP7jte1to\"",
    "mtime": "2022-10-20T19:21:40.142Z",
    "size": 929,
    "path": "../public/_nuxt/Callout.vue_vue_type_script_setup_true_lang.e4a95658.js"
  },
  "/_nuxt/Card.89b85ce1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"9f4-8OC3/lTTlofVRCRGcHXC7q7gbJU\"",
    "mtime": "2022-10-20T19:21:40.142Z",
    "size": 2548,
    "path": "../public/_nuxt/Card.89b85ce1.css"
  },
  "/_nuxt/Card.a75cc12b.js": {
    "type": "application/javascript",
    "etag": "\"412-jgcNhxkGzKOIsZ9E8lbJvhNMW6M\"",
    "mtime": "2022-10-20T19:21:40.142Z",
    "size": 1042,
    "path": "../public/_nuxt/Card.a75cc12b.js"
  },
  "/_nuxt/CardGrid.6f289233.js": {
    "type": "application/javascript",
    "etag": "\"24e-t4BYR9IzbeASaETesu11aXcK3Yw\"",
    "mtime": "2022-10-20T19:21:40.142Z",
    "size": 590,
    "path": "../public/_nuxt/CardGrid.6f289233.js"
  },
  "/_nuxt/CodeBlock.02a49c83.js": {
    "type": "application/javascript",
    "etag": "\"1f9-hqAyxzAg5xfJqQzBg+NkvW8hOsQ\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 505,
    "path": "../public/_nuxt/CodeBlock.02a49c83.js"
  },
  "/_nuxt/CodeBlock.35387c81.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5d-1zUVQrB5mhOJY+lxc5EX5ZXGCH8\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 93,
    "path": "../public/_nuxt/CodeBlock.35387c81.css"
  },
  "/_nuxt/CodeGroup.60e59c92.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"590-9mXz1wOjvbJcPCZFXpsYb8wwTYA\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 1424,
    "path": "../public/_nuxt/CodeGroup.60e59c92.css"
  },
  "/_nuxt/CodeGroup.611de4c8.js": {
    "type": "application/javascript",
    "etag": "\"e5-M9mg08L1ARiP4rCLPf2ExOvMkdU\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 229,
    "path": "../public/_nuxt/CodeGroup.611de4c8.js"
  },
  "/_nuxt/CodeGroup.vue_vue_type_style_index_1_scoped_59fe1296_lang.2596d56a.js": {
    "type": "application/javascript",
    "etag": "\"405-MknEubJ0zPs9/Mb24wGYOn3VyhI\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 1029,
    "path": "../public/_nuxt/CodeGroup.vue_vue_type_style_index_1_scoped_59fe1296_lang.2596d56a.js"
  },
  "/_nuxt/ColorModeSwitch.13321ba8.js": {
    "type": "application/javascript",
    "etag": "\"5b-JIdT9gZyzWCdnq76YyhLJgi54hE\"",
    "mtime": "2022-10-20T19:21:40.141Z",
    "size": 91,
    "path": "../public/_nuxt/ColorModeSwitch.13321ba8.js"
  },
  "/_nuxt/ContentDoc.fe31d522.js": {
    "type": "application/javascript",
    "etag": "\"544-SCtN6h7XPo6w3n5lzmUnEcHpejk\"",
    "mtime": "2022-10-20T19:21:40.140Z",
    "size": 1348,
    "path": "../public/_nuxt/ContentDoc.fe31d522.js"
  },
  "/_nuxt/ContentList.bb18beae.js": {
    "type": "application/javascript",
    "etag": "\"365-Orli4MFOEsyq3yJYEclfbT2EJrs\"",
    "mtime": "2022-10-20T19:21:40.140Z",
    "size": 869,
    "path": "../public/_nuxt/ContentList.bb18beae.js"
  },
  "/_nuxt/ContentNavigation.21551140.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"11dd-4zdPIBJG66d5pnvPpLRmOrQGnpA\"",
    "mtime": "2022-10-20T19:21:40.140Z",
    "size": 4573,
    "path": "../public/_nuxt/ContentNavigation.21551140.css"
  },
  "/_nuxt/ContentNavigation.513ff31c.js": {
    "type": "application/javascript",
    "etag": "\"6fd5-md5EI1yp5vUZkNvOENKmMmeeyAA\"",
    "mtime": "2022-10-20T19:21:40.140Z",
    "size": 28629,
    "path": "../public/_nuxt/ContentNavigation.513ff31c.js"
  },
  "/_nuxt/ContentQuery.98e5767c.js": {
    "type": "application/javascript",
    "etag": "\"879-DPAd2ZXeGx3kzgqazmTqVwK4kUM\"",
    "mtime": "2022-10-20T19:21:40.140Z",
    "size": 2169,
    "path": "../public/_nuxt/ContentQuery.98e5767c.js"
  },
  "/_nuxt/CopyButton.b803a237.js": {
    "type": "application/javascript",
    "etag": "\"e4-sxiyC8yEgSlbDJ8c/fNpJHOBMlo\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 228,
    "path": "../public/_nuxt/CopyButton.b803a237.js"
  },
  "/_nuxt/CopyButton.vue_vue_type_script_setup_true_lang.bf2f5c67.js": {
    "type": "application/javascript",
    "etag": "\"2c9-sWFxe5uzAS73kLyd/ACFycoZVEg\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 713,
    "path": "../public/_nuxt/CopyButton.vue_vue_type_script_setup_true_lang.bf2f5c67.js"
  },
  "/_nuxt/DocsAside.835ca646.js": {
    "type": "application/javascript",
    "etag": "\"c6-4j5tTUY1HdJlvK2GrVf/p8e3S3g\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 198,
    "path": "../public/_nuxt/DocsAside.835ca646.js"
  },
  "/_nuxt/DocsAside.vue_vue_type_script_setup_true_lang.baa9c6d7.js": {
    "type": "application/javascript",
    "etag": "\"56b-Q+cZ48PsfiqqUMT0Mv8V0iC5itM\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 1387,
    "path": "../public/_nuxt/DocsAside.vue_vue_type_script_setup_true_lang.baa9c6d7.js"
  },
  "/_nuxt/DocsAsideTree.21a3c3bd.js": {
    "type": "application/javascript",
    "etag": "\"5b-lcibg6y9Ogxz+GatQLvuvH/pAcs\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 91,
    "path": "../public/_nuxt/DocsAsideTree.21a3c3bd.js"
  },
  "/_nuxt/DocsPageBottom.56cbf2df.js": {
    "type": "application/javascript",
    "etag": "\"162-Gibu5OQgNe4BVyPGqGeaFYEkEuU\"",
    "mtime": "2022-10-20T19:21:40.139Z",
    "size": 354,
    "path": "../public/_nuxt/DocsPageBottom.56cbf2df.js"
  },
  "/_nuxt/DocsPageBottom.vue_vue_type_script_setup_true_lang.82cbce12.js": {
    "type": "application/javascript",
    "etag": "\"437-CA+EfsfmZSnWVsugT9HTq1E1kMU\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 1079,
    "path": "../public/_nuxt/DocsPageBottom.vue_vue_type_script_setup_true_lang.82cbce12.js"
  },
  "/_nuxt/DocsPageContent.11245799.js": {
    "type": "application/javascript",
    "etag": "\"f57-U1kWjXVFeMaNxDYuVZHiPHXd0TU\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 3927,
    "path": "../public/_nuxt/DocsPageContent.11245799.js"
  },
  "/_nuxt/DocsPageContent.bbfa870b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"993-k3Z9CzUugJgk5DVVSMHscrtyPas\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 2451,
    "path": "../public/_nuxt/DocsPageContent.bbfa870b.css"
  },
  "/_nuxt/DocsPrevNext.0010b8cd.js": {
    "type": "application/javascript",
    "etag": "\"cc-VGHJ/Or6mtZ/kAPODiJmp8HL2K4\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 204,
    "path": "../public/_nuxt/DocsPrevNext.0010b8cd.js"
  },
  "/_nuxt/DocsPrevNext.vue_vue_type_script_setup_true_lang.fc355fa1.js": {
    "type": "application/javascript",
    "etag": "\"679-p/ICnr8FTJJnyRwOBEA4/AJMaPg\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 1657,
    "path": "../public/_nuxt/DocsPrevNext.vue_vue_type_script_setup_true_lang.fc355fa1.js"
  },
  "/_nuxt/DocsToc.4ac1eb4f.js": {
    "type": "application/javascript",
    "etag": "\"109-O70rQgWef30RrB7Z1NiGIPvA+MA\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 265,
    "path": "../public/_nuxt/DocsToc.4ac1eb4f.js"
  },
  "/_nuxt/DocsToc.vue_vue_type_script_setup_true_lang.ef223fc9.js": {
    "type": "application/javascript",
    "etag": "\"29c-/wlsZjxqBtEL7qc7IuovckJhBj4\"",
    "mtime": "2022-10-20T19:21:40.138Z",
    "size": 668,
    "path": "../public/_nuxt/DocsToc.vue_vue_type_script_setup_true_lang.ef223fc9.js"
  },
  "/_nuxt/DocsTocLinks.66857578.js": {
    "type": "application/javascript",
    "etag": "\"cc-Tkd3YxYBZTNEibQaPbj0l0gQEdU\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 204,
    "path": "../public/_nuxt/DocsTocLinks.66857578.js"
  },
  "/_nuxt/DocsTocLinks.vue_vue_type_script_setup_true_lang.440137d6.js": {
    "type": "application/javascript",
    "etag": "\"663-gDG5iUDO70tmTMb1Np+5Scm1OCk\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 1635,
    "path": "../public/_nuxt/DocsTocLinks.vue_vue_type_script_setup_true_lang.440137d6.js"
  },
  "/_nuxt/DocumentDrivenNotFound.37a57652.js": {
    "type": "application/javascript",
    "etag": "\"3a6-uSAbJBArYQ63Uk9HP5r4JAKq/gk\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 934,
    "path": "../public/_nuxt/DocumentDrivenNotFound.37a57652.js"
  },
  "/_nuxt/Ellipsis.0d0b1c08.js": {
    "type": "application/javascript",
    "etag": "\"1a9-BCapJ/4GGWOUWz8h2JmEqJcgdHc\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 425,
    "path": "../public/_nuxt/Ellipsis.0d0b1c08.js"
  },
  "/_nuxt/Ellipsis.3c3a7eb5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10d-0NpNn1XbU7TJUMxQOXeCmbeNKpY\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 269,
    "path": "../public/_nuxt/Ellipsis.3c3a7eb5.css"
  },
  "/_nuxt/Icon.8f289e7d.js": {
    "type": "application/javascript",
    "etag": "\"5a-AgIpCBZvMFAb7uBEkQm/69d1g5M\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 90,
    "path": "../public/_nuxt/Icon.8f289e7d.js"
  },
  "/_nuxt/IconCodeSandBox.bbd3edf1.js": {
    "type": "application/javascript",
    "etag": "\"1a9-VffzQpArCtMzBopsnkYWla3MXqM\"",
    "mtime": "2022-10-20T19:21:40.137Z",
    "size": 425,
    "path": "../public/_nuxt/IconCodeSandBox.bbd3edf1.js"
  },
  "/_nuxt/IconDocus.484a6643.js": {
    "type": "application/javascript",
    "etag": "\"31a-nMG5BhyUKf2uohKa5Bbpr5HmXSQ\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 794,
    "path": "../public/_nuxt/IconDocus.484a6643.js"
  },
  "/_nuxt/IconMarkdown.cb4f77ca.js": {
    "type": "application/javascript",
    "etag": "\"268-DiyutqjcNiKRoMSSwNNOLfTXnAo\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 616,
    "path": "../public/_nuxt/IconMarkdown.cb4f77ca.js"
  },
  "/_nuxt/IconNuxt.c22b5faa.js": {
    "type": "application/javascript",
    "etag": "\"308-Bbilh/fmuMtlJkFG1nHoJApGk10\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 776,
    "path": "../public/_nuxt/IconNuxt.c22b5faa.js"
  },
  "/_nuxt/IconNuxtContent.92273100.js": {
    "type": "application/javascript",
    "etag": "\"4a5-9zsrcbf0NUKJenCRowOprBUkrao\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 1189,
    "path": "../public/_nuxt/IconNuxtContent.92273100.js"
  },
  "/_nuxt/IconNuxtLabs.a22768ff.js": {
    "type": "application/javascript",
    "etag": "\"566-95p6Fw5bH9Cl2+vcbDvU9PFKLa0\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 1382,
    "path": "../public/_nuxt/IconNuxtLabs.a22768ff.js"
  },
  "/_nuxt/IconStackBlitz.79678365.js": {
    "type": "application/javascript",
    "etag": "\"160-o83OF5/ST4TDzYli0kgBPr4Mrf4\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 352,
    "path": "../public/_nuxt/IconStackBlitz.79678365.js"
  },
  "/_nuxt/IconVueTelescope.1583f12f.js": {
    "type": "application/javascript",
    "etag": "\"2cf-wxiCajXdEN2CAVnEAZNP8Z8LY34\"",
    "mtime": "2022-10-20T19:21:40.136Z",
    "size": 719,
    "path": "../public/_nuxt/IconVueTelescope.1583f12f.js"
  },
  "/_nuxt/List.1a92e24f.js": {
    "type": "application/javascript",
    "etag": "\"b4-08CCsXkEn6rsg+7fn4KYevEnwe4\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 180,
    "path": "../public/_nuxt/List.1a92e24f.js"
  },
  "/_nuxt/List.8f1ece3a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2b3-g9qhDNCZtYLaEW00XbJIY8zOxLw\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 691,
    "path": "../public/_nuxt/List.8f1ece3a.css"
  },
  "/_nuxt/List.vue_vue_type_style_index_0_lang.0b1bff85.js": {
    "type": "application/javascript",
    "etag": "\"340-qddKZykxgTSZxRyVpp/yOLZ86JY\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 832,
    "path": "../public/_nuxt/List.vue_vue_type_style_index_0_lang.0b1bff85.js"
  },
  "/_nuxt/Markdown.bf78919e.js": {
    "type": "application/javascript",
    "etag": "\"127-1M2dyOdoH72S07S9CmRpMXzAp/g\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 295,
    "path": "../public/_nuxt/Markdown.bf78919e.js"
  },
  "/_nuxt/NavbarDialog.f1dc14cb.js": {
    "type": "application/javascript",
    "etag": "\"5b-wBrGSBzduCqG5HEc3wBpkeNjWp0\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 91,
    "path": "../public/_nuxt/NavbarDialog.f1dc14cb.js"
  },
  "/_nuxt/NavbarLogo.5076e153.js": {
    "type": "application/javascript",
    "etag": "\"5b-w403SEHM/B0BWPmAUh4FPgCJnpU\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 91,
    "path": "../public/_nuxt/NavbarLogo.5076e153.js"
  },
  "/_nuxt/NuxtImg.7cea8e34.js": {
    "type": "application/javascript",
    "etag": "\"ac-76/Ky7Q+HvQmTsNtJqebRFfSsog\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 172,
    "path": "../public/_nuxt/NuxtImg.7cea8e34.js"
  },
  "/_nuxt/NuxtImg.vue_vue_type_script_lang.d5babce1.js": {
    "type": "application/javascript",
    "etag": "\"231-VyMvxQtzJrmI9VoF2tCFeWsIpW8\"",
    "mtime": "2022-10-20T19:21:40.135Z",
    "size": 561,
    "path": "../public/_nuxt/NuxtImg.vue_vue_type_script_lang.d5babce1.js"
  },
  "/_nuxt/PageContributors.8f6d6d55.js": {
    "type": "application/javascript",
    "etag": "\"d4-kndIhQpr+iP7g+woq5CE9ExMzLA\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 212,
    "path": "../public/_nuxt/PageContributors.8f6d6d55.js"
  },
  "/_nuxt/PageContributors.vue_vue_type_script_setup_true_lang.fc26feef.js": {
    "type": "application/javascript",
    "etag": "\"51c-f74yff2rRTxBkkFcd2zJ8wJO/Mg\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 1308,
    "path": "../public/_nuxt/PageContributors.vue_vue_type_script_setup_true_lang.fc26feef.js"
  },
  "/_nuxt/PageEditLink.e1b816bf.js": {
    "type": "application/javascript",
    "etag": "\"cc-lebX+qhFKDhM4+hTT9VCVfUBHZ0\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 204,
    "path": "../public/_nuxt/PageEditLink.e1b816bf.js"
  },
  "/_nuxt/PageEditLink.vue_vue_type_script_setup_true_lang.688811cb.js": {
    "type": "application/javascript",
    "etag": "\"2ea-SftH6fqew4qLmgrQmoLlLLwsm7k\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 746,
    "path": "../public/_nuxt/PageEditLink.vue_vue_type_script_setup_true_lang.688811cb.js"
  },
  "/_nuxt/Props.9ecf2725.js": {
    "type": "application/javascript",
    "etag": "\"c52-jwc0E8ZAB7I+AF2Bx0c8NOa3rR0\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 3154,
    "path": "../public/_nuxt/Props.9ecf2725.js"
  },
  "/_nuxt/ProseA.3d28fcf7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f3-niGSHz3WBUFtE/38HMd9NTo2MYY\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 243,
    "path": "../public/_nuxt/ProseA.3d28fcf7.css"
  },
  "/_nuxt/ProseA.721b6a7c.js": {
    "type": "application/javascript",
    "etag": "\"213-+mULP0ngpWaWsfuGH4S8KQo26ME\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 531,
    "path": "../public/_nuxt/ProseA.721b6a7c.js"
  },
  "/_nuxt/ProseBlockquote.6dda85c8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2c5-N1+oyL7bSp2DwUhvLWq3Xthv0KE\"",
    "mtime": "2022-10-20T19:21:40.134Z",
    "size": 709,
    "path": "../public/_nuxt/ProseBlockquote.6dda85c8.css"
  },
  "/_nuxt/ProseBlockquote.e1ddb290.js": {
    "type": "application/javascript",
    "etag": "\"145-NcyYTB7ZBfHgxIIOtGZwvP6712I\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 325,
    "path": "../public/_nuxt/ProseBlockquote.e1ddb290.js"
  },
  "/_nuxt/ProseCode.8a00d4fd.js": {
    "type": "application/javascript",
    "etag": "\"3fc-OkAcdnI/nNWWu+8lAujSvDUWs/A\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 1020,
    "path": "../public/_nuxt/ProseCode.8a00d4fd.js"
  },
  "/_nuxt/ProseCode.b35aaba1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"62b-Es0jnG37EolGbK5Usa215uLmwCI\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 1579,
    "path": "../public/_nuxt/ProseCode.b35aaba1.css"
  },
  "/_nuxt/ProseCodeInline.1d1e9a03.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7d5-1AaUanKYAzxuJ2UkBM3NcQB0DOo\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 2005,
    "path": "../public/_nuxt/ProseCodeInline.1d1e9a03.css"
  },
  "/_nuxt/ProseCodeInline.bb2dfa43.js": {
    "type": "application/javascript",
    "etag": "\"e9-HsEKy1TjqeE0Np+Ifk9HtHsu5EA\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 233,
    "path": "../public/_nuxt/ProseCodeInline.bb2dfa43.js"
  },
  "/_nuxt/ProseEm.2909313a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3a-/ruvM8GBJMVnMsPNLIS5kDLabX4\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 58,
    "path": "../public/_nuxt/ProseEm.2909313a.css"
  },
  "/_nuxt/ProseEm.7209e3ec.js": {
    "type": "application/javascript",
    "etag": "\"135-Ct//S5RgcTV6d72/7SCc9zoDK5Y\"",
    "mtime": "2022-10-20T19:21:40.133Z",
    "size": 309,
    "path": "../public/_nuxt/ProseEm.7209e3ec.js"
  },
  "/_nuxt/ProseH1.9f7aad4b.js": {
    "type": "application/javascript",
    "etag": "\"1bf-TZPWnm0ZGubdGEbbrIwv7eeM/ps\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 447,
    "path": "../public/_nuxt/ProseH1.9f7aad4b.js"
  },
  "/_nuxt/ProseH1.a3ca7390.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"73a-5ZlSdWDsAr2rhOwaykNEenN/HXE\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 1850,
    "path": "../public/_nuxt/ProseH1.a3ca7390.css"
  },
  "/_nuxt/ProseH2.55595e24.js": {
    "type": "application/javascript",
    "etag": "\"1bf-QuSShwSY5pDDBLLawEW414v27ow\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 447,
    "path": "../public/_nuxt/ProseH2.55595e24.js"
  },
  "/_nuxt/ProseH2.b4b10521.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"735-JOeOsAUdJVlBq9cez7gMLFKSxAw\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 1845,
    "path": "../public/_nuxt/ProseH2.b4b10521.css"
  },
  "/_nuxt/ProseH3.26067c19.js": {
    "type": "application/javascript",
    "etag": "\"1bf-6lSVxCXVeiQxxR/niZplzvxkpkI\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 447,
    "path": "../public/_nuxt/ProseH3.26067c19.js"
  },
  "/_nuxt/ProseH3.c8687bc5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"739-IbmvXU/97FTaFUYbuQQUoDzS0WE\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 1849,
    "path": "../public/_nuxt/ProseH3.c8687bc5.css"
  },
  "/_nuxt/ProseH4.db6edeb3.js": {
    "type": "application/javascript",
    "etag": "\"1bf-AC+Xhe3nK6J31ZXWjmSvf8GuzuI\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 447,
    "path": "../public/_nuxt/ProseH4.db6edeb3.js"
  },
  "/_nuxt/ProseH4.e694a70b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"685-tySciYjdNLPpOOnRTzXg84R/Xyk\"",
    "mtime": "2022-10-20T19:21:40.132Z",
    "size": 1669,
    "path": "../public/_nuxt/ProseH4.e694a70b.css"
  },
  "/_nuxt/ProseH5.03677769.js": {
    "type": "application/javascript",
    "etag": "\"19c-eG4fO5m0LDGQtk+gi9YwyVnxLAs\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 412,
    "path": "../public/_nuxt/ProseH5.03677769.js"
  },
  "/_nuxt/ProseH6.34e9aea2.js": {
    "type": "application/javascript",
    "etag": "\"19c-Msr2PHBORrYXpbbHZQPAOEDlktE\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 412,
    "path": "../public/_nuxt/ProseH6.34e9aea2.js"
  },
  "/_nuxt/ProseHr.d296799b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"139-KdIMJtLh4yawPf7cKBur2bqLtOg\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 313,
    "path": "../public/_nuxt/ProseHr.d296799b.css"
  },
  "/_nuxt/ProseHr.eff71ba5.js": {
    "type": "application/javascript",
    "etag": "\"ff-cWK9J9PIETwXFSQ6MSibnMWCFnc\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 255,
    "path": "../public/_nuxt/ProseHr.eff71ba5.js"
  },
  "/_nuxt/ProseImg.5a228d16.js": {
    "type": "application/javascript",
    "etag": "\"26a-8IS50rkVwVWfp4KZb8Dqdq7PCME\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 618,
    "path": "../public/_nuxt/ProseImg.5a228d16.js"
  },
  "/_nuxt/ProseImg.b8fc84e9.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"38-Jg4YUn3bexr5maDg3q4E4QwK75w\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 56,
    "path": "../public/_nuxt/ProseImg.b8fc84e9.css"
  },
  "/_nuxt/ProseLi.3784414e.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"221-9jcmOdbGfr4LOsaFTeymjzD20IQ\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 545,
    "path": "../public/_nuxt/ProseLi.3784414e.css"
  },
  "/_nuxt/ProseLi.44d4b7fb.js": {
    "type": "application/javascript",
    "etag": "\"135-aSX0xs+epRjgdpTD0/8kz+Hhag8\"",
    "mtime": "2022-10-20T19:21:40.131Z",
    "size": 309,
    "path": "../public/_nuxt/ProseLi.44d4b7fb.js"
  },
  "/_nuxt/ProseOl.29e68bd0.js": {
    "type": "application/javascript",
    "etag": "\"135-SQD1r/jHDfhdf5JL0abO7Ya8LEg\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 309,
    "path": "../public/_nuxt/ProseOl.29e68bd0.js"
  },
  "/_nuxt/ProseOl.fd9fac65.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b7-TlnDqMhQExeIIl2RvwFQqBsVfvg\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 183,
    "path": "../public/_nuxt/ProseOl.fd9fac65.css"
  },
  "/_nuxt/ProseP.102ef0d0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"88-5NsE3T3ai8RgEyGPT6QWIPJ9LTk\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 136,
    "path": "../public/_nuxt/ProseP.102ef0d0.css"
  },
  "/_nuxt/ProseP.e46ba1c7.js": {
    "type": "application/javascript",
    "etag": "\"133-CozCKHIAKm3vUW1t69MWGyQusjQ\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 307,
    "path": "../public/_nuxt/ProseP.e46ba1c7.js"
  },
  "/_nuxt/ProseStrong.0866a604.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"56-cpmQkD7V2iLvNwhImjrG+hVswuk\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 86,
    "path": "../public/_nuxt/ProseStrong.0866a604.css"
  },
  "/_nuxt/ProseStrong.438d76fc.js": {
    "type": "application/javascript",
    "etag": "\"13d-nlzkejMRHDzarL4c2KJlffgglH4\"",
    "mtime": "2022-10-20T19:21:40.130Z",
    "size": 317,
    "path": "../public/_nuxt/ProseStrong.438d76fc.js"
  },
  "/_nuxt/ProseTable.6acb3a6d.js": {
    "type": "application/javascript",
    "etag": "\"12a-466fyuNNuIWHbzsti5+f7W53CMU\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 298,
    "path": "../public/_nuxt/ProseTable.6acb3a6d.js"
  },
  "/_nuxt/ProseTable.6f7b0d61.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"6b-InEKX9x+652QRt/91lZLA9R9tR4\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 107,
    "path": "../public/_nuxt/ProseTable.6f7b0d61.css"
  },
  "/_nuxt/ProseTbody.2a7851fc.js": {
    "type": "application/javascript",
    "etag": "\"bd-3tieyjvlLhYuYQHPbcbzYHS5R/I\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 189,
    "path": "../public/_nuxt/ProseTbody.2a7851fc.js"
  },
  "/_nuxt/ProseTd.0b8a3738.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a5-3CJsEmAlyrEyq1PwWTEGSoRqvrA\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 165,
    "path": "../public/_nuxt/ProseTd.0b8a3738.css"
  },
  "/_nuxt/ProseTd.6d808871.js": {
    "type": "application/javascript",
    "etag": "\"e7-L7X9SCwgrykSEaqh/7+QzGQV5dE\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTd.6d808871.js"
  },
  "/_nuxt/ProseTh.3c326a53.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"18b-bI8rV7Nq9vpYAHIN8cm+uDvM4BI\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 395,
    "path": "../public/_nuxt/ProseTh.3c326a53.css"
  },
  "/_nuxt/ProseTh.ba03c75a.js": {
    "type": "application/javascript",
    "etag": "\"e7-BJHN+ZiEN0gTAXwHJ3wwQ4jUp6o\"",
    "mtime": "2022-10-20T19:21:40.129Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTh.ba03c75a.js"
  },
  "/_nuxt/ProseThead.42bdd6b8.js": {
    "type": "application/javascript",
    "etag": "\"ea-M/HTMsMkORfTNx6S4PGTShbdYeQ\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 234,
    "path": "../public/_nuxt/ProseThead.42bdd6b8.js"
  },
  "/_nuxt/ProseThead.73e7c4d7.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"102-dtxJu4FJOv6pJ1vFCtoanxMS5go\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 258,
    "path": "../public/_nuxt/ProseThead.73e7c4d7.css"
  },
  "/_nuxt/ProseTr.1ed9633a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"10e-JvmYpRpQZ8Gx0GfqPpXDvQEHWrQ\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 270,
    "path": "../public/_nuxt/ProseTr.1ed9633a.css"
  },
  "/_nuxt/ProseTr.4f4e50ca.js": {
    "type": "application/javascript",
    "etag": "\"e7-4OPXG7V4A7uFeYXHMy2FGeA485g\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 231,
    "path": "../public/_nuxt/ProseTr.4f4e50ca.js"
  },
  "/_nuxt/ProseUl.bc110777.js": {
    "type": "application/javascript",
    "etag": "\"135-4XlA7iHsBGlJQDmkXNdK61jtBbQ\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 309,
    "path": "../public/_nuxt/ProseUl.bc110777.js"
  },
  "/_nuxt/ProseUl.ec6f2304.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b4-E4ktyLkfxUv9tJRDuLBRuMaGsa8\"",
    "mtime": "2022-10-20T19:21:40.128Z",
    "size": 180,
    "path": "../public/_nuxt/ProseUl.ec6f2304.css"
  },
  "/_nuxt/Releases.8ac67e26.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"41c-fXkRUYxJ4pfeVBN/WhuB1kx+XRA\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 1052,
    "path": "../public/_nuxt/Releases.8ac67e26.css"
  },
  "/_nuxt/Releases.8d548dbc.js": {
    "type": "application/javascript",
    "etag": "\"852-N8n9UxNcd2knj5tGtU3f2++mFD4\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 2130,
    "path": "../public/_nuxt/Releases.8d548dbc.js"
  },
  "/_nuxt/ReleasesReactions.947c7b61.js": {
    "type": "application/javascript",
    "etag": "\"116-ElZtXtFEiMFSjD6Uu50ghEslIjc\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 278,
    "path": "../public/_nuxt/ReleasesReactions.947c7b61.js"
  },
  "/_nuxt/ReleasesReactions.vue_vue_type_script_setup_true_lang.94f1d5f1.js": {
    "type": "application/javascript",
    "etag": "\"3c5-VMkBFnXAAc4lzYd/9fhUU0O/9hI\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 965,
    "path": "../public/_nuxt/ReleasesReactions.vue_vue_type_script_setup_true_lang.94f1d5f1.js"
  },
  "/_nuxt/Sandbox.10fc302a.js": {
    "type": "application/javascript",
    "etag": "\"80f-vhLskK1Pl/QAOpo+z72K0uwY6pI\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 2063,
    "path": "../public/_nuxt/Sandbox.10fc302a.js"
  },
  "/_nuxt/Sandbox.32b56370.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1b2-jYcWGNiTOo8Da6Q2qhNNalsGWao\"",
    "mtime": "2022-10-20T19:21:40.127Z",
    "size": 434,
    "path": "../public/_nuxt/Sandbox.32b56370.css"
  },
  "/_nuxt/SocialIcons.1a0a73ae.js": {
    "type": "application/javascript",
    "etag": "\"5b-Fz/Y1+FsQQniWRpqZwsQUPexViE\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 91,
    "path": "../public/_nuxt/SocialIcons.1a0a73ae.js"
  },
  "/_nuxt/SourceLink.0a3c5589.js": {
    "type": "application/javascript",
    "etag": "\"2e6-EznCmz1Hi6AWuvYZdoC4DbjUmwg\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 742,
    "path": "../public/_nuxt/SourceLink.0a3c5589.js"
  },
  "/_nuxt/TabsHeader.69170d75.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"76-+HMBsMa/mB6MsIA4pJrqalIRDuc\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 118,
    "path": "../public/_nuxt/TabsHeader.69170d75.css"
  },
  "/_nuxt/TabsHeader.b4c53f7e.js": {
    "type": "application/javascript",
    "etag": "\"643-KBVRPT6Ce/ahVZEonu1Vi/pNneY\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 1603,
    "path": "../public/_nuxt/TabsHeader.b4c53f7e.js"
  },
  "/_nuxt/Terminal.2e3b1abb.js": {
    "type": "application/javascript",
    "etag": "\"e0-LWI28ncmcA8KgAR+B2Ep8P5ZhwE\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 224,
    "path": "../public/_nuxt/Terminal.2e3b1abb.js"
  },
  "/_nuxt/Terminal.vue_vue_type_script_setup_true_lang.44f9331e.js": {
    "type": "application/javascript",
    "etag": "\"64a-9Kb+pAnGzacuRP7jShxBPDZf9sw\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 1610,
    "path": "../public/_nuxt/Terminal.vue_vue_type_script_setup_true_lang.44f9331e.js"
  },
  "/_nuxt/VideoPlayer.63a41f44.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3cf-ibxxmZM3shkCIUncWs0AihXgHZA\"",
    "mtime": "2022-10-20T19:21:40.126Z",
    "size": 975,
    "path": "../public/_nuxt/VideoPlayer.63a41f44.css"
  },
  "/_nuxt/VideoPlayer.d09ab6f1.js": {
    "type": "application/javascript",
    "etag": "\"87d-qjC/UcKO9KXPJt3KlTBm8O0jxpM\"",
    "mtime": "2022-10-20T19:21:40.125Z",
    "size": 2173,
    "path": "../public/_nuxt/VideoPlayer.d09ab6f1.js"
  },
  "/_nuxt/asyncData.1731a1fe.js": {
    "type": "application/javascript",
    "etag": "\"a4e-3RiwvfBZElW6PunjJrC+VBCLh6U\"",
    "mtime": "2022-10-20T19:21:40.125Z",
    "size": 2638,
    "path": "../public/_nuxt/asyncData.1731a1fe.js"
  },
  "/_nuxt/client-db.e285dd9d.js": {
    "type": "application/javascript",
    "etag": "\"4e01-nFu70UkldfD4aVBNtip5GZAJ22c\"",
    "mtime": "2022-10-20T19:21:40.125Z",
    "size": 19969,
    "path": "../public/_nuxt/client-db.e285dd9d.js"
  },
  "/_nuxt/default.c012531e.js": {
    "type": "application/javascript",
    "etag": "\"3f1-Y/qOfRUrvQUx5OLsW+a0xXr1i5Q\"",
    "mtime": "2022-10-20T19:21:40.125Z",
    "size": 1009,
    "path": "../public/_nuxt/default.c012531e.js"
  },
  "/_nuxt/document-driven.8a98a451.js": {
    "type": "application/javascript",
    "etag": "\"267-Gq+SlOVUIBnDSbE/EzD6zzo24Vo\"",
    "mtime": "2022-10-20T19:21:40.125Z",
    "size": 615,
    "path": "../public/_nuxt/document-driven.8a98a451.js"
  },
  "/_nuxt/entry.9507582a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"137bb-GT+WEeduCRVaMEbkfHoMdiO/s4Y\"",
    "mtime": "2022-10-20T19:21:40.124Z",
    "size": 79803,
    "path": "../public/_nuxt/entry.9507582a.css"
  },
  "/_nuxt/entry.fb07763c.js": {
    "type": "application/javascript",
    "etag": "\"3f593-I/FGkr9KVHf4u0XeFw1XlnQqJTI\"",
    "mtime": "2022-10-20T19:21:40.124Z",
    "size": 259475,
    "path": "../public/_nuxt/entry.fb07763c.js"
  },
  "/_nuxt/error-404.491b6969.js": {
    "type": "application/javascript",
    "etag": "\"8a9-jVK1i28tgGyKUH1bu9BTUDo6Sp8\"",
    "mtime": "2022-10-20T19:21:40.124Z",
    "size": 2217,
    "path": "../public/_nuxt/error-404.491b6969.js"
  },
  "/_nuxt/error-404.4cf85664.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e2e-LqCovHnZMav9PGAw0dKswWtpiqo\"",
    "mtime": "2022-10-20T19:21:40.124Z",
    "size": 3630,
    "path": "../public/_nuxt/error-404.4cf85664.css"
  },
  "/_nuxt/error-500.bddb6786.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"79e-xcPBba5jwRizZNxp5SQiyWgChhA\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 1950,
    "path": "../public/_nuxt/error-500.bddb6786.css"
  },
  "/_nuxt/error-500.cedd5480.js": {
    "type": "application/javascript",
    "etag": "\"757-uZaaPpuf3o+wdI08knfrwb0ghHc\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 1879,
    "path": "../public/_nuxt/error-500.cedd5480.js"
  },
  "/_nuxt/error-component.be9741c4.js": {
    "type": "application/javascript",
    "etag": "\"465-d8qFP2eh8mjSUrg8ZKWVUL4mg3w\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 1125,
    "path": "../public/_nuxt/error-component.be9741c4.js"
  },
  "/_nuxt/index.225afc89.js": {
    "type": "application/javascript",
    "etag": "\"8f1-HezNsRg1gwF9OFGOw/DQIIa7Yzs\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 2289,
    "path": "../public/_nuxt/index.225afc89.js"
  },
  "/_nuxt/inter-all-400-normal.f824029b.woff": {
    "type": "font/woff",
    "etag": "\"1f8e4-nj34SdYtCzcSR6J8H8rdd+YH0ic\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 129252,
    "path": "../public/_nuxt/inter-all-400-normal.f824029b.woff"
  },
  "/_nuxt/inter-all-500-normal.94e08ad8.woff": {
    "type": "font/woff",
    "etag": "\"21e8c-s7gelBqBcyMl2/J5CGmsZ0xUSwo\"",
    "mtime": "2022-10-20T19:21:40.123Z",
    "size": 138892,
    "path": "../public/_nuxt/inter-all-500-normal.94e08ad8.woff"
  },
  "/_nuxt/inter-all-600-normal.ba29c057.woff": {
    "type": "font/woff",
    "etag": "\"22310-n/Y3/bi8jA4kbgmaG2Lhp9GbvLc\"",
    "mtime": "2022-10-20T19:21:40.122Z",
    "size": 140048,
    "path": "../public/_nuxt/inter-all-600-normal.ba29c057.woff"
  },
  "/_nuxt/inter-all-700-normal.9d318ccb.woff": {
    "type": "font/woff",
    "etag": "\"22438-N2iSUMgN0OOoESSDfNF7y4jKyfI\"",
    "mtime": "2022-10-20T19:21:40.122Z",
    "size": 140344,
    "path": "../public/_nuxt/inter-all-700-normal.9d318ccb.woff"
  },
  "/_nuxt/inter-cyrillic-400-normal.e9493683.woff2": {
    "type": "font/woff2",
    "etag": "\"18a0-ukrRLUnHqKKLCsI9Dbf8S2ciqrs\"",
    "mtime": "2022-10-20T19:21:40.122Z",
    "size": 6304,
    "path": "../public/_nuxt/inter-cyrillic-400-normal.e9493683.woff2"
  },
  "/_nuxt/inter-cyrillic-500-normal.f6bd191e.woff2": {
    "type": "font/woff2",
    "etag": "\"1a44-hUckkj/SJ53qyrFiXJNLJX/yRV0\"",
    "mtime": "2022-10-20T19:21:40.121Z",
    "size": 6724,
    "path": "../public/_nuxt/inter-cyrillic-500-normal.f6bd191e.woff2"
  },
  "/_nuxt/inter-cyrillic-600-normal.9bc492f5.woff2": {
    "type": "font/woff2",
    "etag": "\"1a94-GR2ZbOgJ0B0YJ0O6oYoTfeuDbVI\"",
    "mtime": "2022-10-20T19:21:40.117Z",
    "size": 6804,
    "path": "../public/_nuxt/inter-cyrillic-600-normal.9bc492f5.woff2"
  },
  "/_nuxt/inter-cyrillic-700-normal.f6c6dcaf.woff2": {
    "type": "font/woff2",
    "etag": "\"1a74-BHTplSjAcPxUnwoPjMJKedphX5E\"",
    "mtime": "2022-10-20T19:21:40.117Z",
    "size": 6772,
    "path": "../public/_nuxt/inter-cyrillic-700-normal.f6c6dcaf.woff2"
  },
  "/_nuxt/inter-cyrillic-ext-400-normal.f7666a51.woff2": {
    "type": "font/woff2",
    "etag": "\"2480-RPsleFd8vOCBQCAqjTw0PKXfnPM\"",
    "mtime": "2022-10-20T19:21:40.117Z",
    "size": 9344,
    "path": "../public/_nuxt/inter-cyrillic-ext-400-normal.f7666a51.woff2"
  },
  "/_nuxt/inter-cyrillic-ext-500-normal.8b5f6999.woff2": {
    "type": "font/woff2",
    "etag": "\"27c8-OVe4s5bcYVJGOlkhIem6H151gJE\"",
    "mtime": "2022-10-20T19:21:40.117Z",
    "size": 10184,
    "path": "../public/_nuxt/inter-cyrillic-ext-500-normal.8b5f6999.woff2"
  },
  "/_nuxt/inter-cyrillic-ext-600-normal.2ea11f8c.woff2": {
    "type": "font/woff2",
    "etag": "\"2818-bf39AmGzu3OR4I1/tMZSeGV9A0s\"",
    "mtime": "2022-10-20T19:21:40.117Z",
    "size": 10264,
    "path": "../public/_nuxt/inter-cyrillic-ext-600-normal.2ea11f8c.woff2"
  },
  "/_nuxt/inter-cyrillic-ext-700-normal.b7bb121f.woff2": {
    "type": "font/woff2",
    "etag": "\"2810-yiwNaROEUCeRTAAUMlZJldQZeXk\"",
    "mtime": "2022-10-20T19:21:40.116Z",
    "size": 10256,
    "path": "../public/_nuxt/inter-cyrillic-ext-700-normal.b7bb121f.woff2"
  },
  "/_nuxt/inter-greek-400-normal.2f2d421a.woff2": {
    "type": "font/woff2",
    "etag": "\"1f00-an57hzt+8gpw0oZzHrbJN2fkxDI\"",
    "mtime": "2022-10-20T19:21:40.116Z",
    "size": 7936,
    "path": "../public/_nuxt/inter-greek-400-normal.2f2d421a.woff2"
  },
  "/_nuxt/inter-greek-500-normal.ddbf6a70.woff2": {
    "type": "font/woff2",
    "etag": "\"20d0-ehnKstki1dki5+9pYekKOU4gvvY\"",
    "mtime": "2022-10-20T19:21:40.116Z",
    "size": 8400,
    "path": "../public/_nuxt/inter-greek-500-normal.ddbf6a70.woff2"
  },
  "/_nuxt/inter-greek-600-normal.4591e350.woff2": {
    "type": "font/woff2",
    "etag": "\"211c-pXWZ6lR6ZQdKd38kGNDzTvuZL14\"",
    "mtime": "2022-10-20T19:21:40.116Z",
    "size": 8476,
    "path": "../public/_nuxt/inter-greek-600-normal.4591e350.woff2"
  },
  "/_nuxt/inter-greek-700-normal.9e078f49.woff2": {
    "type": "font/woff2",
    "etag": "\"20f4-IfDAILvnjPAGL37Ga9pL5Z3uEuI\"",
    "mtime": "2022-10-20T19:21:40.116Z",
    "size": 8436,
    "path": "../public/_nuxt/inter-greek-700-normal.9e078f49.woff2"
  },
  "/_nuxt/inter-greek-ext-400-normal.d3e30cde.woff2": {
    "type": "font/woff2",
    "etag": "\"1298-fgpuVSjGRKJN4LvExxfEsL58DjY\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 4760,
    "path": "../public/_nuxt/inter-greek-ext-400-normal.d3e30cde.woff2"
  },
  "/_nuxt/inter-greek-ext-500-normal.528b79aa.woff2": {
    "type": "font/woff2",
    "etag": "\"1444-9rwaQS6BmcZ5ts6Wg9VNXC4F7+E\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 5188,
    "path": "../public/_nuxt/inter-greek-ext-500-normal.528b79aa.woff2"
  },
  "/_nuxt/inter-greek-ext-600-normal.c37a11b3.woff2": {
    "type": "font/woff2",
    "etag": "\"1450-6wLM+RwSwb7hXH/OapAN4Fm2ruA\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 5200,
    "path": "../public/_nuxt/inter-greek-ext-600-normal.c37a11b3.woff2"
  },
  "/_nuxt/inter-greek-ext-700-normal.22174f43.woff2": {
    "type": "font/woff2",
    "etag": "\"145c-S+anM9vGbQskNd454m725HkLXKY\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 5212,
    "path": "../public/_nuxt/inter-greek-ext-700-normal.22174f43.woff2"
  },
  "/_nuxt/inter-latin-400-normal.0364d368.woff2": {
    "type": "font/woff2",
    "etag": "\"4144-SvUDeeE1FFWN1T0SPbjqEB7F4kw\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 16708,
    "path": "../public/_nuxt/inter-latin-400-normal.0364d368.woff2"
  },
  "/_nuxt/inter-latin-500-normal.d5333670.woff2": {
    "type": "font/woff2",
    "etag": "\"4490-2D+KrJyycqiCVgJzXjdm9JddXGg\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 17552,
    "path": "../public/_nuxt/inter-latin-500-normal.d5333670.woff2"
  },
  "/_nuxt/inter-latin-600-normal.048d136d.woff2": {
    "type": "font/woff2",
    "etag": "\"44fc-3K0bnlD470nsRgD+iMaMFl2bfmE\"",
    "mtime": "2022-10-20T19:21:40.115Z",
    "size": 17660,
    "path": "../public/_nuxt/inter-latin-600-normal.048d136d.woff2"
  },
  "/_nuxt/inter-latin-700-normal.ced2d8e0.woff2": {
    "type": "font/woff2",
    "etag": "\"4578-lZTyQ2eACiApepbC1PlX5ixj4gc\"",
    "mtime": "2022-10-20T19:21:40.114Z",
    "size": 17784,
    "path": "../public/_nuxt/inter-latin-700-normal.ced2d8e0.woff2"
  },
  "/_nuxt/inter-latin-ext-400-normal.64a98f58.woff2": {
    "type": "font/woff2",
    "etag": "\"4fd0-4iF8j44tPPJJgjWY+hAyNAz4zUM\"",
    "mtime": "2022-10-20T19:21:40.114Z",
    "size": 20432,
    "path": "../public/_nuxt/inter-latin-ext-400-normal.64a98f58.woff2"
  },
  "/_nuxt/inter-latin-ext-500-normal.4fba9ae6.woff2": {
    "type": "font/woff2",
    "etag": "\"5740-TQomOu9qNFVEZBVMGTvp8V9GUmQ\"",
    "mtime": "2022-10-20T19:21:40.114Z",
    "size": 22336,
    "path": "../public/_nuxt/inter-latin-ext-500-normal.4fba9ae6.woff2"
  },
  "/_nuxt/inter-latin-ext-600-normal.cc23fe6f.woff2": {
    "type": "font/woff2",
    "etag": "\"57ac-tRbdXSMDR+vpfha0//YHaZwnhMg\"",
    "mtime": "2022-10-20T19:21:40.114Z",
    "size": 22444,
    "path": "../public/_nuxt/inter-latin-ext-600-normal.cc23fe6f.woff2"
  },
  "/_nuxt/inter-latin-ext-700-normal.1cc47d25.woff2": {
    "type": "font/woff2",
    "etag": "\"5860-n4v9XC8tFisPcb6OSVCCOOYCgkM\"",
    "mtime": "2022-10-20T19:21:40.114Z",
    "size": 22624,
    "path": "../public/_nuxt/inter-latin-ext-700-normal.1cc47d25.woff2"
  },
  "/_nuxt/page.7bbb0120.js": {
    "type": "application/javascript",
    "etag": "\"1cc-+5aafbQxA8V1uRs8aPJ8dcTRANQ\"",
    "mtime": "2022-10-20T19:21:40.113Z",
    "size": 460,
    "path": "../public/_nuxt/page.7bbb0120.js"
  },
  "/_nuxt/web-socket.6d05854d.js": {
    "type": "application/javascript",
    "etag": "\"34f-i0eW81CY7ogfP32OX/+10YedVnM\"",
    "mtime": "2022-10-20T19:21:40.113Z",
    "size": 847,
    "path": "../public/_nuxt/web-socket.6d05854d.js"
  },
  "/_nuxt/welcome.da2ee49d.js": {
    "type": "application/javascript",
    "etag": "\"3822-u80wOUJ/z0bKYlCP9zjktuERhqI\"",
    "mtime": "2022-10-20T19:21:40.113Z",
    "size": 14370,
    "path": "../public/_nuxt/welcome.da2ee49d.js"
  },
  "/api/_content/cache.json": {
    "type": "application/json",
    "etag": "\"45b33-dsC9gMlaqKG9pT5xvZQy2X9pqnk\"",
    "mtime": "2022-10-20T19:21:43.309Z",
    "size": 285491,
    "path": "../public/api/_content/cache.json"
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

const get = (obj, path) => path.split(".").reduce((acc, part) => acc && acc[part], obj);
const _pick = (obj, condition) => Object.keys(obj).filter(condition).reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
const apply = (fn) => (data) => Array.isArray(data) ? data.map((item) => fn(item)) : fn(data);
const detectProperties = (keys) => {
  const prefixes = [];
  const properties = [];
  for (const key of keys) {
    if (["$", "_"].includes(key)) {
      prefixes.push(key);
    } else {
      properties.push(key);
    }
  }
  return { prefixes, properties };
};
const withoutKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => !properties.includes(key) && !prefixes.includes(key[0]));
};
const withKeys = (keys = []) => (obj) => {
  if (keys.length === 0 || !obj) {
    return obj;
  }
  const { prefixes, properties } = detectProperties(keys);
  return _pick(obj, (key) => properties.includes(key) || prefixes.includes(key[0]));
};
const sortList = (data, params) => {
  const comperable = new Intl.Collator(params.$locale, {
    numeric: params.$numeric,
    caseFirst: params.$caseFirst,
    sensitivity: params.$sensitivity
  });
  const keys = Object.keys(params).filter((key) => !key.startsWith("$"));
  for (const key of keys) {
    data = data.sort((a, b) => {
      const values = [get(a, key), get(b, key)].map((value) => {
        if (value === null) {
          return void 0;
        }
        if (value instanceof Date) {
          return value.toISOString();
        }
        return value;
      });
      if (params[key] === -1) {
        values.reverse();
      }
      return comperable.compare(values[0], values[1]);
    });
  }
  return data;
};
const assertArray = (value, message = "Expected an array") => {
  if (!Array.isArray(value)) {
    throw new TypeError(message);
  }
};
const ensureArray = (value) => Array.isArray(value) ? value : value ? [value] : [];

const arrayParams = ["sort", "where", "only", "without"];
const createQuery = (fetcher, intitialParams) => {
  const queryParams = {
    ...intitialParams
  };
  for (const key of arrayParams) {
    if (queryParams[key]) {
      queryParams[key] = ensureArray(queryParams[key]);
    }
  }
  const $set = (key, fn = (v) => v) => {
    return (...values) => {
      queryParams[key] = fn(...values);
      return query;
    };
  };
  const query = {
    params: () => queryParams,
    only: $set("only", ensureArray),
    without: $set("without", ensureArray),
    where: $set("where", (q) => [...ensureArray(queryParams.where), q]),
    sort: $set("sort", (sort) => [...ensureArray(queryParams.sort), ...ensureArray(sort)]),
    limit: $set("limit", (v) => parseInt(String(v), 10)),
    skip: $set("skip", (v) => parseInt(String(v), 10)),
    find: () => fetcher(query),
    findOne: () => {
      queryParams.first = true;
      return fetcher(query);
    },
    findSurround: (surroundQuery, options) => {
      queryParams.surround = { query: surroundQuery, ...options };
      return fetcher(query);
    },
    locale: (_locale) => query.where({ _locale })
  };
  return query;
};

function createMatch(opts = {}) {
  const operators = createOperators(match, opts.operators);
  function match(item, conditions) {
    if (typeof conditions !== "object" || conditions instanceof RegExp) {
      return operators.$eq(item, conditions);
    }
    return Object.keys(conditions || {}).every((key) => {
      const condition = conditions[key];
      if (key.startsWith("$") && operators[key]) {
        const fn = operators[key];
        return typeof fn === "function" ? fn(item, condition) : false;
      }
      return match(get(item, key), condition);
    });
  }
  return match;
}
function createOperators(match, operators = {}) {
  return {
    $match: (item, condition) => match(item, condition),
    $eq: (item, condition) => condition instanceof RegExp ? condition.test(item) : item === condition,
    $ne: (item, condition) => condition instanceof RegExp ? !condition.test(item) : item !== condition,
    $not: (item, condition) => !match(item, condition),
    $and: (item, condition) => {
      assertArray(condition, "$and requires an array as condition");
      return condition.every((cond) => match(item, cond));
    },
    $or: (item, condition) => {
      assertArray(condition, "$or requires an array as condition");
      return condition.some((cond) => match(item, cond));
    },
    $in: (item, condition) => ensureArray(condition).some(
      (cond) => Array.isArray(item) ? match(item, { $contains: cond }) : match(item, cond)
    ),
    $contains: (item, condition) => {
      item = Array.isArray(item) ? item : String(item);
      return ensureArray(condition).every((i) => item.includes(i));
    },
    $icontains: (item, condition) => {
      if (typeof condition !== "string") {
        throw new TypeError("$icontains requires a string, use $contains instead");
      }
      item = String(item).toLocaleLowerCase();
      return ensureArray(condition).every((i) => item.includes(i.toLocaleLowerCase()));
    },
    $containsAny: (item, condition) => {
      assertArray(condition, "$containsAny requires an array as condition");
      item = Array.isArray(item) ? item : String(item);
      return condition.some((i) => item.includes(i));
    },
    $exists: (item, condition) => condition ? typeof item !== "undefined" : typeof item === "undefined",
    $type: (item, condition) => typeof item === String(condition),
    $regex: (item, condition) => {
      if (!(condition instanceof RegExp)) {
        const matched = String(condition).match(/\/(.*)\/([dgimsuy]*)$/);
        condition = matched ? new RegExp(matched[1], matched[2] || "") : new RegExp(condition);
      }
      return condition.test(String(item || ""));
    },
    $lt: (item, condition) => {
      return item < condition;
    },
    $lte: (item, condition) => {
      return item <= condition;
    },
    $gt: (item, condition) => {
      return item > condition;
    },
    $gte: (item, condition) => {
      return item >= condition;
    },
    ...operators || {}
  };
}

function createPipelineFetcher(getContentsList) {
  const match = createMatch();
  const surround = (data, { query, before, after }) => {
    const matchQuery = typeof query === "string" ? { _path: query } : query;
    const index = data.findIndex((item) => match(item, matchQuery));
    before = before || 1;
    after = after || 1;
    const slice = new Array(before + after).fill(null, 0);
    return index === -1 ? slice : slice.map((_, i) => data[index - before + i + Number(i >= before)] || null);
  };
  const pipelines = [
    (data, params) => data.filter((item) => ensureArray(params.where).every((matchQuery) => match(item, matchQuery))),
    (data, params) => ensureArray(params.sort).forEach((options) => sortList(data, options)),
    (data, params) => params.surround ? surround(data, params.surround) : data,
    (data, params) => params.skip ? data.slice(params.skip) : data,
    (data, params) => params.limit ? data.slice(0, params.limit) : data,
    (data, params) => apply(withoutKeys(params.without))(data),
    (data, params) => apply(withKeys(params.only))(data),
    (data, params) => params.first ? data[0] : data
  ];
  return async (query) => {
    const data = await getContentsList();
    return pipelines.reduce(($data, pipe) => pipe($data, query.params()) || $data, data);
  };
}

const defineTransformer = (transformer) => {
  return transformer;
};

function createTokenizer(parser, initialize, from) {
  let point = Object.assign(
    from ? Object.assign({}, from) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const columnStart = {};
  const resolveAllConstructs = [];
  let chunks = [];
  let stack = [];
  const effects = {
    consume,
    enter,
    exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    })
  };
  const context = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser,
    sliceStream,
    sliceSerialize,
    now,
    defineSkip,
    write
  };
  let state = initialize.tokenize.call(context, effects);
  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  }
  return context;
  function write(slice) {
    chunks = push(chunks, slice);
    main();
    if (chunks[chunks.length - 1] !== null) {
      return [];
    }
    addResult(initialize, 0);
    context.events = resolveAll(resolveAllConstructs, context.events, context);
    return context.events;
  }
  function sliceSerialize(token, expandTabs) {
    return serializeChunks(sliceStream(token), expandTabs);
  }
  function sliceStream(token) {
    return sliceChunks(chunks, token);
  }
  function now() {
    return Object.assign({}, point);
  }
  function defineSkip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  }
  function main() {
    let chunkIndex;
    while (point._index < chunks.length) {
      const chunk = chunks[point._index];
      if (typeof chunk === "string") {
        chunkIndex = point._index;
        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }
        while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  }
  function go(code) {
    state = state(code);
  }
  function consume(code) {
    if (markdownLineEnding(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    }
    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++;
      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    }
    context.previous = code;
  }
  function enter(type, fields) {
    const token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(["enter", token, context]);
    stack.push(token);
    return token;
  }
  function exit(type) {
    const token = stack.pop();
    token.end = now();
    context.events.push(["exit", token, context]);
    return token;
  }
  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  }
  function onsuccessfulcheck(_, info) {
    info.restore();
  }
  function constructFactory(onreturn, fields) {
    return hook;
    function hook(constructs, returnState, bogusState) {
      let listOfConstructs;
      let constructIndex;
      let currentConstruct;
      let info;
      return Array.isArray(constructs) ? handleListOfConstructs(constructs) : "tokenize" in constructs ? handleListOfConstructs([constructs]) : handleMapOfConstructs(constructs);
      function handleMapOfConstructs(map) {
        return start;
        function start(code) {
          const def = code !== null && map[code];
          const all = code !== null && map.null;
          const list = [
            ...Array.isArray(def) ? def : def ? [def] : [],
            ...Array.isArray(all) ? all : all ? [all] : []
          ];
          return handleListOfConstructs(list)(code);
        }
      }
      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        if (list.length === 0) {
          return bogusState;
        }
        return handleConstruct(list[constructIndex]);
      }
      function handleConstruct(construct) {
        return start;
        function start(code) {
          info = store();
          currentConstruct = construct;
          if (!construct.partial) {
            context.currentConstruct = construct;
          }
          if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
            return nok();
          }
          return construct.tokenize.call(
            fields ? Object.assign(Object.create(context), fields) : context,
            effects,
            ok,
            nok
          )(code);
        }
      }
      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState;
      }
      function nok(code) {
        info.restore();
        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex]);
        }
        return bogusState;
      }
    }
  }
  function addResult(construct, from2) {
    if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
      resolveAllConstructs.push(construct);
    }
    if (construct.resolve) {
      splice(
        context.events,
        from2,
        context.events.length - from2,
        construct.resolve(context.events.slice(from2), context)
      );
    }
    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }
  function store() {
    const startPoint = now();
    const startPrevious = context.previous;
    const startCurrentConstruct = context.currentConstruct;
    const startEventsIndex = context.events.length;
    const startStack = Array.from(stack);
    return {
      restore,
      from: startEventsIndex
    };
    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }
  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}
function sliceChunks(chunks, token) {
  const startIndex = token.start._index;
  const startBufferIndex = token.start._bufferIndex;
  const endIndex = token.end._index;
  const endBufferIndex = token.end._bufferIndex;
  let view;
  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);
    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }
    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }
  return view;
}
function serializeChunks(chunks, expandTabs) {
  let index = -1;
  const result = [];
  let atTab;
  while (++index < chunks.length) {
    const chunk = chunks[index];
    let value;
    if (typeof chunk === "string") {
      value = chunk;
    } else
      switch (chunk) {
        case -5: {
          value = "\r";
          break;
        }
        case -4: {
          value = "\n";
          break;
        }
        case -3: {
          value = "\r\n";
          break;
        }
        case -2: {
          value = expandTabs ? " " : "	";
          break;
        }
        case -1: {
          if (!expandTabs && atTab)
            continue;
          value = " ";
          break;
        }
        default: {
          value = String.fromCharCode(chunk);
        }
      }
    atTab = chunk === -2;
    result.push(value);
  }
  return result.join("");
}

function initializeDocument(effects) {
  const self = this;
  const delimiter = (this.parser.delimiter || ",").charCodeAt(0);
  return enterRow;
  function enterRow(code) {
    return effects.attempt(
      { tokenize: attemptLastLine },
      (code2) => {
        effects.consume(code2);
        return enterRow;
      },
      (code2) => {
        effects.enter("row");
        return enterColumn(code2);
      }
    )(code);
  }
  function enterColumn(code) {
    effects.enter("column");
    return content(code);
  }
  function content(code) {
    if (code === null) {
      effects.exit("column");
      effects.exit("row");
      effects.consume(code);
      return content;
    }
    if (code === 34) {
      return quotedData(code);
    }
    if (code === delimiter) {
      if (self.previous === delimiter || markdownLineEnding(self.previous) || self.previous === null) {
        effects.enter("data");
        effects.exit("data");
      }
      effects.exit("column");
      effects.enter("columnSeparator");
      effects.consume(code);
      effects.exit("columnSeparator");
      effects.enter("column");
      return content;
    }
    if (markdownLineEnding(code)) {
      effects.exit("column");
      effects.enter("newline");
      effects.consume(code);
      effects.exit("newline");
      effects.exit("row");
      return enterRow;
    }
    return data(code);
  }
  function data(code) {
    effects.enter("data");
    return dataChunk(code);
  }
  function dataChunk(code) {
    if (code === null || markdownLineEnding(code) || code === delimiter) {
      effects.exit("data");
      return content(code);
    }
    if (code === 92) {
      return escapeCharacter(code);
    }
    effects.consume(code);
    return dataChunk;
  }
  function escapeCharacter(code) {
    effects.consume(code);
    return function(code2) {
      effects.consume(code2);
      return content;
    };
  }
  function quotedData(code) {
    effects.enter("quotedData");
    effects.enter("quotedDataChunk");
    effects.consume(code);
    return quotedDataChunk;
  }
  function quotedDataChunk(code) {
    if (code === 92) {
      return escapeCharacter(code);
    }
    if (code === 34) {
      return effects.attempt(
        { tokenize: attemptDoubleQuote },
        (code2) => {
          effects.exit("quotedDataChunk");
          effects.enter("quotedDataChunk");
          return quotedDataChunk(code2);
        },
        (code2) => {
          effects.consume(code2);
          effects.exit("quotedDataChunk");
          effects.exit("quotedData");
          return content;
        }
      )(code);
    }
    effects.consume(code);
    return quotedDataChunk;
  }
}
function attemptDoubleQuote(effects, ok, nok) {
  return startSequence;
  function startSequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.enter("quoteFence");
    effects.consume(code);
    return sequence;
  }
  function sequence(code) {
    if (code !== 34) {
      return nok(code);
    }
    effects.consume(code);
    effects.exit("quoteFence");
    return (code2) => ok(code2);
  }
}
function attemptLastLine(effects, ok, nok) {
  return enterLine;
  function enterLine(code) {
    if (!markdownSpace(code) && code !== null) {
      return nok(code);
    }
    effects.enter("emptyLine");
    return continueLine(code);
  }
  function continueLine(code) {
    if (markdownSpace(code)) {
      effects.consume(code);
      return continueLine;
    }
    if (code === null) {
      effects.exit("emptyLine");
      return ok(code);
    }
    return nok(code);
  }
}
const parse$1 = (options) => {
  return createTokenizer(
    { ...options },
    { tokenize: initializeDocument },
    void 0
  );
};

const own = {}.hasOwnProperty;
const initialPoint = {
  line: 1,
  column: 1,
  offset: 0
};
const fromCSV = function(value, encoding, options) {
  if (typeof encoding !== "string") {
    options = encoding;
    encoding = void 0;
  }
  return compiler$1()(
    postprocess(
      parse$1(options).write(preprocess()(value, encoding, true))
    )
  );
};
function compiler$1() {
  const config = {
    enter: {
      column: opener(openColumn),
      row: opener(openRow),
      data: onenterdata,
      quotedData: onenterdata
    },
    exit: {
      row: closer(),
      column: closer(),
      data: onexitdata,
      quotedData: onexitQuotedData
    }
  };
  return compile;
  function compile(events) {
    const tree = {
      type: "root",
      children: []
    };
    const stack = [tree];
    const tokenStack = [];
    const context = {
      stack,
      tokenStack,
      config,
      enter,
      exit,
      resume
    };
    let index = -1;
    while (++index < events.length) {
      const handler = config[events[index][0]];
      if (own.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          Object.assign(
            {
              sliceSerialize: events[index][2].sliceSerialize
            },
            context
          ),
          events[index][1]
        );
      }
    }
    if (tokenStack.length > 0) {
      const tail = tokenStack[tokenStack.length - 1];
      const handler = tail[1] || defaultOnError;
      handler.call(context, void 0, tail[0]);
    }
    tree.position = {
      start: point(
        events.length > 0 ? events[0][1].start : initialPoint
      ),
      end: point(
        events.length > 0 ? events[events.length - 2][1].end : initialPoint
      )
    };
    return tree;
  }
  function point(d) {
    return {
      line: d.line,
      column: d.column,
      offset: d.offset
    };
  }
  function opener(create, and) {
    return open;
    function open(token) {
      enter.call(this, create(token), token);
      if (and) {
        and.call(this, token);
      }
    }
  }
  function enter(node, token, errorHandler) {
    const parent = this.stack[this.stack.length - 1];
    parent.children.push(node);
    this.stack.push(node);
    this.tokenStack.push([token, errorHandler]);
    node.position = {
      start: point(token.start)
    };
    return node;
  }
  function closer(and) {
    return close;
    function close(token) {
      if (and) {
        and.call(this, token);
      }
      exit.call(this, token);
    }
  }
  function exit(token, onExitError) {
    const node = this.stack.pop();
    const open = this.tokenStack.pop();
    if (!open) {
      throw new Error(
        "Cannot close `" + token.type + "` (" + stringifyPosition({
          start: token.start,
          end: token.end
        }) + "): it\u2019s not open"
      );
    } else if (open[0].type !== token.type) {
      if (onExitError) {
        onExitError.call(this, token, open[0]);
      } else {
        const handler = open[1] || defaultOnError;
        handler.call(this, token, open[0]);
      }
    }
    node.position.end = point(token.end);
    return node;
  }
  function resume() {
    return toString(this.stack.pop());
  }
  function onenterdata(token) {
    const parent = this.stack[this.stack.length - 1];
    let tail = parent.children[parent.children.length - 1];
    if (!tail || tail.type !== "text") {
      tail = text();
      tail.position = {
        start: point(token.start)
      };
      parent.children.push(tail);
    }
    this.stack.push(tail);
  }
  function onexitdata(token) {
    const tail = this.stack.pop();
    tail.value += this.sliceSerialize(token).trim().replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function onexitQuotedData(token) {
    const tail = this.stack.pop();
    const value = this.sliceSerialize(token);
    tail.value += this.sliceSerialize(token).trim().substring(1, value.length - 1).replace(/""/g, '"');
    tail.position.end = point(token.end);
  }
  function text() {
    return {
      type: "text",
      value: ""
    };
  }
  function openColumn() {
    return {
      type: "column",
      children: []
    };
  }
  function openRow() {
    return {
      type: "row",
      children: []
    };
  }
}
function defaultOnError(left, right) {
  if (left) {
    throw new Error(
      "Cannot close `" + left.type + "` (" + stringifyPosition({
        start: left.start,
        end: left.end
      }) + "): a different token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is open"
    );
  } else {
    throw new Error(
      "Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({
        start: right.start,
        end: right.end
      }) + ") is still open"
    );
  }
}

function csvParse(options) {
  const parser = (doc) => {
    return fromCSV(doc, options);
  };
  Object.assign(this, { Parser: parser });
  const toJsonObject = (tree) => {
    const [header, ...rows] = tree.children;
    const columns = header.children.map((col) => col.children[0].value);
    const data = rows.map((row) => {
      return row.children.reduce((acc, col, i) => {
        acc[String(columns[i])] = col.children[0]?.value;
        return acc;
      }, {});
    });
    return data;
  };
  const toJsonArray = (tree) => {
    const data = tree.children.map((row) => {
      return row.children.map((col) => col.children[0]?.value);
    });
    return data;
  };
  const compiler = (doc) => {
    if (options.json) {
      return toJsonObject(doc);
    }
    return toJsonArray(doc);
  };
  Object.assign(this, { Compiler: compiler });
}
const csv = defineTransformer({
  name: "csv",
  extensions: [".csv"],
  parse: async (_id, content, options = {}) => {
    const stream = unified().use(csvParse, {
      delimiter: ",",
      json: true,
      ...options
    });
    const { result } = await stream.process(content);
    return {
      _id,
      _type: "csv",
      body: result
    };
  }
});

function flattenNodeText(node) {
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

function emphasis(h, node) {
  return h(node, "em", node.attributes, all(h, node));
}

function parseThematicBlock(lang) {
  if (!lang) {
    return {
      language: void 0,
      highlights: void 0,
      fileName: void 0
    };
  }
  const language = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokens = lang.match(/{([^}]+)}/);
  const filenameTokens = lang.match(/\[(.+)\]/);
  return {
    language: language ? language[0] : void 0,
    highlights: parseHighlightedLines(highlightTokens && highlightTokens[1]),
    filename: Array.isArray(filenameTokens) ? filenameTokens[1] : void 0
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : void 0;
}
const TAG_NAME_REGEXP = /^<\/?([A-Za-z0-9-_]+) ?[^>]*>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}
function wrap(nodes, loose = false) {
  const result = [];
  let index = -1;
  if (loose) {
    result.push(u("text", "\n"));
  }
  while (++index < nodes.length) {
    if (index) {
      result.push(u("text", "\n"));
    }
    result.push(nodes[index]);
  }
  if (loose && nodes.length > 0) {
    result.push(u("text", "\n"));
  }
  return result;
}

const code = (h, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename } = parseThematicBlock(lang);
  const code = node.value ? detab(node.value + "\n") : "";
  return h(
    node.position,
    "code",
    {
      language,
      filename,
      highlights,
      code
    },
    [h(node, "pre", {}, [h(node, "code", { __ignoreMap: "" }, [u("text", code)])])]
  );
};

function html(h, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (tagName === "code") {
    node.value = node.value.replace(tagName, "code-inline");
  }
  return h.dangerous ? h.augment(node, u("raw", node.value)) : null;
}

function heading(h, node) {
  return h(node, "h" + node.depth, all(h, node));
}

function link(h, node) {
  const props = {
    ...node.attributes || {},
    href: encode(normalizeLink(node.url))
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "a", props, all(h, node));
}
function normalizeLink(link2) {
  if (isRelative(link2) || !/^https?/.test(link2) && !link2.startsWith("/")) {
    return link2.split("/").map((x) => x.replace(/^[0-9]*\./g, "")).join("/").replace(/\.md$/g, "");
  } else {
    return link2;
  }
}

function list(h, node) {
  const props = {};
  const name = `${node.ordered ? "ol" : "ul"}`;
  if (typeof node.start === "number" && node.start !== 1) {
    props.start = node.start;
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    props.className = ["contains-task-list"];
  }
  return h(node, name, props, wrap(all(h, node), true));
}

function listItem(h, node, parent) {
  const result = all(h, node);
  const loose = parent ? listLoose(parent) : listItemLoose(node);
  const props = {};
  let wrapped = [];
  let index;
  let child;
  if (typeof node.checked === "boolean") {
    result.unshift(
      h({}, "input", {
        type: "checkbox",
        checked: node.checked,
        disabled: true
      })
    );
    props.className = ["task-list-item"];
  }
  const length = result.length;
  index = -1;
  while (++index < length) {
    child = result[index];
    if (child.tagName === "p" && !loose) {
      wrapped = wrapped.concat(child.children || []);
    } else {
      wrapped.push(child);
    }
  }
  return h(node, "li", props, wrapped);
}
function listLoose(node) {
  let loose = node.spread;
  const children = node.children;
  const length = children.length;
  let index = -1;
  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }
  return loose;
}
function listItemLoose(node) {
  const spread = node.spread;
  const children = node.children || [];
  return spread === void 0 || spread === null ? children.length > 1 : spread;
}

function table(h, node) {
  const rows = node.children;
  const align = node.align || [];
  const result = rows.map((row, index) => {
    const childres = row.children;
    const name = index === 0 ? "th" : "td";
    let pos = node.align ? align.length : childres.length;
    const out = [];
    while (pos--) {
      const cell = childres[pos];
      out[pos] = h(cell, name, { align: align[pos] }, cell ? all(h, cell) : []);
    }
    return h(row, "tr", wrap(out, true));
  });
  const body = result[1] && h(
    {
      start: position(result[1]).start,
      end: position(result[result.length - 1]).end
    },
    "tbody",
    wrap(result.slice(1), true)
  );
  return h(node, "table", wrap([h(result[0].position, "thead", wrap([result[0]], true))].concat(body || []), true));
}

function paragraph(h, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return all(h, node);
    }
  }
  return h(node, "p", all(h, node));
}

function image(h, node) {
  const props = {
    ...node.attributes,
    src: encode(node.url),
    alt: node.alt
  };
  if (node.title !== null && node.title !== void 0) {
    props.title = node.title;
  }
  return h(node, "img", props);
}

function blockquote(h, node) {
  return h(node, "blockquote", wrap(all(h, node), true));
}

function strong(h, node) {
  return h(node, "strong", node.attributes, all(h, node));
}

function inlineCode(h, node) {
  return h(node, "code-inline", node.attributes, [
    u("text", node.value.replace(/\r?\n|\r/g, " "))
  ]);
}

function thematicBreak(h, node) {
  return h(node, "hr");
}

function containerComponent(h, node) {
  const hast = h(node, node.tagName, node.attributes, all(h, node));
  hast.attributes = node.attributes;
  hast.fmAttributes = node.fmAttributes;
  return hast;
}

const handlers$1 = {
  emphasis,
  code,
  paragraph,
  html,
  link,
  list,
  listItem,
  heading,
  table,
  image,
  blockquote,
  strong,
  inlineCode,
  thematicBreak,
  containerComponent
};

function compiler(_options) {
  function parseAsJSON(node) {
    if (Array.isArray(node)) {
      return node.map(parseAsJSON).filter(Boolean);
    }
    if (node.type === "element") {
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children.flatMap((child) => {
          if (child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {}
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      return {
        type: "element",
        tag: node.tagName,
        props: node.properties,
        children: parseAsJSON(node.children || [])
      };
    }
    if (node.type === "text") {
      if (node.value === "\n") {
        return null;
      }
      return {
        type: "text",
        value: node.value
      };
    }
    if (node.type === "comment") {
      return null;
    }
    node.children = parseAsJSON(node.children || []);
    return node;
  }
  this.Compiler = function(root) {
    return {
      type: "root",
      children: parseAsJSON(root.children || [])
    };
  };
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || typeof vnode.children === "string";
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value;
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).join("");
  }
  return "";
}

const usePlugins = (plugins, stream) => {
  for (const plugin of Object.values(plugins)) {
    if (plugin) {
      const { instance, ...options } = plugin;
      stream.use(instance, options);
    }
  }
};
function generateBody(content, options) {
  const rehypeOptions = {
    handlers: handlers$1,
    allowDangerousHtml: true
  };
  return new Promise((resolve, reject) => {
    const stream = unified().use(remarkParse);
    if (options.mdc) {
      stream.use(remarkMDC);
    }
    usePlugins(options.remarkPlugins, stream);
    stream.use(remark2rehype, rehypeOptions);
    usePlugins(options.rehypePlugins, stream);
    stream.use(compiler, options);
    stream.process(
      {
        value: content,
        data: options.data
      },
      (error, file) => {
        if (error) {
          return reject(error);
        }
        Object.assign(options.data, file?.data || {});
        resolve(file?.result);
      }
    );
  });
}
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type !== "text" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const useDefaultOptions = () => ({
  mdc: true,
  toc: {
    depth: 2,
    searchDepth: 2
  },
  tags: {},
  remarkPlugins: {
    "remark-emoji": {
      instance: remarkEmoji
    },
    "remark-squeeze-paragraphs": {
      instance: remarkSqueezeParagraphs
    },
    "remark-gfm": {
      instance: remarkGfm
    }
  },
  rehypePlugins: {
    "rehype-slug": {
      instance: rehypeSlug
    },
    "rehype-external-links": {
      instance: rehypeExternalLinks
    },
    "rehype-sort-attribute-values": {
      instance: rehypeSortAttributeValues
    },
    "rehype-sort-attributes": {
      instance: rehypeSortAttributes
    },
    "rehype-raw": {
      instance: rehypeRaw,
      passThrough: ["element"]
    }
  }
});
async function parse(file, userOptions = {}) {
  const options = defu(userOptions, useDefaultOptions());
  const { content, data } = await parseFrontMatter(file);
  const body = await generateBody(content, { ...options, data });
  let toc;
  if (data.toc !== false) {
    const tocOption = defu(data.toc || {}, options.toc);
    toc = generateToc(body, tocOption);
  }
  const excerptString = useExcerpt(content);
  const excerpt = excerptString ? await generateBody(excerptString, { ...options, data }) : void 0;
  const heading = contentHeading(body);
  return {
    body: {
      ...body,
      toc
    },
    meta: {
      _empty: content.trim().length === 0,
      title: heading.title,
      description: heading.description,
      excerpt,
      ...data
    }
  };
}
function useExcerpt(content, delimiter = /<!--\s*?more\s*?-->/i) {
  if (!delimiter) {
    return "";
  }
  let idx = -1;
  const match = delimiter.exec(content);
  if (match) {
    idx = match.index;
  }
  if (idx !== -1) {
    return content.slice(0, idx);
  }
  return content;
}

const markdown = defineTransformer({
  name: "markdown",
  extensions: [".md"],
  parse: async (_id, content, options = {}) => {
    const config = { ...options };
    config.rehypePlugins = await importPlugins(config.rehypePlugins);
    config.remarkPlugins = await importPlugins(config.remarkPlugins);
    const parsed = await parse(content, config);
    return {
      ...parsed.meta,
      body: parsed.body,
      _type: "markdown",
      _id
    };
  }
});
async function importPlugins(plugins = {}) {
  const resolvedPlugins = {};
  for (const [name, plugin] of Object.entries(plugins)) {
    if (plugin) {
      resolvedPlugins[name] = {
        instance: plugin.instance || await import(
          /* @vite-ignore */
          name
        ).then((m) => m.default || m),
        ...plugin
      };
    } else {
      resolvedPlugins[name] = false;
    }
  }
  return resolvedPlugins;
}

const yaml = defineTransformer({
  name: "Yaml",
  extensions: [".yml", ".yaml"],
  parse: async (_id, content) => {
    const { data } = await parseFrontMatter(`---
${content}
---`);
    let parsed = data;
    if (Array.isArray(data)) {
      console.warn(`YAML array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = { body: data };
    }
    return {
      ...parsed,
      _id,
      _type: "yaml"
    };
  }
});

const SEMVER_REGEX = /^(\d+)(\.\d+)*(\.x)?$/;
const describeId = (_id) => {
  const [_source, ...parts] = _id.split(":");
  const [, filename, _extension] = parts[parts.length - 1].match(/(.*)\.([^.]+)$/);
  parts[parts.length - 1] = filename;
  const _path = parts.join("/");
  return {
    _source,
    _path,
    _extension,
    _file: _extension ? `${_path}.${_extension}` : _path
  };
};
const pathMeta = defineTransformer({
  name: "path-meta",
  extensions: [".*"],
  transform(content, options = {}) {
    const { locales = [], defaultLocale = "en" } = options;
    const { _source, _file, _path, _extension } = describeId(content._id);
    const parts = _path.split("/");
    const _locale = locales.includes(parts[0]) ? parts.shift() : defaultLocale;
    const filePath = generatePath(parts.join("/"));
    return {
      _path: filePath,
      _dir: filePath.split("/").slice(-2)[0],
      _draft: isDraft(_path),
      _partial: isPartial(_path),
      _locale,
      ...content,
      title: content.title || generateTitle(refineUrlPart(parts[parts.length - 1])),
      _source,
      _file,
      _extension
    };
  }
});
const isDraft = (path) => !!path.match(/\.draft(\/|\.|$)/);
const isPartial = (path) => path.split(/[:/]/).some((part) => part.match(/^_.*/));
const generatePath = (path) => withLeadingSlash(withoutTrailingSlash(path.split("/").map((part) => slugify(refineUrlPart(part), { lower: true })).join("/")));
const generateTitle = (path) => path.split(/[\s-]/g).map(pascalCase).join(" ");
function refineUrlPart(name) {
  name = name.split(/[/:]/).pop();
  if (SEMVER_REGEX.test(name)) {
    return name;
  }
  return name.replace(/(\d+\.)?(.*)/, "$2").replace(/^index(\.draft)?$/, "").replace(/\.draft$/, "");
}

const json = defineTransformer({
  name: "Json",
  extensions: [".json", ".json5"],
  parse: async (_id, content) => {
    let parsed;
    if (typeof content === "string") {
      if (_id.endsWith("json5")) {
        parsed = (await import('json5').then((m) => m.default || m)).parse(content);
      } else if (_id.endsWith("json")) {
        parsed = destr(content);
      }
    } else {
      parsed = content;
    }
    if (Array.isArray(parsed)) {
      console.warn(`JSON array is not supported in ${_id}, moving the array into the \`body\` key`);
      parsed = {
        body: parsed
      };
    }
    return {
      ...parsed,
      _id,
      _type: "json"
    };
  }
});

const TRANSFORMERS = [
  csv,
  markdown,
  json,
  yaml,
  pathMeta
];
function getParser(ext, additionalTransformers = []) {
  let parser = additionalTransformers.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  if (!parser) {
    parser = TRANSFORMERS.find((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.parse);
  }
  return parser;
}
function getTransformers(ext, additionalTransformers = []) {
  return [
    ...additionalTransformers.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform),
    ...TRANSFORMERS.filter((p) => ext.match(new RegExp(p.extensions.join("|"), "i")) && p.transform)
  ];
}
async function transformContent(id, content, options = {}) {
  const { transformers = [] } = options;
  const file = { _id: id, body: content };
  const ext = extname(id);
  const parser = getParser(ext, transformers);
  if (!parser) {
    console.warn(`${ext} files are not supported, "${id}" falling back to raw content`);
    return file;
  }
  const parserOptions = options[camelCase(parser.name)] || {};
  const parsed = await parser.parse(file._id, file.body, parserOptions);
  const matchedTransformers = getTransformers(ext, transformers);
  const result = await matchedTransformers.reduce(async (prev, cur) => {
    const next = await prev || parsed;
    const transformOptions = options[camelCase(cur.name)] || {};
    return cur.transform(next, transformOptions);
  }, Promise.resolve(parsed));
  return result;
}

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

async function getContentIndex(event) {
  let contentIndex = await cacheStorage.getItem("content-index.json");
  if (!contentIndex) {
    const data = await serverQueryContent(event).find();
    contentIndex = data.reduce((acc, item) => {
      if (!acc[item._path]) {
        acc[item._path] = item._id;
      } else if (item._id.startsWith("content:")) {
        acc[item._path] = item._id;
      }
      return acc;
    }, {});
    await cacheStorage.setItem("content-index.json", contentIndex);
  }
  return contentIndex;
}
async function getIndexedContentsList(event, query) {
  const params = query.params();
  const path = params?.where?.find((wh) => wh._path)?._path;
  if (!isPreview(event) && (typeof path === "string" || path instanceof RegExp)) {
    const index = await getContentIndex(event);
    const keys = Object.keys(index).filter((key) => path.test ? path.test(key) : key === String(path)).map((key) => index[key]);
    const contents = await Promise.all(keys.map((key) => getContent(event, key)));
    return contents;
  }
  return getContentsList(event);
}

const ______node_modules__64nuxt_content_dist_runtime_transformers_shiki_mjs_IiU5aCCw9Y = defineTransformer({
  name: "highlight",
  extensions: [".md"],
  transform: async (content, options = {}) => {
    const tokenColors = {};
    const codeBlocks = [];
    const inlineCodes = [];
    visit(
      content.body,
      (node) => node.tag === "code" && node?.props.code || node.tag === "code-inline" && (node.props?.lang || node.props?.language),
      (node) => {
        if (node.tag === "code") {
          codeBlocks.push(node);
        } else if (node.tag === "code-inline") {
          inlineCodes.push(node);
        }
      }
    );
    await Promise.all(codeBlocks.map(highlightBlock));
    await Promise.all(inlineCodes.map(highlightInline));
    if (Object.values(tokenColors).length) {
      const colors = [];
      for (const colorClass of Object.values(tokenColors)) {
        Object.entries(colorClass.colors).forEach(([variant, color]) => {
          if (variant === "default") {
            colors.unshift(`.${colorClass.className}{color:${color}}`);
          } else {
            colors.push(`.${variant} .${colorClass.className}{color:${color}}`);
          }
        });
      }
      content.body.children.push({
        type: "element",
        tag: "style",
        children: [{ type: "text", value: colors.join("") }]
      });
    }
    return content;
    async function highlightInline(node) {
      const code = node.children[0].value;
      const lines = await $fetch(options.apiURL, {
        method: "POST",
        body: {
          code,
          lang: node.props.lang || node.props.language,
          theme: options.theme
        }
      });
      node.children = lines[0].map(tokenSpan);
      node.props = node.props || {};
      node.props.class = "colored";
      return node;
    }
    async function highlightBlock(node) {
      const { code, language: lang, highlights = [] } = node.props;
      const lines = await $fetch(options.apiURL, {
        method: "POST",
        body: {
          code,
          lang,
          theme: options.theme
        }
      });
      const innerCodeNode = node.children[0].children[0];
      innerCodeNode.children = lines.map((line, lineIndex) => ({
        type: "element",
        tag: "span",
        props: { class: ["line", highlights.includes(lineIndex + 1) ? "highlight" : ""].join(" ").trim() },
        children: line.map(tokenSpan)
      }));
      return node;
    }
    function getColorProps(token) {
      if (!token.color) {
        return {};
      }
      if (typeof token.color === "string") {
        return { style: { color: token.color } };
      }
      const key = Object.values(token.color).join("");
      if (!tokenColors[key]) {
        tokenColors[key] = {
          colors: token.color,
          className: "ct-" + Math.random().toString(16).substring(2, 8)
        };
      }
      return { class: tokenColors[key].className };
    }
    function tokenSpan(token) {
      return {
        type: "element",
        tag: "span",
        props: getColorProps(token),
        children: [{ type: "text", value: token.content }]
      };
    }
  }
});

const transformers = [______node_modules__64nuxt_content_dist_runtime_transformers_shiki_mjs_IiU5aCCw9Y];

const sourceStorage = prefixStorage(useStorage(), "content:source");
const cacheStorage = prefixStorage(useStorage(), "cache:content");
const cacheParsedStorage = prefixStorage(useStorage(), "cache:content:parsed");
const contentConfig = useRuntimeConfig().content;
const contentIgnores = contentConfig.ignores.map(
  (p) => typeof p === "string" ? new RegExp(`^${p}|:${p}`) : p
);
const invalidKeyCharacters = `'"?#/`.split("");
const contentIgnorePredicate = (key) => {
  if (key.startsWith("preview:") || contentIgnores.some((prefix) => prefix.test(key))) {
    return false;
  }
  if (invalidKeyCharacters.some((ik) => key.includes(ik))) {
    console.warn(`Ignoring [${key}]. File name should not contain any of the following characters: ${invalidKeyCharacters.join(", ")}`);
    return false;
  }
  return true;
};
const getContentsIds = async (event, prefix) => {
  let keys = [];
  {
    keys = await cacheParsedStorage.getKeys(prefix);
  }
  if (keys.length === 0) {
    keys = await sourceStorage.getKeys(prefix);
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewPrefix = `preview:${key}:${prefix || ""}`;
    const previewKeys = await sourceStorage.getKeys(previewPrefix);
    if (previewKeys.length) {
      const keysSet = new Set(keys);
      await Promise.all(
        previewKeys.map(async (key2) => {
          const meta = await sourceStorage.getMeta(key2);
          if (meta?.__deleted) {
            keysSet.delete(key2.substring(previewPrefix.length));
          } else {
            keysSet.add(key2.substring(previewPrefix.length));
          }
        })
      );
      keys = Array.from(keysSet);
    }
  }
  return keys.filter(contentIgnorePredicate);
};
const getContentsList = async (event, prefix) => {
  const keys = await getContentsIds(event, prefix);
  const contents = await Promise.all(keys.map((key) => getContent(event, key)));
  return contents;
};
const getContent = async (event, id) => {
  const contentId = id;
  if (!contentIgnorePredicate(id)) {
    return { _id: contentId, body: null };
  }
  if (isPreview(event)) {
    const { key } = getPreview(event);
    const previewId = `preview:${key}:${id}`;
    const draft = await sourceStorage.getItem(previewId);
    if (draft) {
      id = previewId;
    }
  }
  const cached = await cacheParsedStorage.getItem(id);
  if (cached) {
    return cached.parsed;
  }
  const meta = await sourceStorage.getMeta(id);
  const hash$1 = hash({
    meta,
    version: contentConfig.cacheVersion,
    integrity: contentConfig.cacheIntegrity
  });
  if (cached?.hash === hash$1) {
    return cached.parsed;
  }
  const body = await sourceStorage.getItem(id);
  if (body === null) {
    return { _id: contentId, body: null };
  }
  const parsed = await parseContent(contentId, body);
  await cacheParsedStorage.setItem(id, { parsed, hash: hash$1 }).catch(() => {
  });
  return parsed;
};
async function parseContent(id, content, opts = {}) {
  const nitroApp = useNitroApp();
  const options = defu(
    opts,
    {
      markdown: contentConfig.markdown,
      csv: contentConfig.csv,
      yaml: contentConfig.yaml,
      highlight: contentConfig.highlight,
      transformers: transformers,
      pathMeta: {
        defaultLocale: contentConfig.defaultLocale,
        locales: contentConfig.locales
      }
    }
  );
  const file = { _id: id, body: content };
  await nitroApp.hooks.callHook("content:file:beforeParse", file);
  const result = await transformContent(id, file.body, options);
  await nitroApp.hooks.callHook("content:file:afterParse", result);
  return result;
}
const createServerQueryFetch = (event, path) => (query) => {
  if (path) {
    if (query.params().first) {
      query.where({ _path: withoutTrailingSlash(path) });
    } else {
      query.where({ _path: new RegExp(`^${path.replace(/[-[\]{}()*+.,^$\s/]/g, "\\$&")}`) });
    }
  }
  if (!query.params().sort?.length) {
    query.sort({ _file: 1, $numeric: true });
  }
  return createPipelineFetcher(() => getIndexedContentsList(event, query))(query);
};
function serverQueryContent(event, path, ...pathParts) {
  if (typeof path === "string") {
    path = withLeadingSlash(joinURL(path, ...pathParts));
    return createQuery(createServerQueryFetch(event, path));
  }
  return createQuery(createServerQueryFetch(event), path || {});
}

function jsonParse(value) {
  return JSON.parse(value, regExpReviver);
}
function regExpReviver(_key, value) {
  const withOperator = typeof value === "string" && value.match(/^--([A-Z]+) (.+)$/) || [];
  if (withOperator[1] === "REGEX") {
    const regex = withOperator[2].match(/\/(.*)\/([dgimsuy]*)$/);
    return regex ? new RegExp(regex[1], regex[2] || "") : value;
  }
  return value;
}

const parseQueryParams = (body) => {
  try {
    return jsonParse(body);
  } catch (e) {
    throw createError({ statusCode: 400, message: "Invalid _params query" });
  }
};
const memory = {};
const getContentQuery = (event) => {
  const qid = event.context.params.qid?.replace(/.json$/, "");
  const query = getQuery(event) || {};
  if (qid && query._params) {
    memory[qid] = parseQueryParams(query._params);
    return memory[qid];
  }
  if (memory[qid]) {
    return memory[qid];
  }
  if (query._params) {
    return parseQueryParams(query._params);
  }
  if (typeof query.only === "string" && query.only.includes(",")) {
    query.only = query.only.split(",").map((s) => s.trim());
  }
  if (typeof query.without === "string" && query.without.includes(",")) {
    query.without = query.without.split(",").map((s) => s.trim());
  }
  const where = query.where || {};
  for (const key of ["draft", "partial", "empty"]) {
    if (query[key] && ["true", "false"].includes(query[key])) {
      where[key] = query[key] === "true";
      delete query[key];
    }
  }
  if (Object.keys(where).length > 0) {
    query.where = [where];
  } else {
    delete query.where;
  }
  if (query.sort) {
    query.sort = query.sort.split(",").map((s) => {
      const [key, order] = s.split(":");
      return [key, +order];
    });
  }
  const reservedKeys = ["partial", "draft", "only", "without", "where", "sort", "limit", "skip"];
  for (const key of Object.keys(query)) {
    if (reservedKeys.includes(key)) {
      continue;
    }
    query.where = query.where || {};
    query.where[key] = query[key];
  }
  return query;
};

const _o7Z3Zr = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  const contents = await serverQueryContent(event, query).find();
  if (query.first) {
    const path = contents?._path || query.where.find((w) => w._path)?._path;
    if (path) {
      const _dir = await serverQueryContent(event).where({ _path: join(path, "_dir") }).without("_").findOne();
      if (!Array.isArray(_dir)) {
        return {
          _path: path,
          ...contents,
          _dir
        };
      }
    }
  }
  if (query.first && Array.isArray(contents) && contents.length === 0) {
    throw createError({
      statusMessage: "Document not found!",
      statusCode: 404,
      data: {
        description: "Could not find document for the given query.",
        query
      }
    });
  }
  return contents;
});

const _dE47kF = defineEventHandler(async (event) => {
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch("/api/_content/navigation");
  await cacheStorage.setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents,
    navigation
  };
});

function createNav(contents, configs) {
  const { navigation } = useRuntimeConfig().content;
  const pickNavigationFields = (content) => ({
    ...pick(["title", ...navigation.fields])(content),
    ...isObject(content?.navigation) ? content.navigation : {}
  });
  const nav = contents.sort((a, b) => a._path.localeCompare(b._path)).reduce((nav2, content) => {
    const parts = content._path.substring(1).split("/");
    const idParts = content._id.split(":").slice(1);
    const isIndex = !!idParts[idParts.length - 1].match(/([1-9][0-9]*\.)?index.md/g);
    const getNavItem = (content2) => ({
      title: content2.title,
      _path: content2._path,
      _file: content2._file,
      children: [],
      ...pickNavigationFields(content2),
      ...content2._draft ? { _draft: true } : {}
    });
    const navItem = getNavItem(content);
    if (isIndex) {
      const dirConfig = configs[navItem._path];
      if (typeof dirConfig?.navigation !== "undefined" && !dirConfig?.navigation) {
        return nav2;
      }
      if (content._path !== "/") {
        const indexItem = getNavItem(content);
        navItem.children.push(indexItem);
      }
      Object.assign(
        navItem,
        pickNavigationFields(dirConfig)
      );
    }
    if (parts.length === 1) {
      nav2.push(navItem);
      return nav2;
    }
    const siblings = parts.slice(0, -1).reduce((nodes, part, i) => {
      const currentPathPart = "/" + parts.slice(0, i + 1).join("/");
      const conf = configs[currentPathPart];
      if (typeof conf?.navigation !== "undefined" && !conf.navigation) {
        return [];
      }
      let parent = nodes.find((n) => n._path === currentPathPart);
      if (!parent) {
        parent = {
          title: generateTitle(part),
          _path: currentPathPart,
          _file: content._file,
          children: [],
          ...pickNavigationFields(conf)
        };
        nodes.push(parent);
      }
      return parent.children;
    }, nav2);
    siblings.push(navItem);
    return nav2;
  }, []);
  return sortAndClear(nav);
}
const collator = new Intl.Collator(void 0, { numeric: true, sensitivity: "base" });
function sortAndClear(nav) {
  const sorted = nav.sort((a, b) => collator.compare(a._file, b._file));
  for (const item of sorted) {
    if (item.children.length) {
      sortAndClear(item.children);
    } else {
      delete item.children;
    }
    delete item._file;
  }
  return nav;
}
function pick(keys) {
  return (obj) => {
    obj = obj || {};
    if (keys && keys.length) {
      return keys.filter((key) => typeof obj[key] !== "undefined").reduce((newObj, key) => Object.assign(newObj, { [key]: obj[key] }), {});
    }
    return obj;
  };
}
function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

const _p3LPfR = defineEventHandler(async (event) => {
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage.getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    _partial: false,
    navigation: {
      $ne: false
    }
  }).find();
  const dirConfigs = await serverQueryContent(event).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = dirConfigs.reduce((configs2, conf) => {
    if (conf.title.toLowerCase() === "dir") {
      conf.title = void 0;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents, configs);
});

var information_for_contributors = [
	"This file has been converted from https://github.com/docusgen/vscode-extension/blob/main/syntaxes/mdc.tmLanguage.json",
	"If you want to provide a fix or improvement, please create a pull request against the original repository.",
	"Once accepted there, we are happy to receive an update request."
];
var version = "https://github.com/docusgen/vscode-extension/blob/1303abd16342880a42a4d143a660da049c79ea6c/syntaxes/mdc.tmLanguage.json";
var name = "markdown";
var injectionSelector = "L:text.html.markdown";
var scopeName = "text.markdown.mdc";
var patterns = [
	{
		include: "text.html.markdown#frontMatter"
	},
	{
		include: "#component_block"
	},
	{
		include: "#block"
	}
];
var repository = {
	block: {
		comment: "Same as `text.html.markdown#block`, but without `raw_block`",
		patterns: [
			{
				include: "#component_block"
			},
			{
				include: "text.html.markdown#separator"
			},
			{
				include: "#heading"
			},
			{
				include: "#blockquote"
			},
			{
				include: "#lists"
			},
			{
				include: "#paragraph"
			},
			{
				include: "text.html.markdown#fenced_code_block"
			},
			{
				include: "text.html.markdown#link-def"
			},
			{
				include: "text.html.markdown#html"
			}
		]
	},
	inline: {
		patterns: [
			{
				include: "#component_inline"
			},
			{
				include: "#span"
			},
			{
				include: "#markdown_attributes"
			}
		]
	},
	markdown_attributes: {
		match: "(?x)([^ ])(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
		name: "markup.component.attribute",
		captures: {
			"4": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		}
	},
	span: {
		match: "(?x)\n  (\\[)           # Open\n    ([^]]*)\n  (\\])\n  (               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )?",
		name: "markup.component.span",
		captures: {
			"2": {
				name: "string.other.link.description.title.markdown"
			},
			"4": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			}
		}
	},
	attributes: {
		match: "(?x)(               # attributes\n    ({)\n      ([^{]*)\n    (})\n  )",
		name: "markup.attributes",
		captures: {
			"3": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		}
	},
	component_inline: {
		match: "(?x)\n  (^|\\G|\\s+)\n  (:)           # component colon\n  (?i:             # component name\n    (\\w[\\w\\d-]*)\n  )\n  (\n      ({[^}]*})        # attributes\n      (\\[[^\\]]*\\]?) # slot\n      # reverse order\n    | (\\[[^\\]]*\\])  # slot\n      ({[^}]*})?       # attributes\n  )?",
		name: "markup.component.inline",
		captures: {
			"2": {
				name: "punctuation.definition.tag.start.component"
			},
			"3": {
				name: "entity.name.tag.component"
			},
			"5": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			},
			"6": {
				patterns: [
					{
						include: "#span"
					}
				]
			},
			"7": {
				patterns: [
					{
						include: "#span"
					}
				]
			},
			"8": {
				patterns: [
					{
						include: "#attributes"
					}
				]
			}
		}
	},
	component_block: {
		begin: "(?x)\n  (^|\\G)(\\s*)\n  (:{2,})     # component colons\n  (?i:\n    (\\w[\\w\\d-]+)   # component name\n    (                 # folowing spaces or attributes\n        \\s*\n      | {([^{]*)}\n    )\n    $\n  )",
		name: "markup.component.block",
		end: "(^|\\G)(\\2)(\\3)\\s*$",
		beginCaptures: {
			"4": {
				name: "entity.name.tag.component"
			},
			"5": {
				patterns: [
					{
						include: "#attribute"
					}
				]
			}
		},
		patterns: [
			{
				include: "#content"
			}
		]
	},
	content: {
		begin: "(^|\\G)(\\s*)(.*)",
		"while": "(^|\\G)(?!\\s*([:]{2,})\\s*$)",
		contentName: "meta.embedded.block.component",
		patterns: [
			{
				begin: "(^|\\G)(\\s*)(-{3})(\\s*)$",
				end: "(^|\\G)(\\s*(-{3})(\\s*)$)",
				patterns: [
					{
						include: "source.yaml"
					}
				]
			},
			{
				match: "^(\\s*)(#[\\w\\-\\_]*)\\s*(<!--(.*)-->)?$",
				captures: {
					"2": {
						name: "entity.other.attribute-name.html"
					},
					"3": {
						name: "comment.block.html"
					}
				}
			},
			{
				comment: "Block Repository created to disable 4-space raw block inside components",
				include: "#block"
			}
		]
	},
	attribute: {
		patterns: [
			{
				match: "(?x)\n  (\n    ([^=><\\s]*)  # attribute name\n    (             # attribute value\n        =[\"]([^\"]*)([\"])|[']([^']*)(['])\n      | =[^\\s'\"]*\n    )?\n    \\s*\n  )",
				captures: {
					"2": {
						name: "entity.other.attribute-name.html"
					},
					"3": {
						patterns: [
							{
								include: "#attribute-interior"
							}
						]
					}
				}
			}
		]
	},
	"attribute-interior": {
		comment: "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L376",
		patterns: [
			{
				begin: "=",
				beginCaptures: {
					"0": {
						name: "punctuation.separator.key-value.html"
					}
				},
				end: "(?<=[^\\s=])(?!\\s*=)|(?=/?>)",
				patterns: [
					{
						match: "([^\\s\"'=<>`/]|/(?!>))+",
						name: "string.unquoted.html"
					},
					{
						begin: "\"",
						beginCaptures: {
							"0": {
								name: "punctuation.definition.string.begin.html"
							}
						},
						end: "\"",
						endCaptures: {
							"0": {
								name: "punctuation.definition.string.end.html"
							}
						},
						name: "string.quoted.double.html",
						patterns: [
							{
								include: "#entities"
							}
						]
					},
					{
						begin: "'",
						beginCaptures: {
							"0": {
								name: "punctuation.definition.string.begin.html"
							}
						},
						end: "'",
						endCaptures: {
							"0": {
								name: "punctuation.definition.string.end.html"
							}
						},
						name: "string.quoted.single.html",
						patterns: [
							{
								include: "#entities"
							}
						]
					},
					{
						match: "=",
						name: "invalid.illegal.unexpected-equals-sign.html"
					}
				]
			}
		]
	},
	entities: {
		comment: "https://github.com/microsoft/vscode/blob/08d59c432609ae9306eb3889815977e93bb548de/extensions/html/syntaxes/html.tmLanguage.json#L532",
		patterns: [
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"912": {
						name: "punctuation.definition.entity.html"
					}
				},
				comment: "Yes this is a bit ridiculous, there are quite a lot of these",
				match: "(?x)\n\t\t\t\t\t\t(&)\t(?=[a-zA-Z])\n\t\t\t\t\t\t(\n\t\t\t\t\t\t\t(a(s(ymp(eq)?|cr|t)|n(d(slope|d|v|and)?|g(s(t|ph)|zarr|e|le|rt(vb(d)?)?|msd(a(h|c|d|e|f|a|g|b))?)?)|c(y|irc|d|ute|E)?|tilde|o(pf|gon)|uml|p(id|os|prox(eq)?|e|E|acir)?|elig|f(r)?|w(conint|int)|l(pha|e(ph|fsym))|acute|ring|grave|m(p|a(cr|lg))|breve)|A(s(sign|cr)|nd|MP|c(y|irc)|tilde|o(pf|gon)|uml|pplyFunction|fr|Elig|lpha|acute|ring|grave|macr|breve))\n\t\t\t\t\t\t  | (B(scr|cy|opf|umpeq|e(cause|ta|rnoullis)|fr|a(ckslash|r(v|wed))|reve)|b(s(cr|im(e)?|ol(hsub|b)?|emi)|n(ot|e(quiv)?)|c(y|ong)|ig(s(tar|qcup)|c(irc|up|ap)|triangle(down|up)|o(times|dot|plus)|uplus|vee|wedge)|o(t(tom)?|pf|wtie|x(h(d|u|D|U)?|times|H(d|u|D|U)?|d(R|l|r|L)|u(R|l|r|L)|plus|D(R|l|r|L)|v(R|h|H|l|r|L)?|U(R|l|r|L)|V(R|h|H|l|r|L)?|minus|box))|Not|dquo|u(ll(et)?|mp(e(q)?|E)?)|prime|e(caus(e)?|t(h|ween|a)|psi|rnou|mptyv)|karow|fr|l(ock|k(1(2|4)|34)|a(nk|ck(square|triangle(down|left|right)?|lozenge)))|a(ck(sim(eq)?|cong|prime|epsilon)|r(vee|wed(ge)?))|r(eve|vbar)|brk(tbrk)?))\n\t\t\t\t\t\t  | (c(s(cr|u(p(e)?|b(e)?))|h(cy|i|eck(mark)?)|ylcty|c(irc|ups(sm)?|edil|a(ps|ron))|tdot|ir(scir|c(eq|le(d(R|circ|S|dash|ast)|arrow(left|right)))?|e|fnint|E|mid)?|o(n(int|g(dot)?)|p(y(sr)?|f|rod)|lon(e(q)?)?|m(p(fn|le(xes|ment))?|ma(t)?))|dot|u(darr(l|r)|p(s|c(up|ap)|or|dot|brcap)?|e(sc|pr)|vee|wed|larr(p)?|r(vearrow(left|right)|ly(eq(succ|prec)|vee|wedge)|arr(m)?|ren))|e(nt(erdot)?|dil|mptyv)|fr|w(conint|int)|lubs(uit)?|a(cute|p(s|c(up|ap)|dot|and|brcup)?|r(on|et))|r(oss|arr))|C(scr|hi|c(irc|onint|edil|aron)|ircle(Minus|Times|Dot|Plus)|Hcy|o(n(tourIntegral|int|gruent)|unterClockwiseContourIntegral|p(f|roduct)|lon(e)?)|dot|up(Cap)?|OPY|e(nterDot|dilla)|fr|lo(seCurly(DoubleQuote|Quote)|ckwiseContourIntegral)|a(yleys|cute|p(italDifferentialD)?)|ross))\n\t\t\t\t\t\t  | (d(s(c(y|r)|trok|ol)|har(l|r)|c(y|aron)|t(dot|ri(f)?)|i(sin|e|v(ide(ontimes)?|onx)?|am(s|ond(suit)?)?|gamma)|Har|z(cy|igrarr)|o(t(square|plus|eq(dot)?|minus)?|ublebarwedge|pf|wn(harpoon(left|right)|downarrows|arrow)|llar)|d(otseq|a(rr|gger))?|u(har|arr)|jcy|e(lta|g|mptyv)|f(isht|r)|wangle|lc(orn|rop)|a(sh(v)?|leth|rr|gger)|r(c(orn|rop)|bkarow)|b(karow|lac)|Arr)|D(s(cr|trok)|c(y|aron)|Scy|i(fferentialD|a(critical(Grave|Tilde|Do(t|ubleAcute)|Acute)|mond))|o(t(Dot|Equal)?|uble(Right(Tee|Arrow)|ContourIntegral|Do(t|wnArrow)|Up(DownArrow|Arrow)|VerticalBar|L(ong(RightArrow|Left(RightArrow|Arrow))|eft(RightArrow|Tee|Arrow)))|pf|wn(Right(TeeVector|Vector(Bar)?)|Breve|Tee(Arrow)?|arrow|Left(RightVector|TeeVector|Vector(Bar)?)|Arrow(Bar|UpArrow)?))|Zcy|el(ta)?|D(otrahd)?|Jcy|fr|a(shv|rr|gger)))\n\t\t\t\t\t\t  | (e(s(cr|im|dot)|n(sp|g)|c(y|ir(c)?|olon|aron)|t(h|a)|o(pf|gon)|dot|u(ro|ml)|p(si(v|lon)?|lus|ar(sl)?)|e|D(ot|Dot)|q(s(im|lant(less|gtr))|c(irc|olon)|u(iv(DD)?|est|als)|vparsl)|f(Dot|r)|l(s(dot)?|inters|l)?|a(ster|cute)|r(Dot|arr)|g(s(dot)?|rave)?|x(cl|ist|p(onentiale|ectation))|m(sp(1(3|4))?|pty(set|v)?|acr))|E(s(cr|im)|c(y|irc|aron)|ta|o(pf|gon)|NG|dot|uml|TH|psilon|qu(ilibrium|al(Tilde)?)|fr|lement|acute|grave|x(ists|ponentialE)|m(pty(SmallSquare|VerySmallSquare)|acr)))\n\t\t\t\t\t\t  | (f(scr|nof|cy|ilig|o(pf|r(k(v)?|all))|jlig|partint|emale|f(ilig|l(ig|lig)|r)|l(tns|lig|at)|allingdotseq|r(own|a(sl|c(1(2|8|3|4|5|6)|78|2(3|5)|3(8|4|5)|45|5(8|6)))))|F(scr|cy|illed(SmallSquare|VerySmallSquare)|o(uriertrf|pf|rAll)|fr))\n\t\t\t\t\t\t  | (G(scr|c(y|irc|edil)|t|opf|dot|T|Jcy|fr|amma(d)?|reater(Greater|SlantEqual|Tilde|Equal(Less)?|FullEqual|Less)|g|breve)|g(s(cr|im(e|l)?)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|irc)|t(c(c|ir)|dot|quest|lPar|r(sim|dot|eq(qless|less)|less|a(pprox|rr)))?|imel|opf|dot|jcy|e(s(cc|dot(o(l)?)?|l(es)?)?|q(slant|q)?|l)?|v(nE|ertneqq)|fr|E(l)?|l(j|E|a)?|a(cute|p|mma(d)?)|rave|g(g)?|breve))\n\t\t\t\t\t\t  | (h(s(cr|trok|lash)|y(phen|bull)|circ|o(ok(leftarrow|rightarrow)|pf|arr|rbar|mtht)|e(llip|arts(uit)?|rcon)|ks(earow|warow)|fr|a(irsp|lf|r(dcy|r(cir|w)?)|milt)|bar|Arr)|H(s(cr|trok)|circ|ilbertSpace|o(pf|rizontalLine)|ump(DownHump|Equal)|fr|a(cek|t)|ARDcy))\n\t\t\t\t\t\t  | (i(s(cr|in(s(v)?|dot|v|E)?)|n(care|t(cal|prod|e(rcal|gers)|larhk)?|odot|fin(tie)?)?|c(y|irc)?|t(ilde)?|i(nfin|i(nt|int)|ota)?|o(cy|ta|pf|gon)|u(kcy|ml)|jlig|prod|e(cy|xcl)|quest|f(f|r)|acute|grave|m(of|ped|a(cr|th|g(part|e|line))))|I(scr|n(t(e(rsection|gral))?|visible(Comma|Times))|c(y|irc)|tilde|o(ta|pf|gon)|dot|u(kcy|ml)|Ocy|Jlig|fr|Ecy|acute|grave|m(plies|a(cr|ginaryI))?))\n\t\t\t\t\t\t  | (j(s(cr|ercy)|c(y|irc)|opf|ukcy|fr|math)|J(s(cr|ercy)|c(y|irc)|opf|ukcy|fr))\n\t\t\t\t\t\t  | (k(scr|hcy|c(y|edil)|opf|jcy|fr|appa(v)?|green)|K(scr|c(y|edil)|Hcy|opf|Jcy|fr|appa))\n\t\t\t\t\t\t  | (l(s(h|cr|trok|im(e|g)?|q(uo(r)?|b)|aquo)|h(ar(d|u(l)?)|blk)|n(sim|e(q(q)?)?|E|ap(prox)?)|c(y|ub|e(il|dil)|aron)|Barr|t(hree|c(c|ir)|imes|dot|quest|larr|r(i(e|f)?|Par))?|Har|o(ng(left(arrow|rightarrow)|rightarrow|mapsto)|times|z(enge|f)?|oparrow(left|right)|p(f|lus|ar)|w(ast|bar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|r(dhar|ushar))|ur(dshar|uhar)|jcy|par(lt)?|e(s(s(sim|dot|eq(qgtr|gtr)|approx|gtr)|cc|dot(o(r)?)?|g(es)?)?|q(slant|q)?|ft(harpoon(down|up)|threetimes|leftarrows|arrow(tail)?|right(squigarrow|harpoons|arrow(s)?))|g)?|v(nE|ertneqq)|f(isht|loor|r)|E(g)?|l(hard|corner|tri|arr)?|a(ng(d|le)?|cute|t(e(s)?|ail)?|p|emptyv|quo|rr(sim|hk|tl|pl|fs|lp|b(fs)?)?|gran|mbda)|r(har(d)?|corner|tri|arr|m)|g(E)?|m(idot|oust(ache)?)|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr))|L(s(h|cr|trok)|c(y|edil|aron)|t|o(ng(RightArrow|left(arrow|rightarrow)|rightarrow|Left(RightArrow|Arrow))|pf|wer(RightArrow|LeftArrow))|T|e(ss(Greater|SlantEqual|Tilde|EqualGreater|FullEqual|Less)|ft(Right(Vector|Arrow)|Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|rightarrow|Floor|A(ngleBracket|rrow(RightArrow|Bar)?)))|Jcy|fr|l(eftarrow)?|a(ng|cute|placetrf|rr|mbda)|midot))\n\t\t\t\t\t\t  | (M(scr|cy|inusPlus|opf|u|e(diumSpace|llintrf)|fr|ap)|m(s(cr|tpos)|ho|nplus|c(y|omma)|i(nus(d(u)?|b)?|cro|d(cir|dot|ast)?)|o(dels|pf)|dash|u(ltimap|map)?|p|easuredangle|DDot|fr|l(cp|dr)|a(cr|p(sto(down|up|left)?)?|l(t(ese)?|e)|rker)))\n\t\t\t\t\t\t  | (n(s(hort(parallel|mid)|c(cue|e|r)?|im(e(q)?)?|u(cc(eq)?|p(set(eq(q)?)?|e|E)?|b(set(eq(q)?)?|e|E)?)|par|qsu(pe|be)|mid)|Rightarrow|h(par|arr|Arr)|G(t(v)?|g)|c(y|ong(dot)?|up|edil|a(p|ron))|t(ilde|lg|riangle(left(eq)?|right(eq)?)|gl)|i(s(d)?|v)?|o(t(ni(v(c|a|b))?|in(dot|v(c|a|b)|E)?)?|pf)|dash|u(m(sp|ero)?)?|jcy|p(olint|ar(sl|t|allel)?|r(cue|e(c(eq)?)?)?)|e(s(im|ear)|dot|quiv|ar(hk|r(ow)?)|xist(s)?|Arr)?|v(sim|infin|Harr|dash|Dash|l(t(rie)?|e|Arr)|ap|r(trie|Arr)|g(t|e))|fr|w(near|ar(hk|r(ow)?)|Arr)|V(dash|Dash)|l(sim|t(ri(e)?)?|dr|e(s(s)?|q(slant|q)?|ft(arrow|rightarrow))?|E|arr|Arr)|a(ng|cute|tur(al(s)?)?|p(id|os|prox|E)?|bla)|r(tri(e)?|ightarrow|arr(c|w)?|Arr)|g(sim|t(r)?|e(s|q(slant|q)?)?|E)|mid|L(t(v)?|eft(arrow|rightarrow)|l)|b(sp|ump(e)?))|N(scr|c(y|edil|aron)|tilde|o(nBreakingSpace|Break|t(R(ightTriangle(Bar|Equal)?|everseElement)|Greater(Greater|SlantEqual|Tilde|Equal|FullEqual|Less)?|S(u(cceeds(SlantEqual|Tilde|Equal)?|perset(Equal)?|bset(Equal)?)|quareSu(perset(Equal)?|bset(Equal)?))|Hump(DownHump|Equal)|Nested(GreaterGreater|LessLess)|C(ongruent|upCap)|Tilde(Tilde|Equal|FullEqual)?|DoubleVerticalBar|Precedes(SlantEqual|Equal)?|E(qual(Tilde)?|lement|xists)|VerticalBar|Le(ss(Greater|SlantEqual|Tilde|Equal|Less)?|ftTriangle(Bar|Equal)?))?|pf)|u|e(sted(GreaterGreater|LessLess)|wLine|gative(MediumSpace|Thi(nSpace|ckSpace)|VeryThinSpace))|Jcy|fr|acute))\n\t\t\t\t\t\t  | (o(s(cr|ol|lash)|h(m|bar)|c(y|ir(c)?)|ti(lde|mes(as)?)|S|int|opf|d(sold|iv|ot|ash|blac)|uml|p(erp|lus|ar)|elig|vbar|f(cir|r)|l(c(ir|ross)|t|ine|arr)|a(st|cute)|r(slope|igof|or|d(er(of)?|f|m)?|v|arr)?|g(t|on|rave)|m(i(nus|cron|d)|ega|acr))|O(s(cr|lash)|c(y|irc)|ti(lde|mes)|opf|dblac|uml|penCurly(DoubleQuote|Quote)|ver(B(ar|rac(e|ket))|Parenthesis)|fr|Elig|acute|r|grave|m(icron|ega|acr)))\n\t\t\t\t\t\t  | (p(s(cr|i)|h(i(v)?|one|mmat)|cy|i(tchfork|v)?|o(intint|und|pf)|uncsp|er(cnt|tenk|iod|p|mil)|fr|l(us(sim|cir|two|d(o|u)|e|acir|mn|b)?|an(ck(h)?|kv))|ar(s(im|l)|t|a(llel)?)?|r(sim|n(sim|E|ap)|cue|ime(s)?|o(d|p(to)?|f(surf|line|alar))|urel|e(c(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?)?|E|ap)?|m)|P(s(cr|i)|hi|cy|i|o(incareplane|pf)|fr|lusMinus|artialD|r(ime|o(duct|portion(al)?)|ecedes(SlantEqual|Tilde|Equal)?)?))\n\t\t\t\t\t\t  | (q(scr|int|opf|u(ot|est(eq)?|at(int|ernions))|prime|fr)|Q(scr|opf|UOT|fr))\n\t\t\t\t\t\t  | (R(s(h|cr)|ho|c(y|edil|aron)|Barr|ight(Ceiling|T(ee(Vector|Arrow)?|riangle(Bar|Equal)?)|Do(ubleBracket|wn(TeeVector|Vector(Bar)?))|Up(TeeVector|DownVector|Vector(Bar)?)|Vector(Bar)?|arrow|Floor|A(ngleBracket|rrow(Bar|LeftArrow)?))|o(undImplies|pf)|uleDelayed|e(verse(UpEquilibrium|E(quilibrium|lement)))?|fr|EG|a(ng|cute|rr(tl)?)|rightarrow)|r(s(h|cr|q(uo(r)?|b)|aquo)|h(o(v)?|ar(d|u(l)?))|nmid|c(y|ub|e(il|dil)|aron)|Barr|t(hree|imes|ri(e|f|ltri)?)|i(singdotseq|ng|ght(squigarrow|harpoon(down|up)|threetimes|left(harpoons|arrows)|arrow(tail)?|rightarrows))|Har|o(times|p(f|lus|ar)|a(ng|rr)|brk)|d(sh|ca|quo(r)?|ldhar)|uluhar|p(polint|ar(gt)?)|e(ct|al(s|ine|part)?|g)|f(isht|loor|r)|l(har|arr|m)|a(ng(d|e|le)?|c(ute|e)|t(io(nals)?|ail)|dic|emptyv|quo|rr(sim|hk|c|tl|pl|fs|w|lp|ap|b(fs)?)?)|rarr|x|moust(ache)?|b(arr|r(k(sl(d|u)|e)|ac(e|k))|brk)|A(tail|arr|rr)))\n\t\t\t\t\t\t  | (s(s(cr|tarf|etmn|mile)|h(y|c(hcy|y)|ort(parallel|mid)|arp)|c(sim|y|n(sim|E|ap)|cue|irc|polint|e(dil)?|E|a(p|ron))?|t(ar(f)?|r(ns|aight(phi|epsilon)))|i(gma(v|f)?|m(ne|dot|plus|e(q)?|l(E)?|rarr|g(E)?)?)|zlig|o(pf|ftcy|l(b(ar)?)?)|dot(e|b)?|u(ng|cc(sim|n(sim|eqq|approx)|curlyeq|eq|approx)?|p(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|hs(ol|ub)|1|n(e|E)|2|d(sub|ot)|3|plus|e(dot)?|E|larr|mult)?|m|b(s(im|u(p|b)|et(neq(q)?|eq(q)?)?)|n(e|E)|dot|plus|e(dot)?|E|rarr|mult)?)|pa(des(uit)?|r)|e(swar|ct|tm(n|inus)|ar(hk|r(ow)?)|xt|mi|Arr)|q(su(p(set(eq)?|e)?|b(set(eq)?|e)?)|c(up(s)?|ap(s)?)|u(f|ar(e|f))?)|fr(own)?|w(nwar|ar(hk|r(ow)?)|Arr)|larr|acute|rarr|m(t(e(s)?)?|i(d|le)|eparsl|a(shp|llsetminus))|bquo)|S(scr|hort(RightArrow|DownArrow|UpArrow|LeftArrow)|c(y|irc|edil|aron)?|tar|igma|H(cy|CHcy)|opf|u(c(hThat|ceeds(SlantEqual|Tilde|Equal)?)|p(set|erset(Equal)?)?|m|b(set(Equal)?)?)|OFTcy|q(uare(Su(perset(Equal)?|bset(Equal)?)|Intersection|Union)?|rt)|fr|acute|mallCircle))\n\t\t\t\t\t\t  | (t(s(hcy|c(y|r)|trok)|h(i(nsp|ck(sim|approx))|orn|e(ta(sym|v)?|re(4|fore))|k(sim|ap))|c(y|edil|aron)|i(nt|lde|mes(d|b(ar)?)?)|o(sa|p(cir|f(ork)?|bot)?|ea)|dot|prime|elrec|fr|w(ixt|ohead(leftarrow|rightarrow))|a(u|rget)|r(i(sb|time|dot|plus|e|angle(down|q|left(eq)?|right(eq)?)?|minus)|pezium|ade)|brk)|T(s(cr|trok)|RADE|h(i(nSpace|ckSpace)|e(ta|refore))|c(y|edil|aron)|S(cy|Hcy)|ilde(Tilde|Equal|FullEqual)?|HORN|opf|fr|a(u|b)|ripleDot))\n\t\t\t\t\t\t  | (u(scr|h(ar(l|r)|blk)|c(y|irc)|t(ilde|dot|ri(f)?)|Har|o(pf|gon)|d(har|arr|blac)|u(arr|ml)|p(si(h|lon)?|harpoon(left|right)|downarrow|uparrows|lus|arrow)|f(isht|r)|wangle|l(c(orn(er)?|rop)|tri)|a(cute|rr)|r(c(orn(er)?|rop)|tri|ing)|grave|m(l|acr)|br(cy|eve)|Arr)|U(scr|n(ion(Plus)?|der(B(ar|rac(e|ket))|Parenthesis))|c(y|irc)|tilde|o(pf|gon)|dblac|uml|p(si(lon)?|downarrow|Tee(Arrow)?|per(RightArrow|LeftArrow)|DownArrow|Equilibrium|arrow|Arrow(Bar|DownArrow)?)|fr|a(cute|rr(ocir)?)|ring|grave|macr|br(cy|eve)))\n\t\t\t\t\t\t  | (v(s(cr|u(pn(e|E)|bn(e|E)))|nsu(p|b)|cy|Bar(v)?|zigzag|opf|dash|prop|e(e(eq|bar)?|llip|r(t|bar))|Dash|fr|ltri|a(ngrt|r(s(igma|u(psetneq(q)?|bsetneq(q)?))|nothing|t(heta|riangle(left|right))|p(hi|i|ropto)|epsilon|kappa|r(ho)?))|rtri|Arr)|V(scr|cy|opf|dash(l)?|e(e|r(yThinSpace|t(ical(Bar|Separator|Tilde|Line))?|bar))|Dash|vdash|fr|bar))\n\t\t\t\t\t\t  | (w(scr|circ|opf|p|e(ierp|d(ge(q)?|bar))|fr|r(eath)?)|W(scr|circ|opf|edge|fr))\n\t\t\t\t\t\t  | (X(scr|i|opf|fr)|x(s(cr|qcup)|h(arr|Arr)|nis|c(irc|up|ap)|i|o(time|dot|p(f|lus))|dtri|u(tri|plus)|vee|fr|wedge|l(arr|Arr)|r(arr|Arr)|map))\n\t\t\t\t\t\t  | (y(scr|c(y|irc)|icy|opf|u(cy|ml)|en|fr|ac(y|ute))|Y(scr|c(y|irc)|opf|uml|Icy|Ucy|fr|acute|Acy))\n\t\t\t\t\t\t  | (z(scr|hcy|c(y|aron)|igrarr|opf|dot|e(ta|etrf)|fr|w(nj|j)|acute)|Z(scr|c(y|aron)|Hcy|opf|dot|e(ta|roWidthSpace)|fr|acute))\n\t\t\t\t\t\t)\n\t\t\t\t\t\t(;)\n\t\t\t\t\t",
				name: "constant.character.entity.named.$2.html"
			},
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"3": {
						name: "punctuation.definition.entity.html"
					}
				},
				match: "(&)#[0-9]+(;)",
				name: "constant.character.entity.numeric.decimal.html"
			},
			{
				captures: {
					"1": {
						name: "punctuation.definition.entity.html"
					},
					"3": {
						name: "punctuation.definition.entity.html"
					}
				},
				match: "(&)#[xX][0-9a-fA-F]+(;)",
				name: "constant.character.entity.numeric.hexadecimal.html"
			},
			{
				match: "&(?=[a-zA-Z0-9]+;)",
				name: "invalid.illegal.ambiguous-ampersand.html"
			}
		]
	},
	heading: {
		match: "(?:^|\\G)[ ]*(#{1,6}\\s+(.*?)(\\s+#{1,6})?\\s*)$",
		captures: {
			"1": {
				patterns: [
					{
						match: "(#{6})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.6.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{5})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.5.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{4})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.4.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{3})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.3.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{2})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.2.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					},
					{
						match: "(#{1})\\s+(.*?)(?:\\s+(#+))?\\s*$",
						name: "heading.1.markdown",
						captures: {
							"1": {
								name: "punctuation.definition.heading.markdown"
							},
							"2": {
								name: "entity.name.section.markdown",
								patterns: [
									{
										include: "text.html.markdown#inline"
									},
									{
										include: "text.html.derivative"
									}
								]
							},
							"3": {
								name: "punctuation.definition.heading.markdown"
							}
						}
					}
				]
			}
		},
		name: "markup.heading.markdown",
		patterns: [
			{
				include: "text.html.markdown#inline"
			}
		]
	},
	"heading-setext": {
		patterns: [
			{
				match: "^(={3,})(?=[ \\t]*$\\n?)",
				name: "markup.heading.setext.1.markdown"
			},
			{
				match: "^(-{3,})(?=[ \\t]*$\\n?)",
				name: "markup.heading.setext.2.markdown"
			}
		]
	},
	lists: {
		patterns: [
			{
				begin: "(^|\\G)([ ]*)([*+-])([ \\t])",
				beginCaptures: {
					"3": {
						name: "punctuation.definition.list.begin.markdown"
					}
				},
				comment: "Currently does not support un-indented second lines.",
				name: "markup.list.unnumbered.markdown",
				patterns: [
					{
						include: "#block"
					},
					{
						include: "text.html.markdown#list_paragraph"
					}
				],
				"while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
			},
			{
				begin: "(^|\\G)([ ]*)([0-9]+\\.)([ \\t])",
				beginCaptures: {
					"3": {
						name: "punctuation.definition.list.begin.markdown"
					}
				},
				name: "markup.list.numbered.markdown",
				patterns: [
					{
						include: "#block"
					},
					{
						include: "text.html.markdown#list_paragraph"
					}
				],
				"while": "((^|\\G)([ ]*|\\t))|(^[ \\t]*$)"
			}
		]
	},
	paragraph: {
		begin: "(^|\\G)[ ]*(?=\\S)",
		name: "meta.paragraph.markdown",
		patterns: [
			{
				include: "#inline"
			},
			{
				include: "text.html.markdown#inline"
			},
			{
				include: "text.html.derivative"
			},
			{
				include: "#heading-setext"
			}
		],
		"while": "(^|\\G)((?=\\s*[-=]{3,}\\s*$)|[ ]{4,}(?=\\S))"
	},
	blockquote: {
		begin: "(^|\\G)[ ]*(>) ?",
		captures: {
			"2": {
				name: "punctuation.definition.quote.begin.markdown"
			}
		},
		name: "markup.quote.markdown",
		patterns: [
			{
				include: "#block"
			}
		],
		"while": "(^|\\G)\\s*(>) ?"
	}
};
const mdcTMLanguage = {
	information_for_contributors: information_for_contributors,
	version: version,
	name: name,
	injectionSelector: injectionSelector,
	scopeName: scopeName,
	patterns: patterns,
	repository: repository
};

const logger = consola.withScope("@nuxt/content");
const resolveLang = (lang) => BUNDLED_LANGUAGES.find((l) => l.id === lang || l.aliases?.includes(lang))?.id;
const resolveTheme = (theme) => {
  if (!theme) {
    return;
  }
  if (typeof theme === "string") {
    theme = {
      default: theme
    };
  }
  return Object.entries(theme).reduce((acc, [key, value]) => {
    acc[key] = BUNDLED_THEMES.find((t) => t === value);
    return acc;
  }, {});
};
const resolveBody = (body) => {
  if (typeof body.code !== "string") {
    body.code = "";
  }
  return {
    code: body.code.replace(/\n+$/, ""),
    lang: resolveLang(body.lang || ""),
    theme: resolveTheme(body.theme || "")
  };
};
const _auzj1H = lazyEventHandler(async () => {
  const { theme, preload } = useRuntimeConfig().content.highlight;
  const highlighter = await getHighlighter({
    theme: theme?.default || theme || "dark-plus",
    langs: [
      ...preload || [],
      "diff",
      "json",
      "js",
      "ts",
      "css",
      "shell",
      "html",
      "md",
      "yaml",
      {
        id: "md",
        scopeName: "text.markdown.mdc",
        path: "mdc.tmLanguage.json",
        aliases: ["markdown"],
        grammar: mdcTMLanguage
      }
    ]
  });
  return defineEventHandler(async (event) => {
    const params = await readBody(event);
    const { code, lang, theme: theme2 = { default: highlighter.getTheme() } } = resolveBody(params);
    if (!lang) {
      return [[{ content: code }]];
    }
    if (!highlighter.getLoadedLanguages().includes(lang)) {
      let message = "Content Highlighter Error\n\n";
      message = message + `Language "${lang}" is not loaded Shiki. Falling back to plain code.

`;
      message = message + `Please make sure you add "${lang}" to the 'preload' list in your Nuxt config.

`;
      message = message + "See: https://content.nuxtjs.org/api/configuration#highlight";
      logger.warn(message);
      return [[{ content: code }]];
    }
    await Promise.all(
      Object.values(theme2).map(async (theme3) => {
        if (!highlighter.getLoadedThemes().includes(theme3)) {
          await highlighter.loadTheme(theme3);
        }
      })
    );
    const coloredTokens = Object.entries(theme2).map(([key, theme3]) => {
      const tokens = highlighter.codeToThemedTokens(code, lang, theme3);
      return {
        key,
        theme: theme3,
        tokens
      };
    });
    const highlightedCode = [];
    for (const line in coloredTokens[0].tokens) {
      highlightedCode[line] = coloredTokens.reduce((acc, color) => {
        return mergeLines({
          key: coloredTokens[0].key,
          tokens: acc
        }, {
          key: color.key,
          tokens: color.tokens[line]
        });
      }, coloredTokens[0].tokens[line]);
    }
    return highlightedCode;
  });
});
function mergeLines(line1, line2) {
  const mergedTokens = [];
  const getColors = (h, i) => typeof h.tokens[i].color === "string" ? { [h.key]: h.tokens[i].color } : h.tokens[i].color;
  const [big, small] = line1.tokens.length > line2.tokens.length ? [line1, line2] : [line2, line1];
  let targetToken = 0;
  let targetTokenCharIndex = 0;
  big.tokens.forEach((t, i) => {
    if (targetTokenCharIndex === 0) {
      if (t.content === small.tokens[i]?.content) {
        mergedTokens.push({
          content: t.content,
          color: {
            ...getColors(big, i),
            ...getColors(small, i)
          }
        });
        targetToken = i + 1;
        return;
      }
      if (t.content === small.tokens[targetToken]?.content) {
        mergedTokens.push({
          content: t.content,
          color: {
            ...getColors(big, i),
            ...getColors(small, targetToken)
          }
        });
        targetToken += 1;
        return;
      }
    }
    if (small.tokens[targetToken]?.content?.substring(targetTokenCharIndex, targetTokenCharIndex + t.content.length) === t.content) {
      targetTokenCharIndex += t.content.length;
      mergedTokens.push({
        content: t.content,
        color: {
          ...getColors(big, i),
          ...getColors(small, targetToken)
        }
      });
    }
    if (small.tokens[targetToken]?.content.length <= targetTokenCharIndex) {
      targetToken += 1;
      targetTokenCharIndex = 0;
    }
  });
  return mergedTokens;
}

const _lazy_aXnMdm = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_aXnMdm, lazy: true, middleware: false, method: undefined },
  { route: '/api/_content/query/:qid', handler: _o7Z3Zr, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _o7Z3Zr, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.json', handler: _dE47kF, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _p3LPfR, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _p3LPfR, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/highlight', handler: _auzj1H, lazy: false, middleware: false, method: "post" },
  { route: '/**', handler: _lazy_aXnMdm, lazy: true, middleware: false, method: undefined }
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
  h3App.use(createRouteRulesHandler());
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(/\/+/g, "/");
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(h.route.replace(/:\w+|\*\*/g, "_"));
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const localCall = createCall(toNodeListener(h3App));
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
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
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

export { useRuntimeConfig as a, getRouteRules as b, appendHeader as c, createError as d, eventHandler as e, getQuery as g, nodeServer as n, sendRedirect as s, useNitroApp as u, writeEarlyHints as w };
//# sourceMappingURL=node-server.mjs.map

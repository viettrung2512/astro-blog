import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, k as decodeKey } from './chunks/astro/server_BQLIrwkL.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/","cacheDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/node_modules/.astro/","outDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/dist/","srcDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/src/","publicDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/public/","buildClientDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/dist/","buildServerDir":"file:///D:/TMA-intern/TechPeople-blog/astro-blog/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"404.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"admin/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/admin","isIndex":false,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin.astro","pathname":"/admin","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"api/search.json","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/search.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/search\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"search.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/search.json.ts","pathname":"/api/search.json","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"articles/search/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles/search","isIndex":false,"type":"page","pattern":"^\\/articles\\/search\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}],[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/search.astro","pathname":"/articles/search","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"articles/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/articles","isIndex":true,"type":"page","pattern":"^\\/articles\\/?$","segments":[[{"content":"articles","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/articles/index.astro","pathname":"/articles","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"login/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/login","isIndex":false,"type":"page","pattern":"^\\/login\\/?$","segments":[[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/login.astro","pathname":"/login","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"signup/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/signup","isIndex":false,"type":"page","pattern":"^\\/signup\\/?$","segments":[[{"content":"signup","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/signup.astro","pathname":"/signup","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/404.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/admin.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/search.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/articles/tag/[...tag].astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/login.astro",{"propagation":"in-tree","containsHead":true}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/signup.astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/components/Footer.astro",{"propagation":"in-tree","containsHead":false}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/404@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/admin@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/search@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/login@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/signup@_@astro",{"propagation":"in-tree","containsHead":false}],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/api/search.json.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/api/search.json@_@ts",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/api/search.json@_@ts":"pages/api/search.json.astro.mjs","\u0000@astro-page:src/pages/articles/search@_@astro":"pages/articles/search.astro.mjs","\u0000@astro-page:src/pages/articles/tag/[...tag]@_@astro":"pages/articles/tag/_---tag_.astro.mjs","\u0000@astro-page:src/pages/articles/index@_@astro":"pages/articles.astro.mjs","\u0000@astro-page:src/pages/articles/[...slug]@_@astro":"pages/articles/_---slug_.astro.mjs","\u0000@astro-page:src/pages/login@_@astro":"pages/login.astro.mjs","\u0000@astro-page:src/pages/signup@_@astro":"pages/signup.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DNEHWMcx.mjs","D:/TMA-intern/TechPeople-blog/astro-blog/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","D:/TMA-intern/TechPeople-blog/astro-blog/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CnWL5gzj.mjs","D:\\TMA-intern\\TechPeople-blog\\astro-blog\\.astro\\content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","D:\\TMA-intern\\TechPeople-blog\\astro-blog\\.astro\\content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_Dr1JZ0o9.mjs","D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/login.astro?astro&type=script&index=0&lang.ts":"_astro/login.astro_astro_type_script_index_0_lang.BMktYzIm.js","D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/signup.astro?astro&type=script&index=0&lang.ts":"_astro/signup.astro_astro_type_script_index_0_lang.ABFaCYUQ.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/login.astro?astro&type=script&index=0&lang.ts","const m=document.getElementById(\"login-form\");m&&m.addEventListener(\"submit\",u=>{u.preventDefault();const s=document.getElementById(\"username\"),t=document.getElementById(\"password\"),n=s?s.value:\"\",c=t?t.value:\"\",o=JSON.parse(localStorage.getItem(\"users\")||\"[]\"),r=o.find(e=>e.username===n&&e.password===c);if(r){const e=o.map(a=>({...a,isLoggedIn:a.username===n}));localStorage.setItem(\"users\",JSON.stringify(e)),alert(`Login success! Welcome ${r.username}`),window.location.href=\"/\"}else alert(\"Email or password is incorrect!\")});"],["D:/TMA-intern/TechPeople-blog/astro-blog/src/pages/signup.astro?astro&type=script&index=0&lang.ts","const a=document.getElementById(\"signup-form\");a&&a.addEventListener(\"submit\",o=>{o.preventDefault();const l=document.getElementById(\"username\")?.value||\"\",s=document.getElementById(\"email\")?.value||\"\",r=document.getElementById(\"password\")?.value||\"\",t=JSON.parse(localStorage.getItem(\"users\")||\"[]\");if(t.some(e=>e.email===s)){alert(\"Email is available!\");return}const n=t.map(e=>({...e,isLoggedIn:!1}));n.push({username:l,email:s,password:r,isLoggedIn:!0}),localStorage.setItem(\"users\",JSON.stringify(n)),alert(\"Signup success! Please login.\"),window.location.href=\"/login\"});"]],"assets":["/_astro/team1.CHXq7Isr.png","/_astro/error-404.Ox42KQdE.png","/_astro/team2.Ccx9qtIf.png","/_astro/team3.B0njnFun.png","/_astro/about.C1FZ3Rbp.jpg","/_astro/logo.Bp-tjQcT.png","/_astro/about.BqQdTFap.css","/favicon.svg","/scripts/auth.js","/images/image1.png","/images/image2.png","/images/image3.png","/images/image4.png","/images/image5.png","/images/image6.png","/images/image7.png","/images/screen.png","/404.html","/about/index.html","/admin/index.html","/api/search.json","/articles/search/index.html","/articles/index.html","/login/index.html","/signup/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"4Pwyq3Wp2h3cflr8FHqNRcQ+jkWMLo0spCQjtyF2jZw=","sessionConfig":{"driver":"fs-lite","options":{"base":"D:\\TMA-intern\\TechPeople-blog\\astro-blog\\node_modules\\.astro\\sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
